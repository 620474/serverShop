const Product = require('../models/products-model');
const moment = require('moment');

module.exports = {
    show: function (req,res) {
        Product.find({})
            .then((products)=>{
                res.status(200).json({products: products})
            })
            .catch((err) => console.log(err));
    }
}
