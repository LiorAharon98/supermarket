const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const { setServerConfiguration } = require("./config");

setServerConfiguration(app);
mongoose.connect(process.env.port);

app.use("/shopping-cart", productRouter);
app.use("/user", userRouter);
app.use(express.static(path.join(__dirname,'/shopping-cart/build' )));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/shopping-cart/build', 'index.html'));
});
app.listen(process.env.PORT||5000);
