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

const eventSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  place_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'place'
  },
  participants: {
    type: [participantSchema]
  }
});

module.exports = mongoose.model("Event", eventSchema)
