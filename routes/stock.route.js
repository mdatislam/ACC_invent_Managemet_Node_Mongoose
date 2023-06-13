const express = require('express')
const router = express.Router()
const stockController = require("../controllers/stock.controller");


router.route("/").get(stockController.getStock)
    .post(stockController.createStock)
                
// router.route('/:id').patch(stockController.updateStockById)
//                     .delete.apply(stockController.deleteStockById)

module.exports=router