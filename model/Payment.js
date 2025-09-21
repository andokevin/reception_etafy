const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  payment_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  payment_order: { 
    type: DataTypes.INTEGER 
},
  payment_amount: { 
    type: DataTypes.INTEGER(12),
    allowNull: false
},
  payment_method: { 
    type: DataTypes.STRING(50),
    allowNull: false
},
  payment_status: { 
    type: DataTypes.STRING(50), 
    defaultValue: 'pending' 
},
  payment_transaction: { 
    type: DataTypes.STRING(100),
    allowNull: false
}
}, {
  tableName: 'payments',
  timestamps: false
});

module.exports = Payment;
