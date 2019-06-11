const mongoose = require("mongoose");

const FactorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  length: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  childNodes: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Factory = mongoose.model("factory", FactorySchema);
