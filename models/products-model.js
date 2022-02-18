const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const productSchema = new Schema({
    createAt: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    name: {
        type: String
    },
    updatedAt: {
        type: Date
    },
    images: {
        type: Array
    }
}, {
    timestamps: true
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;
