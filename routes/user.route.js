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
    await UserModel.find({}, (err, obj) => {
        res.json(obj);
      });
    });

    router.post('/payment', async(req,res)=>{
let body = req.body
res.send(body)
const filter = {username : body.username};
const update = {shoppingHistory : body.total};
const opts = { new: true };
await UserModel.findOneAndUpdate(filter,{$push : update},opts)
    })

module.exports = router;
