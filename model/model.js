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
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Value = mongoose.model("Value", valueSchema);

exports.default = Value;
