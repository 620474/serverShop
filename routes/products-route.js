const express = require('express');
const router = express.Router();
const controller = require('../controllers/products-controller');



router.route('/')
    .get(controller.show)


module.exports = router;
