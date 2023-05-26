const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require('./routes/product.route')

// middle wares

app.use(express.json());
app.use(cors());


// route

app.use("/api/v1/product",productRouter);



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
