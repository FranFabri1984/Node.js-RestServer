const Role = require('../models/role');
const {User, Category, Product }= require('../models');

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

const existCategoryById = async (id = '') => {
    const existid = await Category.findById(id);
    if (!existid) {
        throw new Error(`Id ${id} not exist`);
    } 
}

const existProductById = async (id = '') => {
    const existid = await Product.findById(id);
    if (!existid) {
        throw new Error(`Id ${id} not exist`);
    } 
}

const setAllowed = (set = '', sets = []) => {
    const include = sets.includes(set);
    if (!include) {
        throw new Error(`${set} not allowed - ${sets}`);
    }

    return true;
}

module.exports = {
    isValid,
    existEmail,
    existUserId,
    existCategoryById,
    existProductById,
    setAllowed
}