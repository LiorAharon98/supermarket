const router = require('express').Router();
const {upload} = require('../config');
const ProductModel = require('../models/Product');
const UserModel = require('../models/User');

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
  
    ProductModel.create({
      name: body[0],
      price: body[1],
      category: body[2],
      picture: img,
    });
    res.send(img);
  });

  module.exports = router;