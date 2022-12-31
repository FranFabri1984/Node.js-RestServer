const {Schema, model} = require('mongoose');


const userSchema = Schema ({
    name: 
    {
        type: String,
        required: [true, 'Required name']
    },
    email: 
    {
        type: String,
        required: [true, 'Required email'],
        unique: true
    },
    pass: 
    {
        type: String,
        required: [true, 'Required pass'],
    },
    img: 
    {
        type: String
    },
    rol: 
    {
        type: String,
        required: true,
        enum: ['ADMIN','USER']
    },
    state: 
    {
        type: Boolean,
        default: true
    },
    google: 
    {
        type: Boolean,
        default: false
    },

});

userSchema.methods.toJSON = function() {
    const {__v, pass, ...hideUser} = this.toObject();
    return hideUser;
}


module.exports = model('User', userSchema);