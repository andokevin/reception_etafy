const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Promotion = sequelize.define('Promotion', {
  promotion_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  promotion_seller: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  promotion_product: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  promotion_value: { 
    type: DataTypes.INTEGER(12), 
    allowNull: false 
  },
  promotion_details: { 
    type: DataTypes.TEXT
  },
  promotion_start: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  promotion_end: { 
    type: DataTypes.DATE, 
    allowNull: false 
  }
}, {
  tableName: 'promotions',
  timestamps: false
});

module.exports = Promotion;
