const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const { createJWT } = require("../helpers/create-jwt");

const login = async (req, res = response) => {
    const {email, pass} = req.body;

    try 
    {
       const user = await User.findOne({email});
       if (!user) {
           return res.status(400).json({
           msg: 'User/Pass wrong'
          }); 
       }

       if (!user.state) {
           return res.status(400).json({
           msg: 'State user false'
          }); 
       }

       const valPass = bcrypt.compareSync(pass, user.pass);
       if (!valPass) {
           return res.status(400).json({
           msg: 'Pass wrong'
          }); 
       }

       const token = await createJWT(user.id);

        res.json({
            msg: 'Login success',
            user,
            token
        })   
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Call the Admin'
        });
    }
    
}

module.exports = {
    login
}