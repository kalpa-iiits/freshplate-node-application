const mongoose = require('mongoose')
const orderlinesSchema = require('./orderlines.model.js')

const isString = {
  type: String,
  required: true
}

const cancelledOrderSchema = mongoose.Schema({
  O_ID: isString,
  TRACKING_URL: {
    type: String
  },
  S_ID: {
    type: String
  },
  OMS_ORDER_ID: isString,
  ORDER_LINES: [orderlinesSchema]
})

module.exports = mongoose.model('CancelledOrder', cancelledOrderSchema)