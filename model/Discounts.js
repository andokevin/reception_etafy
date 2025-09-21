const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Discount = sequelize.define('Discount', {
  discount_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  discount_seller: { 
    type: DataTypes.INTEGER 
},
  discount_code: { 
    type: DataTypes.STRING(50), 
    unique: true 
},
  discount_type: { 
    type: DataTypes.ENUM('percentage', 'fixed') 
},
  discount_value: { 
    type: DataTypes.DECIMAL(10,2) 
},
  discount_order_total: { 
    type: DataTypes.DECIMAL(10,2) 
},
  discount_limit: { 
    type: DataTypes.INTEGER 
},
  discount_expired_date: { 
    type: DataTypes.DATE 
},
  discount_status: { type: DataTypes.STRING(50)
    
  }
}, {
  tableName: 'discounts',
  timestamps: false
});

module.exports = Discount;
