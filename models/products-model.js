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
    category: {
        type: Object
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
        type: String,
        default: new Date(1)
    },
    images: {
        type: Array
    }
}, {
    timestamps: true
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;
