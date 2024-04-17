const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ProductSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    rating: {
        rate: {type: Number, required: true},
        count: {type: Number, required: true}
    }
});

const ProductModel = model('Product', ProductSchema);

module.exports = ProductModel;