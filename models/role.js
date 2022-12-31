const {Schema, model} = require('mongoose');

const  roleSchema = Schema ({
    rol: 
    {
        type: String,
        required: [true, 'Required rol']
    }
});

module.exports = model('Role', roleSchema);

