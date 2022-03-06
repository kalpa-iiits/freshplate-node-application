module.exports = app => {
    const file = require("../controllers/file.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", file.getFile);
  
    app.use("/api/file", router);
  };
  