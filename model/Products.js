const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  product_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  product_name: { type: DataTypes.STRING(150), allowNull: false },
  product_description: { type: DataTypes.TEXT, allowNull: false },
  product_price: { type: DataTypes.INTEGER(12), allowNull: false },
  product_seller: { type: DataTypes.INTEGER , allowNull: false},
  product_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  product_brand: { type: DataTypes.INTEGER, allowNull: false },
  product_category: { type: DataTypes.INTEGER, allowNull: false},
  product_genre: { type: DataTypes.STRING , allowNull:false},
  product_second_hand: { type: DataTypes.BOOLEAN, defaultValue: false },
  product_images: { type: DataTypes.JSON, allowNull: false},
  product_status: { type: DataTypes.STRING, allowNull: false},
  product_size: { type: DataTypes.STRING, allowNull: false},
  product_fabric: { type: DataTypes.STRING, allowNull: false},
  product_with_default: { type: DataTypes.BOOLEAN, defaultValue: false },
  product_default_description: { type: DataTypes.TEXT},
  product_color: { type: DataTypes.STRING, allowNull: false},
  product_like_count: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
