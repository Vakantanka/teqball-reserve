const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authEntitySchema = Schema({
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

module.exports = authEntity = mongoose.model("AuthEntity", authEntitySchema)
