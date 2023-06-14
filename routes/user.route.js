const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken= require('../midleware/verifyToken')
const authorization = require('../midleware/authorization')


router.post('/singUp', userController.singUp)
    .get('/', userController.getUser)
    .post('/login',userController.login)
    .get('/me',verifyToken,authorization("admin","engineer") ,userController.getMe)

module.exports=router