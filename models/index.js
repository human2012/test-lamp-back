const {Sequelize} = require('sequelize');

module.exports =  {
    sequelize: new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'QAZWSX11',
        database: 'shop'
    })
};
