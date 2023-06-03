const express = require('express')
const router = express.Router()
const stockController = require("../controllers/stock.controller");


router.route("/").get(stockController.getStock).post(stockController.createStock)

module.exports=router