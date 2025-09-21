const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
  cart_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  cart_buyer: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
},
  cart_session: { 
    type: DataTypes.STRING(100),
    allowNull: false
},
  cart_status: { 
    type: DataTypes.BOOLEAN,
    allowNull:false
}
}, {
  tableName: 'carts',
  timestamps: true
});

module.exports = Cart;
