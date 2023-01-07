const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'Required name'],
        unique: true
    },
    state: 
    {
        type: Boolean,
        default: true,
        required: true
    },
    user: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: 
    {
        type: Number,
        default: 0
    },
    category: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    desc: 
    { 
        type: String 
    },
    available: 
    { 
        type: Boolean, defult: true 
    },
    img: 
    { 
        type: String 
    },
});


productSchema.methods.toJSON = function() {
    const { __v, state, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Product', productSchema );