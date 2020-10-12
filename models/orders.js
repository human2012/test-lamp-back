const { Model, DataTypes } = require('sequelize');
const {sequelize} = require("./index");

class Orders extends Model {}

Orders.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    products: DataTypes.JSON
}, { sequelize, modelName: 'orders' });

module.exports.Orders = Orders;
