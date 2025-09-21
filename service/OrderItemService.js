const OrderItem = require('../models/OrderItem');

class OrderItemService {

  static async createItem(data) {
    try {
      const item = await OrderItem.create(data);
      return item;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateItem(orderId, productId, data) {
    try {
      const [updated] = await OrderItem.update(data, { where: { order_id: orderId, product_id: productId } });
      if (!updated) throw new Error('Article introuvable ou non modifié');
      return await OrderItem.findAll({ where: { order_id: orderId, product_id: productId } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getItemsByOrderId(orderId) {
    try {
      return await OrderItem.findAll({ where: { order_id: orderId } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteItemsByOrderId(orderId) {
    try {
      return await OrderItem.destroy({ where: { order_id: orderId } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = OrderItemService;
