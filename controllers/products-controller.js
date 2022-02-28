const Product = require('../models/products-model');
const paginate = require('../api/paginate')

module.exports = {
    index: function (req, res) {
        const page = parseInt(req.query._page);
        const limit = parseInt(req.query._limit);

        Product.find({})
            .then((products) => {
                let result = paginate(products,page,limit)
                if(!result) result = products
                res.status(200).json(products)
            })
            .catch((err) => console.log(err));
    },
    show: function (req, res) {
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
