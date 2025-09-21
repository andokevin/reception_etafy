const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  order_id: { type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  order_buyer: { 
    type: DataTypes.INTEGER,
    allowNull: false
   },
  order_seller: { 
    type: DataTypes.INTEGER,
    allowNull: false
},
  order_product: { 
    type: DataTypes.INTEGER,
    allowNull: false
},
  order_amount: { 
    type: DataTypes.INTEGER(12),
    allowNull: false
  },
  order_status: { 
    type: DataTypes.STRING(50),
    defaultValue: 'pending' },
  order_payment_method: { 
    type: DataTypes.STRING(50),
    allowNull: false
   },
  order_payment_status: { 
    type: DataTypes.STRING(50), 
    defaultValue: 'unpaid' 
},
  order_payment_transaction: { 
    type: DataTypes.STRING(100) 
},
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
