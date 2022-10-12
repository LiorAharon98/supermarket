const router = require("express").Router();
const { upload } = require("../config");
const ProductModel = require("../models/Product");
const UserModel = require("../models/User");

router.get("/", async (req, res) => {
  const temp = await Promise.all([UserModel.find({}), ProductModel.find({})]);
  res.json(temp);
});

router.post("/add-product", async (req, res) => {
  const body = req.body;
  await ProductModel.create({
    name: body[0],
    price: body[1],
    category: body[2],
    pictureUrl: body[3],
  });

  res.json("ok");
});
router.delete("/admin", async (req, res) => {
  let body = req.body.product;
  await ProductModel.deleteOne({ name: body }, (err, obj) => {});
  res.json("ok");
});
router.post("/admin", async (req, res) => {
  let price = req.body.price;
  let productName = req.body.productName;
  const filter = { name: productName };
  const update = { price: price };
  const opts = { new: true };

  await ProductModel.findOneAndUpdate(filter, update, opts);
  res.json("ok");
});

module.exports = router;
