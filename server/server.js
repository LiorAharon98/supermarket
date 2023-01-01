const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const { setServerConfiguration } = require("./config");
require("dotenv").config();

setServerConfiguration(app);
mongoose.connect(process.env.MONGODB_URI);

app.use("/supermarket", productRouter);

app.use("/supermarket/user", userRouter);

app.listen(process.env.PORT);
