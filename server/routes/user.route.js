const router = require("express").Router();
const errorsHandler = require("../utils/errorsHandler");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");

const verifyTokenJwt = (token) => {
  return jwt.verify(token, "liors-secret");
};
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "lior.ah98@gmail.com",
    pass: "rrqwaoersdvqkhzb",
  },
});
const sendMail = async (email, username, cart) => {
  const data = await ejs.renderFile("./views/index.ejs", { username, cart });

  const mail_config = {
    from: "lior.ah98@gmail.com",
    to: email,
    subject: "recipe of shopping",
    html: data,
  };
  transporter.sendMail(mail_config);
};

router.post("/sign-up", async (req, res) => {
  const body = req.body;
  try {
    await UserModel.create(body);
  } catch (e) {
    return console.loge(e);
  }
});

router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    const token = jwt.sign(user.id, "liors-secret");
    const final = [user, token];
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return res.json(final);
    }
  }
  res.json(null);
});

router.post("/payment", async (req, res) => {
  const { username, total, email, cart, token } = req.body;

  const update = { shoppingHistory: total };
  await UserModel.findByIdAndUpdate(verifyTokenJwt(token), { $push: update });
  sendMail(email, username, cart);
});

module.exports = router;
