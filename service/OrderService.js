// services/OrderService.js
const { Op } = require('sequelize');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

class OrderService {
  // Crée une commande et ses items
  static async createOrder(data) {
    try {
      const order = await Order.create(data);

      // Création d'un OrderItem
      const quantity = data.order_item_quantity || 1;
      const price = data.order_amount / quantity;
      await OrderItem.create({
        order_id: order.order_id,
        product_id: data.order_product,
        order_item_quantity: quantity,
        order_item_price: price,
        order_item_total_price: data.order_amount
      });

      // Mettre à jour le stock du produit
      const product = await Product.findByPk(data.order_product);
      if (!product) throw new Error('Produit non trouvé');
      product.stock -= quantity;
      await product.save();

      return order;
    } catch (error) {
      throw new Error(`Erreur création commande : ${error.message}`);
    }
  }

  // Récupérer une commande
  static async getOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Commande introuvable');
    return order;
  }

  // Lister toutes les commandes
  static async listOrders() {
    return await Order.findAll({ order: [['order_created_at', 'DESC']] });
  }

  // Mettre à jour une commande
  static async updateOrder(id, data) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Commande introuvable');
    await order.update(data);

    // Mettre à jour l'OrderItem si nécessaire
    if (data.order_product || data.order_amount) {
      const item = await OrderItem.findOne({ where: { order_id: id } });
      if (item) {
        const quantity = data.order_item_quantity || item.order_item_quantity;
        const price = data.order_amount / quantity;
        await item.update({
          product_id: data.order_product || item.product_id,
          order_item_quantity: quantity,
          order_item_price: price,
          order_item_total_price: data.order_amount || item.order_item_total_price
        });

        // Mise à jour stock
        const product = await Product.findByPk(item.product_id);
        if (product) {
          product.stock -= quantity;
          await product.save();
        }
      }
    }

    return order;
  }

  // Supprimer une commande (soft delete)
  static async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Commande introuvable');

    // Restaurer le stock si commande annulée
    const items = await OrderItem.findAll({ where: { order_id: id } });
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (product) {
        product.stock += item.order_item_quantity;
        await product.save();
      }
    }

    // Supprimer les items et la commande
    await OrderItem.destroy({ where: { order_id: id } });
    await order.destroy(); // Soft delete si paranoid: true
    return true;
  }

  static async getOrdersByBuyer(buyerId) {
    return await Order.findAll({ where: { order_buyer: buyerId } });
  }

  static async getOrdersBySeller(sellerId) {
    return await Order.findAll({ where: { order_seller: sellerId } });
  }

  static async getOrdersByStatus(status) {
    return await Order.findAll({ where: { order_status: status } });
  }

  static async getOrdersByPaymentMethod(paymentMethod) {
    return await Order.findAll({ where: { order_payment_method: paymentMethod } });
  }

  static async getOrdersByPaymentStatus(paymentStatus) {
    return await Order.findAll({ where: { order_payment_status: paymentStatus } });
  }

  // Vérifier le statut de la commande
  static async checkOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Commande introuvable');
    return order.order_status === status;
  }

  // Vérifier le statut du paiement
  static async checkOrderPaymentStatus(id, paymentStatus) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Commande introuvable');
    return order.order_payment_status === paymentStatus;
  }

  // Mettre à jour uniquement le statut de la commande
  static async updateOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Commande introuvable');

    // Si annulation, restaurer le stock
    if (status === 'canceled' && order.order_status !== 'canceled') {
      const items = await OrderItem.findAll({ where: { order_id: id } });
      for (const item of items) {
        const product = await Product.findByPk(item.product_id);
        if (product) {
          product.stock += item.order_item_quantity;
          await product.save();
        }
      }
    }

    order.order_status = status;
    await order.save();
    return order;
  }
}

module.exports = OrderService;
