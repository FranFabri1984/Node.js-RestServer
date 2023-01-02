const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const { createJWT } = require("../helpers/create-jwt");
const { googlrVerify } = require("../helpers/google-verify");

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
            msg: 'Call an admin'
        });
    }
    
}

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;
    
    try 
    {
        const {name, picture, email} = await googlrVerify(id_token);
        let user = await User.findOne({email});
        if (!user) {
            const data = {
                name,
                email,
                pass: ':p',
                picture,
                rol: 'USER',
                google: true,
            };
            user = new User(data);
            await user.save();
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Call an admin'
            });
        }

        const token = await createJWT(user.id);
        
        res.json({
            msg: 'Sign in success',
            user,
            token
        });
    } 
    catch (error) 
    {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        });
    }
}
    
module.exports = {
    login,
    googleSignIn
}