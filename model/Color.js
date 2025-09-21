
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Color = sequelize.define('Color', {
  color_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  color_name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  color_code: { 
    type: DataTypes.STRING(100), 
    allowNull: true
  }
}, 
{
  tableName: 'colors',
  timestamps: false
});

module.exports = Brand;
