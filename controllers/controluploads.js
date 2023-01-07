const { response } = require("express");
const path = require('path');
const fs = require('fs');
const { uploadFile } = require("../helpers/upload-file");
const {User, Product} = require('../models');

const loadFile = async(req, res = response) => {
    try 
    {
        //const nameFile = await uploadFile(req.files, ['txt','md'], 'texts');
        const nameFile = await uploadFile(req.files, undefined , 'img');
        res.json({nameFile})
    } 
    catch (error) 
    {
        res.status(400).json({error});
    }

}

const putImg = async (req, res = response) => {
    const {set,id} = req.params;
    
    let model;
    switch (set) {
        case 'users':
          model = await User.findById(id); 
          if (!model) {
            return res.status(400).json({
                msg: `User ${id} not exist`
            });
          }
        break;
        case 'products':
          model = await Product.findById(id); 
          if (!model) {
            return res.status(400).json({
                msg: `Product ${id} not exist`
            });
          }
        break;
        default:
            return res.status(500).json({msg: 'The collection is not validated'});
    }

    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', set, model.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const nameFile = await uploadFile(req.files, undefined , set);
    model.img = nameFile;
    await model.save();
    res.json(model);

}

const showImg = async(req, res = response) => {
    const {set,id} = req.params;
    
    let model;
    switch (set) {
        case 'users':
          model = await User.findById(id); 
          if (!model) {
            return res.status(400).json({
                msg: `User ${id} not exist`
            });
          }
        break;
        case 'products':
          model = await Product.findById(id); 
          if (!model) {
            return res.status(400).json({
                msg: `Product ${id} not exist`
            });
          }
        break;
        default:
            return res.status(500).json({msg: 'The collection is not validated'});
    }

    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', set, model.img);
        if (fs.existsSync(pathImg)) {
           return res.sendFile(pathImg)
        }
    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);
}

module.exports = {
    loadFile,
    putImg,
    showImg
}