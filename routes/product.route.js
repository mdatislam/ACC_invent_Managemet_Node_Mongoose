const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')



// routes

router.route("/bulk-update").patch(productController.updateBulkProduct);
router.route("/bulk-delete").delete(productController.deleteBulkProduct);

router.route('/')
    .get(productController.getProduct)
    .post(productController.createProduct) 
    
router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

    
module.exports=router