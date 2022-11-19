const mongoose = require("mongoose");

const ItemInfo = new mongoose.Schema({
  name: String,
  price: Number,
  min_price: Number,
  min_currency: String,
  max_price: Number,
  max_currency: String,
  option: Array,
  img: String,
  description: String,
});

module.exports = mongoose.model("ItemInfo", ItemInfo);
