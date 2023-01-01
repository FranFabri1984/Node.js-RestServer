const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const validateJWT = async (req = request, res = response, next) => {
   const token = req.header('x-token');
   
   if (!token) {
       return res.status(401).json({
       msg: 'There is no token in the request'
     });
   }

   try 
   {
    const {uid} = jwt.verify(token, process.env.PRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
        return res.status(401).json({
            msg: 'User not exist in the database'
        });
    }
    if (!user.state) {
        return res.status(401).json({
               msg: 'State user false'
           });
    }
    req.user = user;
    next();
   } 
   catch (error) 
   {
      console.log(error);
      res.status(401).json({
      msg: 'Invalid token'
     });
   }

}

module.exports = {
    validateJWT
}