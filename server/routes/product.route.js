const router = require("express").Router();
const ProductModel = require("../models/Product");
const UserModel = require("../models/User");

router.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});

router.post("/admin", async (req, res) => {
  const body = req.body;

  await ProductModel.create(body);
  res.json("ok");
});
router.delete("/admin", async (req, res) => {
  let body = req.body.product;
  await ProductModel.deleteOne({ name: body });
  res.json("ok");
});

router.get("/admin", async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});
router.put("/admin", async (req, res) => {
  const { productName, price } = req.body;
  const filter = { name: productName };
  const update = { price: price };

  await ProductModel.findOneAndUpdate(filter, update);
  res.json("ok");
});

module.exports = router;
