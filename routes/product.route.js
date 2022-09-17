const router = require("express").Router();
const { upload } = require("../config");
const ProductModel = require("../models/Product");
const UserModel = require("../models/User");

router.get("/", async (req, res) => {
  UserModel.find({}, (err, obj) => {
    ProductModel.find({}, (err, obj2) => {
      const temp = [obj, obj2];
      res.json(temp);
    });
  });
});

router.post("/add-product", upload.single("product"), async (req, res) => {
  let img = req.file.filename;
  const body = req.body.product;

  await ProductModel.create({
    name: body[0],
    price: body[1],
    category: body[2],
    picture: img,
  });
  res.send(img);
});
router.delete("/admin", async (req, res) => {
  let body = req.body.product;
  res.send(body);
  await ProductModel.deleteOne({ name: body }, (err, obj) => {});
});
router.post("/admin", async (req, res) => {
  let price = req.body.price;
  let productName = req.body.productName;
  const filter = { name: productName };
  const update = { price: price };
  const opts = { new: true };

  await ProductModel.findOneAndUpdate(filter, update, opts);
});

module.exports = router;
