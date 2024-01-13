const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

// User Model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: true
    }

});

module.exports = { User };