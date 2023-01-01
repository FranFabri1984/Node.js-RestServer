const { response, request } = require('express');

const isAdmin = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'You must validate the token first'
        });
    }

    const {rol, name} = req.user;

    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${name} is not admin`
        });
    }
    next();
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'You must validate the token first'
            });
        }
    
        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: `Require rol ${roles}`
            });
        }
        next();
    }
    
}

module.exports = {
    isAdmin,
    hasRole
}