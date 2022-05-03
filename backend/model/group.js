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
  place: {
    type: String
  },
  date: {
    type: Date,
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

const Member = mongoose.model("Member", memberSchema);
const Participant = mongoose.model("Participant", participantSchema);
const Event = mongoose.model("Event", eventSchema);
const Group = mongoose.model("Group", groupSchema);

module.exports = { Member: Member, Participant: Participant, Event: Event, Group: Group }
