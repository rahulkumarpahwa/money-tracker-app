const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  info: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Value = mongoose.model("Value", valueSchema);

module.exports = Value;
