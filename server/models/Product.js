const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  pictureUrl: String,
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
