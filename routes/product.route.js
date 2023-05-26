const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')


// routes 

router.route('/')
    .get(productController.getProduct)
    .post(productController.createProduct)

    
module.exports=router