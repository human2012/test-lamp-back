const express = require('express');
const router = express.Router();
const {Products} = require('../models/products');

router.get('/', async function(req, res) {
    const products = await Products.findAll();

    res.json(products);
});

module.exports = router;
