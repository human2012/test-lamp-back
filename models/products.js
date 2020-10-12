const { Model, DataTypes } = require('sequelize');
const {sequelize} = require("./index");

class Products extends Model {}

Products.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
}, { sequelize, modelName: 'products' });

module.exports.Products = Products;
