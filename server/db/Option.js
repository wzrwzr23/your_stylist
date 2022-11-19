const mongoose = require("mongoose");

const Option = new mongoose.Schema({
  name: String,
  addr: String,
  currency: String,
  quantity: Number,

});

module.exports = mongoose.model("Option", Option);
