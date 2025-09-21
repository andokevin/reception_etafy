
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fabric = sequelize.define('Fabric', {
  fabric_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  fabric_name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  }
}, 
{
  tableName: 'fabrics',
  timestamps: false
});

module.exports = Fabric;
