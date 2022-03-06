const db = require("../models");
const FulfilledOrder = db.fulfilledorder;
const CancelledOrder = db.cancelledorder;


exports.findAll = (req, res) => {
  FulfilledOrder.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inventory."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const O_ID = req.params.O_ID;

  FulfilledOrder.find({ O_ID: O_ID}) 
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Inventory with id " + O_ID });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Inventory with id=" + O_ID });
    });
};