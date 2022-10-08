const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const { setServerConfiguration } = require("./config");

setServerConfiguration(app);
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://liors-database:lior.ah98@cluster0.iybrzvm.mongodb.net/shopping-cart?retryWrites=true&w=majority"
);

app.use("/shopping-cart", productRouter);

app.use("/shopping-cart/user", userRouter);

app.listen(process.env.PORT || 8000);
