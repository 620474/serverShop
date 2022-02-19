const express = require('express');
const router = express.Router();
const controller = require('../controllers/products-controller');



router.route('/')
    .get(controller.index)

router.route('/:id')
    .get(controller.show)
module.exports = router;


