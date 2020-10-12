const express = require('express');
const router = express.Router();
const {Orders} = require('../models/orders');


router.get('/', async function(req, res) {
    const orders = await Orders.findAll();

    res.json(orders);
});

router.post('/', async function (req, res) {
    const {name, surname, address, phone} = req.body;

    if (!name || !surname || !address || !phone || name.length < 3 || surname.length < 3 || address.length < 3 || phone.length < 3) {
        return res.status(400).json({
            error: 'Validation error'
        });
    }

    await Orders.create({
        name,
        surname,
        address,
        phone,
        products: req.session.cart
    });

    req.session.cart = {};

    res.json({
        status: 'ok'
    });
});

module.exports = router;
