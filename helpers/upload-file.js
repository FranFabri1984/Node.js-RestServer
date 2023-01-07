const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validate = ['png','jpg','jpeg','gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const {file} = files;
        const cutName = file.name.split('.');
        const ext = cutName[cutName.length - 1];

        if (!validate.includes(ext)) {
            return reject(`${ext} not valid - ${validate}`) 
        }
       
        const nameTemp = uuidv4() + '.' + ext;
        const uploadPath = path.join(__dirname, '../uploads/', folder , nameTemp);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
           resolve(nameTemp);
        });
    }); 
    
}

module.exports = {
    uploadFile
}