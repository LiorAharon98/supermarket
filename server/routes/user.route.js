const router = require("express").Router();
const errorsHandler = require("../utils/errorsHandler");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/sign-up", async (req, res) => {
  const body = req.body;
  try {
    await UserModel.create(body);
  } catch (e) {
    return console.log("error");
  }
});

router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return res.json(user);
    }
  }
  res.json(null);
});

router.post("/payment", async (req, res) => {
  const body = req.body;
  const filter = { username: body.username };
  const update = { shoppingHistory: body.total };
  await UserModel.findOneAndUpdate(filter, { $push: update });
});

module.exports = router;
