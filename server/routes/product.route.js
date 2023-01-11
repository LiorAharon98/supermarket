const router = require("express").Router();
const ProductModel = require("../models/Product");
const UserModel = require("../models/User");

const allProducts = async () => {
  const products = await ProductModel.find({});
  return products;
};
router.get("/", async (req, res) => {
  const products = await allProducts();
  res.json(products);
});

router.post("/admin", async (req, res) => {
  try {
    await ProductModel.create(req.body);
    res.json("ok");
  } catch (error) {
    console.log(error);
  }
});
router.delete("/admin", async (req, res) => {
  let body = req.body.product;
  try {
    await ProductModel.deleteOne({ name: body });
    res.json("ok");
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin", async (req, res) => {
  const users = await UserModel.find();

  res.json(users);
});
router.put("/admin", async (req, res) => {
  const { productName, price } = req.body;
  const filter = { name: productName };
  const update = { price: price };
  try {
    await ProductModel.findOneAndUpdate(filter, update);
    res.json("ok");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
