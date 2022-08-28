const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id : false,
    name: String,
    price: Number,
    category: String,
    picture: String,
  });

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;