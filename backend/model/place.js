const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = Schema({
  "title": {
    "type": "String"
  }
})

module.exports = mongoose.model("Place", placeSchema)
