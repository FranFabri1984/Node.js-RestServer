const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

const getUser = async (req = request, res  = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const postUser = async (req = request, res = response) => {
    const {name, email, pass, rol} = req.body;
    const newUser = new User({name, email, pass, rol});

    const salt = bcrypt.genSaltSync(10);
    newUser.pass = bcrypt.hashSync(pass, salt);

    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }  
}

const putUser = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, pass, google, email, ...putUser} = req.body;

    if (pass) {
        const salt = bcrypt.genSaltSync(10);
        putUser.pass = bcrypt.hashSync(pass, salt);
    }

    const user = await User.findByIdAndUpdate(id, putUser);

    res.status(300).json({
    user
    });
}

const delUser = async (req = request, res = response) => {
    const {id} = req.params;
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id,{state: false});
    res.status(301).json({
    user,
    });
}

const patchUser = (req = request, res = response) => {
    res.json({
    msg: 'patch API'
    });
}

module.exports = {
    getUser,
    postUser,
    putUser,
    delUser,
    patchUser
}