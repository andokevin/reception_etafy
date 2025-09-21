const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserColor = sequelize.define('UserColor', {
  color_id: { type: DataTypes.INTEGER, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, primaryKey: true }
}, {
  tableName: 'user_colors',
  timestamps: false
});

module.exports = User_Category;
