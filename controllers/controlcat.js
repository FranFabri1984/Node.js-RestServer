const { response } = require('express');
const {Category} = require('../models');

const getCategories = async (req = request, res  = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
		    .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
}
const getCatById = async (req = request, res  = response) => {
	const {id} = req.params;
    const category = await Category.findById(id)
	.populate('user', 'name');
      
    res.json({
		category
    });
}

const createCategory = async (req, res = response) => {
	const name = req.body.name.toUpperCase();
	const categoryDB = await Category.findOne({ name });

	if (categoryDB) {
		return res.status(400).json({
			msg: `The ${categoryDB.name} already exists`,
		});
	}

	const data = {
		name,
		user: req.user._id,
	};

	const category = new Category(data);
	await category.save();
	res.status(201).json(category);
};

const putCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;
	data.name  = data.name.toUpperCase();
    data.user = req.user._id;
    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.status(300).json({
    category
    });
}

const delCategory = async (req = request, res = response) => {
	const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});

    res.json({
		category
	});
}

module.exports = {
	getCategories,
	getCatById,
	createCategory,
	putCategory,
	delCategory
};