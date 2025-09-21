const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  user_id: 
  { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true },
  user_name: 
  { 
    type: DataTypes.STRING(50), 
    allowNull: false },
  user_prename: {
     type: DataTypes.STRING(50) },
  user_email: { 
    type: DataTypes.STRING(254), 
    allowNull: false, 
    unique: true, 
    validate: { isEmail: true } },
  user_password: { 
    type: DataTypes.STRING(128), 
    allowNull: false, 
    validate: { len: [8,128] } },
  user_address: {
     type: DataTypes.STRING(120),
     allowNull: false
    },
  user_province: {
     type: DataTypes.STRING(50),
     allowNull: false
    },
  user_district: {
     type: DataTypes.STRING(100),
     allowNull: false
    },
  user_phone: { 
    type: DataTypes.STRING(13),
    allowNull: false
},
  user_genre: { 
    type: DataTypes.ENUM('Femme','Homme') },
  user_profile: { 
    type: DataTypes.BLOB
    },
  user_otp_reset: { type: DataTypes.STRING },
  user_expires_otp: { type: DataTypes.DATE },
  temp_new_password: { type: DataTypes.STRING }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
