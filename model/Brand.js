
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand = sequelize.define('Brand', {
  brand_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  brand_name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  }
}, 
{
  tableName: 'brands',
  timestamps: false
});

module.exports = Brand;
