const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const uploader = require('../midleware/fileUploder')



// routes

router.route("/file-upload").post(uploader.single('image'), productController.fileUpload)
 /* for Multiple file uploaded : 
 only single ---> array 
 router.route("/file-upload").post(uploader.array('image'), productController.fileUpload)
 */



router.route("/bulk-update").patch(productController.updateBulkProduct);
router.route("/bulk-delete").delete(productController.deleteBulkProduct);

router.route('/')
    .get(productController.getProduct)
    .post(productController.createProduct) 
    
router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

    
module.exports=router