const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require('./routes/product.route')
const stockRouter = require('./routes/stock.route')

// middle wares

app.use(express.json());
app.use(cors());


// route

app.use("/api/v1/product",productRouter);
app.use("/api/v1/stock", stockRouter);



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
