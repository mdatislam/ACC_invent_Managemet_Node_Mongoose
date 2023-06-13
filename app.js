const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require('./routes/product.route')
const stockRouter = require('./routes/stock.route')
const brandRouter= require('./routes/brand.route')
const storeRouter = require('./routes/store.route')
const supplierRouter= require('./routes/supplier.route')
const userRouter= require('./routes/user.route')

// middle wares

app.use(express.json());
app.use(cors());


// route

app.use("/api/v1/product",productRouter);
app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/user", userRouter);



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
