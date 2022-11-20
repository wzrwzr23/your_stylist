const mongoose = require("mongoose");

const WishList = new mongoose.Schema({
  name: String,
  price: Number,
  min_price: Number,
  min_currency: String,
  max_price: Number,
  max_currency: String,
  option: Array,
  img: Array,
  description: Array,
});

module.exports = mongoose.model("WishList", WishList);
