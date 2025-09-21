const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
  order_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true 
  },
  product_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true 
  },
  order_item_quantity: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  order_item_price: { 
    type: DataTypes.DECIMAL(12, 2), 
    allowNull: false 
  },
  order_item_total_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

module.exports = OrderItem;
