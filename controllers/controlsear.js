const { response } = require('express');
const {ObjectId} = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const setCollection = [
    'users',
    'categories',
    'products',
    'roles',
]

const searchUser = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const user = await User.findById(term);
        res.json({
            results: user ? [user] : []
        });
    }

    const regex = RegExp(term, 'i');
    const user = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{state: true}]
    });
    
    res.json({
        results: user
    });
}

const searchCat = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const cat = await Category.findById(term);
        res.json({
            results: cat ? [cat] : []
        });
    }

    const regex = RegExp(term, 'i');
    const cat = await Category.find({
        name: regex, state: true
    });

    res.json({
        results: cat
    });
}

const searchPro = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const product = await Product.findById(term)
                       .populate('category', 'name');
        res.json({
            results: product ? [product] : []
        });
    }

    const regex = RegExp(term, 'i');
    const product = await Product.find({
          name: regex, state: true})
         .populate('category', 'name');

    res.json({
        results: product
    });
}

const Search = (req = request, res  = response) => {
    const {set, term} = req.params;

    if (!setCollection.includes(set)) {
        return res.status(400).json({
            msg: `The allowed collections are: ${setCollection}`
        })
    }

    switch (set) {
        case 'users':
            searchUser(term, res);
            break;
        case 'categories':
            searchCat(term, res);
            break;
        case 'products':
            searchPro(term, res);
            break;
        default:
            res.status(500).json({
                msg: 'Required search'
            });
            break;
    }

}

module.exports = {
	Search
};