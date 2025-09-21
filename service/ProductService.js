const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Product = require('../models/product');

class ProductService {

  // Création d'un produit
  async createProduct(data) {
    try {
      if (data.product_image) {
        const base64Data = data.product_image.replace(/^data:image\/\w+;base64,/, '');
        const extension = data.product_image.match(/^data:image\/(\w+);base64,/)[1] || 'jpg';
        const imageName = `product_${Date.now()}.${extension}`;
        const imagePath = path.join(__dirname, '../uploads/products', imageName);
        fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));
        data.product_images = [imageName];
        delete data.product_image;
      }

      const product = await Product.create(data);
      return product.product_id;
    } catch (error) {
      throw new Error('Erreur lors de la création du produit : ' + error.message);
    }
  }

  // Liste des produits actifs
  async listProduct() {
    return Product.findAll({ where: { product_status: 'true' } });
  }

  // Récupérer un produit par ID
  async getProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');
    return product;
  }

  // Mise à jour d'un produit
  async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');

    if (data.product_image) {
      const base64Data = data.product_image.replace(/^data:image\/\w+;base64,/, '');
      const extension = data.product_image.match(/^data:image\/(\w+);base64,/)[1] || 'jpg';
      const imageName = `product_${Date.now()}.${extension}`;
      const imagePath = path.join(__dirname, '../uploads/products', imageName);
      fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));
      data.product_images = [imageName];
      delete data.product_image;
    }

    await product.update(data);
    return true;
  }

  // Suppression logique d'un produit
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');

    if (product.product_images && product.product_images.length > 0) {
      product.product_images.forEach(img => {
        const imgPath = path.join(__dirname, '../uploads/products', img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    await product.destroy();
    return true;
  }

  // Publication d'un produit
  async publishProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Produit introuvable');

    product.product_status = 'true';
    await product.save();
    return true;
  }

  // Recherche de produits
  async searchProduct({ searchTerm, category, genre, minPrice, maxPrice }) {
    const where = { product_status: 'true' };
    if (searchTerm) {
      where[Op.or] = [
        { product_name: { [Op.like]: `%${searchTerm}%` } },
        { product_description: { [Op.like]: `%${searchTerm}%` } },
        { product_color: { [Op.like]: `%${searchTerm}%` } },
      ];
    }
    if (category) where.product_category = category;
    if (genre) where.product_genre = genre;
    if (minPrice != null && maxPrice != null) where.product_price = { [Op.between]: [minPrice, maxPrice] };
    return Product.findAll({ where });
  }

  // Produits d'occasion
  async getAllProductSecondHand() {
    return Product.findAll({ where: { product_second_hand: true, product_status: 'true' } });
  }

  // Produits par vendeur
  async getProductBySeller(sellerId) {
    return Product.findAll({ where: { product_seller: sellerId, product_status: 'true' } });
  }

  // Produits similaires par couleur et nom
  async getSimilarProducts(productId) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Produit introuvable');

    return Product.findAll({
      where: {
        product_id: { [Op.ne]: productId },
        product_status: 'true',
        [Op.or]: [
          { product_color: product.product_color },
          { product_name: product.product_name },
          { product_description: product.product_description },
        ]
      },
      order: [
        ['product_genre', 'DESC'],
        ['product_seller', 'DESC'],
        ['product_price', 'DESC'],
        ['product_name', 'ASC']
      ],
      limit: 10
    });
  }

  // Produits par catégorie
  async getProductByCategory(category) {
    return Product.findAll({ where: { product_category: category, product_status: 'true' } });
  }

  // Produits par genre
  async getProductByGenre(genre) {
    return Product.findAll({ where: { product_genre: genre, product_status: 'true' } });
  }

  // Produits par date de création
  async getProductByDates(startDate, endDate) {
    return Product.findAll({
      where: {
        product_created_at: { [Op.between]: [startDate, endDate] },
        product_status: 'true'
      }
    });
  }

  // Liste par couleur et genre favoris
  async listProductByUserFavorite(colors, genre) {
    const where = { product_status: 'true' };
    let order = [];

    if (genre) order.push([['product_genre', 'DESC']]);
    if (colors && colors.length > 0) order.push([['product_color', 'DESC']]);

    return Product.findAll({ where, order });
  }

  // Mise à jour du stock
  async updateStock(productId, quantity, operation = 'subtract') {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Produit introuvable');

    if (operation === 'add') product.product_quantity += quantity;
    else if (operation === 'subtract') product.product_quantity -= quantity;
    else throw new Error('Opération de stock invalide');

    await product.save();
    return true;
  }

  // Prix d'un produit
  async getProductPrice(productId) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Produit introuvable');
    return product.product_price;
  }

  // Likes / Unlikes
  async likeProduct(productId) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Produit introuvable');
    product.product_like_count += 1;
    await product.save();
    return true;
  }

  async unlikeProduct(productId) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Produit introuvable');
    product.product_like_count -= 1;
    await product.save();
    return true;
  }

  async getProductLikeCount(productId) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Produit introuvable');
    return product.product_like_count;
  }

  async getLikedProducts(userId) {
    return Product.findAll({ where: { product_liked_by: userId, product_status: 'true' } });
  }

  // Filtrage couleur et tissu
  async getProductByColor(color) {
    return Product.findAll({ where: { product_color: color, product_status: 'true' } });
  }

  async getSimilarProductsByColor(color, productId) {
    return Product.findAll({
      where: {
        product_color: color,
        product_status: 'true',
        product_id: { [Op.ne]: productId }
      }
    });
  }

  async getSimilarProductsByPrice(price1, price2, productId, category) {
    return Product.findAll({
      where: {
        product_price: { [Op.between]: [price1, price2] },
        product_status: 'true',
        product_id: { [Op.ne]: productId },
        product_category: category
      }
    });
  }

  async filterByFabricAndSize(fabric = null, size = null, productId = null) {
    const where = { product_status: 'true' };
    if (fabric) where.product_fabric = fabric;
    if (size) where.product_size = size;
    if (productId) where.product_id = productId;
    return Product.findAll({ where });
  }
}

module.exports = new ProductService();
