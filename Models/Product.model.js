const mongoose = require('mongoose');
const schema = mongoose.Schema;

//NOTE: This is my constructor?!
const ProductSchema = new mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        price:
        {
            type: Number,
            required: true
        }
    }
);

//Takes two parameters, product name(puralizes), and schema object.
//NOTE: The schema is the criteria. Mongoose.model has the save method
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;