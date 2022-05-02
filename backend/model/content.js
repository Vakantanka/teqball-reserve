const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = Schema({
  "title": {
    "type": "String"
  },
  "content": {
    "type": "String"
  },
  "endpoint": {
    "type": "String"
  }
})

module.exports = Content = mongoose.model("Content", contentSchema)
