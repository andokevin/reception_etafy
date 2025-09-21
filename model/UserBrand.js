const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserBrand = sequelize.define('UserBrand', {
  brand_id: { type: DataTypes.INTEGER, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, primaryKey: true }
}, {
  tableName: 'user_brands',
  timestamps: false
});

module.exports = User_Brand;
