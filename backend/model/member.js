const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  role: {
    type: String
  }
})

module.exports = mongoose.model("Member", memberSchema)