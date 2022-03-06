const schedule = require('node-schedule');
const axios = require("axios");
const fs = require("fs");

const AWS = require("aws-sdk");

require("dotenv").config();




exports.uploadFile = (req, res) => {

    const s3 = new AWS.S3({
       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    let filename = req.body.filename;
    let filepath = __dirname + '/../../' + filename;
    const fileContent = fs.readFileSync(filepath)
    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${filename}`,
      Body: fileContent,
    }
    
    s3.putObject(params, (err, data) => {
      if (err) {
          console.log(err)
        reject(err)
      }
      res.send({"message":"File upload successfull"})
    })
  
  }
  
 exports.schedulejob = (req, res) => {
   
    let currentTime  =  new Date();
    var scheduleTime = new Date(currentTime.getTime() + 200);

    schedule.scheduleJob(scheduleTime, () => {
       
        axios.post('http://localhost:8080/api/file',{
            file:"data.json"
        })
        .then((result) => {
            res.send({"message":"Data successfully inserted"});
        })
        .catch((err) => {
            res.send(err);
        })
    
    })
 } 
 