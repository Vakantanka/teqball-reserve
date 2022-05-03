const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  message: {
    type: String
  }
})

module.exports = mongoose.model("Participant", participantSchema)
