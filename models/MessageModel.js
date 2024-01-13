const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

// Message Model
const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    timestampSent: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  });
  
  module.exports = { Message };