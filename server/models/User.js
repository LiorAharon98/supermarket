const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  shoppingHistory: Array,
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
