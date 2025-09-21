const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserCategory = sequelize.define('UserCategory', {
  category_id: { type: DataTypes.INTEGER, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, primaryKey: true }
}, {
  tableName: 'user_categories',
  timestamps: false
});

module.exports = User_Category;
