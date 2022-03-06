module.exports = app => {
  const inventory = require("../controllers/inventory.controller.js");

  var router = require("express").Router();

  router.get("/", inventory.findAll);
  router.get("/:O_ID", inventory.findOne);

  app.use("/api/inventory", router);
};
