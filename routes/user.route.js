const express = require('express')
const router = express.Router()
const userController= require('../controllers/user.controller')


router.post('/singUp', userController.singUp)
    .get('/', userController.getUser)
    .post('/login',userController.login)

module.exports=router