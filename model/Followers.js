const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Follower = sequelize.define('Follower', {
  follower_buyer: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true 
},
  follower_seller: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true 
}
}, {
  tableName: 'followers',
  timestamps: false
});

module.exports = Follower;
