const Role = require('../models/role');
const User = require('../models/userSchema');

 const isValid = async (rol = '') => {
    const existRol = await Role.findOne({rol});
    if (!existRol) {
        throw new Error(`${rol} not exist in database`)
    }
}

const existEmail = async (email = '') => {
    const exist = await User.findOne({email});
    if (exist) {
        throw new Error(`Email ${email} already exist`);
    } 
}

const existUserId = async (id = '') => {
    const existid = await User.findById(id);
    if (!existid) {
        throw new Error(`Id ${id} not exist`);
    } 
}

module.exports = {
    isValid,
    existEmail,
    existUserId
}