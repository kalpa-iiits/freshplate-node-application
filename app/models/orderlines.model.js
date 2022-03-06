const mongoose = require('mongoose')

const orderlinesSchema = mongoose.Schema({
   OL_ID:{
     type: Number
   },
   STATUS:{
    type: String
   },
   DESCRIPTION: {
     type: String
   },
   SKU: {
     type: String
   },
   QUANTITY: {
     type: Number
   },
   O_QTY: {
     type: Number
   }
})

module.exports = orderlinesSchema