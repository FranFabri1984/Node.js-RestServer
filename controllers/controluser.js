const {response, request} = require('express');

const getUser = (req = request, res  = response) => {
    const {query,apikey,page = 1} = req.query;
    res.json({
    msg: 'get API',
    query,
    apikey,
    page
    });
}

const postUser = (req, res = response) => {
    const {name , age} = req.body;
    res.json({
    msg: 'post API',
    name,
    age
    });
}

const putUser = (req, res = response) => {
    const {id } = req.params;
    res.status(300).json({
    msg: 'put API',
    id
    });
}

const delUser = (req, res = response) => {
    res.status(301).json({
    msg: 'delete API'
    });
}

const patchUser = (req, res = response) => {
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