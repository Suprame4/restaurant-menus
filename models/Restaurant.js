const sequelize = require('../db');
const { DataTypes } = require('sequelize');
console.log("test: ", sequelize)

// TODO - create a Restaurant model
const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
})

module.exports = Restaurant;