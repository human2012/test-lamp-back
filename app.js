const express = require('express');
const {sequelize} = require("./models");
require("./models/products");
require("./models/orders");

const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser());

const ProductsController = require('./controllers/products');
const CartController = require('./controllers/cart');
const OrdersController = require('./controllers/orders');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
});
app.set('trust proxy', 1);

var MemoryStore = session.MemoryStore;
app.use(session({
    secret: 'some secret',
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: {
        path: '/',
        maxAge: 1000 * 60 * 24,
    }
}));

app.use('/products', ProductsController);
app.use('/cart', CartController);
app.use('/orders', OrdersController);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}).catch(e => console.log(e));

