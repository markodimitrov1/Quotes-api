const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  oip: {
    type: Number,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  flag: {
    type: String,
    required: true,
  },
});

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;