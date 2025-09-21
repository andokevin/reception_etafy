const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorite = sequelize.define('Favorite', {
  favorite_buyer: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true 
},
  favorite_product: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true 
}
}, {
  tableName: 'favorites',
  timestamps: false
});

module.exports = Favorite;
