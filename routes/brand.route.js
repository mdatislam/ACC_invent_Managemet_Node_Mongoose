const express = require('express')
const router = express.Router()
const brandController=require('../controllers/brand.controller')

router.route('/').get(brandController.getBrand)
    .post(brandController.createBrand)
                
router
  .route("/:id")
  .patch(brandController.updateBrand)
  .get(brandController.getBrandById);

module.exports=router