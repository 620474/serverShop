const Product = require('../models/products-model');

module.exports = {
    index: function (req,res) {
        Product.find({})
            .then((products)=>{
                res.status(200).json(products)
            })
            .catch((err) => console.log(err));
    },
    show: function(req,res) {
        Product.findOne({id: req.params.id}, (err, product) => {
            if (err) {
                return res.status(500).json();
            }
            if (!product) {
                return res.status(404).json();
            }
            return res.status(200).json(product);
        })
    }
}
