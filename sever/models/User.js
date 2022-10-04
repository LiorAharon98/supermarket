const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String ,
    email : String,
    password: String,
    shoppingHistory: Array,
  });

  
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;