const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id : false,
    name: String,
    username: { type: String, required: [true, 'Enter a username.'], unique: [true, 'That username is taken.'] },
    password: { type: String, required: true },
    shoppingHistory: Array,
  });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;