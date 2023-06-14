const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User= require('../models/user')

module.exports = async (req, res, next) => {
   try {
       const token = req.headers?.authorization?.split(" ")?.[1];
       if (!token) {
         res.status(403).json({
           status: failed,
           Error: "You are not logged in",
         });   
       }
       // promisify use kora hoy call back function ke promise rupantor korar jonno jate amra async await use korte pari

       const decoded = await promisify(jwt.verify)(
         token,
         process.env.ACCESS_TOKEN
       );

       //const user= await User.findOne({email:decoded.email})
       req.user = decoded
       next()

   } catch (error) {
       res.status(500).json({
           status: "failed",
           Error:'token invalid'
    })
   }
}