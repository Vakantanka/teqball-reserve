const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetSchema = Schema({
  datetime: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = reset = mongoose.model("Reset", resetSchema)
