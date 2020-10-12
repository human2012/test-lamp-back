const express = require('express');
const router = express.Router();
const {Products} = require('../models/products');

const fetchCart = (cart = {}) => {
    return Promise.all(Object.entries(cart).map(async ([key, value]) => {
        return {
            product: await Products.findByPk(key),
            amount: value
        }
    }))
};

router.get('/', async function(req, res) {
    const {cart = {}} = req.session;

    res.json(await fetchCart(cart));
});

router.post('/', async function(req, res) {
    const {product_id} = req.body;

    if (!product_id || typeof product_id !== 'number') {
        return res.status(400).json({
            error: 'Validation error'
        });
    }

    req.session.cart = req.session.cart || {};

    if (req.session.cart[product_id]) {
        req.session.cart[product_id]++;
    } else {
        req.session.cart = {
            ...req.session.cart,
            [product_id]: 1
        };
    }

    res.json(await fetchCart(req.session.cart));
});

router.delete('/', async function(req, res) {
    const {product_id} = req.body;

    if (!product_id || typeof product_id !== 'number') {
        return res.status(400).json({
            error: 'Validation error'
        });
    }

    req.session.cart = req.session.cart || {};

    if (req.session.cart[product_id]) {
        req.session.cart[product_id]--;
    }

    if (req.session.cart[product_id] <= 0) {
        delete req.session.cart[product_id];
    }

    res.json(await fetchCart(req.session.cart));
});

module.exports = router;
