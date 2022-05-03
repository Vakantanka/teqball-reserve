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

const groupSchema = Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  members: {
    type: [memberSchema]
  },
  events: {
    type: [eventSchema]
  }
})

module.exports = mongoose.model("Group", groupSchema)
