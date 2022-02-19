const Product = require('../models/products-model');
const moment = require('moment');

module.exports = {
    index: function (req,res) {
        Product.find({})
            .then((products)=>{
                res.status(200).json({products: products})
            })
            .catch((err) => console.log(err));
    },
    show: function(req,res) {
        Product.findOne({id: req.params.id}, (err, task) => {
            console.log()
            if (err) {
                return res.status(500).json();
            }
            if (!task) {
                return res.status(404).json();
            }
            return res.status(200).json({task: task});
        })
    }
}
