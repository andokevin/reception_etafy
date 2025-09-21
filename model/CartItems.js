const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartItem = sequelize.define('CartItem', {
  ci_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  ci_cart: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  ci_product: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  ci_quantity: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  ci_price: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'cart_items',
  timestamps: false
});

module.exports = CartItem;
