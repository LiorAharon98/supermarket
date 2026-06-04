const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");

const { setServerConfiguration } = require("./config");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

require("dotenv").config();

setServerConfiguration(app);
mongoose.connect(process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL);

app.use("/supermarket", productRouter);

app.use("/supermarket/user", userRouter);

app.listen(process.env.PORT,()=>{
    console.log('server is up')
});
