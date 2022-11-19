const mongoose = require("mongoose");

const ItemInfo = new mongoose.Schema({
  name: String,
  addr: String,
  min_price: Number,
  min_currency: String,
  max_price: Number,
  max_currency: String,
  option: String,
  img: String,
  description: String,
});

module.exports = mongoose.model("ItemInfo", ItemInfo);
