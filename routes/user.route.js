const router = require('express').Router();
const errorsHandler = require('../utils/errorsHandler');
const UserModel = require('../models/User');

router.post("/sign-up", async (req, res) => {
    let body = req.body;
    try{
        await UserModel.create({
            name: body.name,
            username: body.username,
            password: body.password,
            shoppingHistory: [],
          });
          res.send(body);
    }catch(e){
        return errorsHandler(e, req, res);
    }
});

router.get("/sign-in", async (req, res) => {
    UserModel.find({}, (err, obj) => {
        res.json(obj);
      });
    });

module.exports = router;