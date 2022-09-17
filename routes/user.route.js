const router = require('express').Router();
const errorsHandler = require('../utils/errorsHandler');
const UserModel = require('../models/User');

router.post("/sign-up", async (req, res) => {
    let body = req.body;
    try{
        await UserModel.create({
            username: body.username,
            email : body.email,
            password: body.password,
            shoppingHistory: [],
          });
          res.send(body);
    }catch(e){
        return console.log("error")
    }
});
router.get("/sign-in", async (req, res) => {
    UserModel.find({}, (err, obj) => {
        res.json(obj);
      });
    });

module.exports = router;
