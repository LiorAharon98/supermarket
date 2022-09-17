const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const { setServerConfiguration } = require("./config");

setServerConfiguration(app);
mongoose.connect("mongodb://localhost/shopping-cart-data-base");

app.use("/shopping-cart", productRouter);

app.use("/shopping-cart/user", userRouter);

app.listen(5000);
