const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notification = sequelize.define('Notification', {
  notification_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
},
  notification_user: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
},
  notification_title: { 
    type: DataTypes.STRING(150),
    allowNull: false
},
  notification_message: { 
    type: DataTypes.TEXT,
    allowNull: false
},
  notification_type: {
     type: DataTypes.STRING(50),
     allowNull: false 
    },
  notification_is_read: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false },
  notification_entity_type: { 
    type: DataTypes.STRING(50),
    allowNull: false 
},
  notification_entity_id: { 
    type: DataTypes.INTEGER,
allowNull: false
}
}, {
  tableName: 'notifications',
  timestamps: false
});

module.exports = Notification;
