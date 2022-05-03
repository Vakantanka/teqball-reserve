const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = Schema({
  title: {
    type: String
  },
  saved_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: {
      type: {
        type: String,
        enum: ['Point']
      }
    }
  }
})

module.exports = mongoose.model("Place", placeSchema)
