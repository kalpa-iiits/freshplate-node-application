module.exports = app => {
    const file = require("../controllers/scheduler.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", file.schedulejob);
    router.post("/upload/", file.uploadFile);
  
    app.use("/api/schedule", router);
  };
  