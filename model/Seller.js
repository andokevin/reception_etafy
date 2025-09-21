const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seller = sequelize.define('Seller', {
  seller_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  seller_name: { type: DataTypes.STRING(100), allowNull: false },
  seller_email: { type: DataTypes.STRING(254), allowNull: false, unique: true, validate: { isEmail: true } },
  seller_password: { type: DataTypes.STRING(128), allowNull: false },
  seller_phone: { type: DataTypes.STRING, allowNull: false },
  seller_profile: { type: DataTypes.STRING, allowNull: false},
  seller_address: { type: DataTypes.STRING, allowNull: false},
  seller_otp_reset: { type: DataTypes.STRING },
  seller_expires_otp: { type: DataTypes.DATE},
  temp_new_password: { type: DataTypes.STRING }
}, {
  tableName: 'sellers',
  timestamps: false
});

module.exports = Seller;
