const express = require('express')
const router = express.Router()
const supplierController=require('../controllers/supplier.controller')


router.route('/').get(supplierController.getSupplier)
                .post(supplierController.createSupplier)

module.exports=router