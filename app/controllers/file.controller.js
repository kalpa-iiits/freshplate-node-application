const db = require("../models");
const FulfilledOrder = db.fulfilledorder;
const CancelledOrder = db.cancelledorder;

const fs = require('fs');

const http = require('http');


function getRemoteFile(file, url) {

  http.get(url, (res) => {
    const writeStream = fs.createWriteStream(file);
    res.pipe(writeStream);
  
    writeStream.on("finish", () => {
      writeStream.close();
    });
  });
}

const insertData = (obj) => {
  
  const orderlines = obj.ORDER_LINES;
  let flag = 0;
  orderlines.map((orderline) => {
    if(orderline.QUANTITY !== 0) flag = 1;
  })
  
  if(flag === 1){

    const fulfilledorder = new FulfilledOrder({
      O_ID: obj.O_ID,
      TRACKING_URL: obj.TRACKING_URL,
      S_ID: obj.S_ID,
      OMS_ORDER_ID: obj.OMS_ORDER_ID,
      ORDER_LINES: obj.ORDER_LINES,
    });

    fulfilledorder
    .save()
    .then((data) => {
      console.log('Saved to fulfilled')
    }
    )
    .catch(err => {
      console.log(err);
    });
  }
  else{
    const cancelledorder = new CancelledOrder({
      O_ID: obj.O_ID,
      TRACKING_URL: obj.TRACKING_URL,
      S_ID: obj.S_ID,
      OMS_ORDER_ID: obj.OMS_ORDER_ID,
      ORDER_LINES: obj.ORDER_LINES,
    });

    cancelledorder
    .save()
    .then((data) => {
      console.log("Saved to cancelled");
    }
    )
    .catch(err => {
      console.log(err);
    });
}
}


exports.getFile = async (req, res) => {
  let file = req.body.file
  let url = "http://bingo-videos-test.s3.ap-south-1.amazonaws.com/" + file;
  const filePromise = new Promise((resolve, reject) => {
    resolve(
      getRemoteFile(file, url)
    );
  })
  filePromise.then(
    fs.readFile(__dirname + '/../../' + file, 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      let data_json = JSON.parse(data)
      let orders = data_json.ORDERS;
      orders.map((order) =>  {
        if(order.O_ID === order.OMS_ORDER_ID){
          insertData(order);
        }
      })
      res.send({message: "Data successfully inserted"});
     })
  )
}




