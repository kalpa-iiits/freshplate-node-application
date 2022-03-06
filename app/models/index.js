const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.fulfilledorder = require("./fulfilledorder.model.js");
db.cancelledorder = require("./cancelledorder.model.js");

module.exports = db;
