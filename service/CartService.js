const Cart = require('../model/Cart');
const CartItem = require('../model/CartItem');
const Product = require('../model/Product');
const { Op } = require('sequelize');

class CartService {
  /**
   * Crée un nouveau panier
   * @param {number|null} userId
   * @param {string|null} sessionId
   * @returns {Promise<number>}
   */
  static async createCart(userId = null, sessionId = null) {
    const data = {
      cart_buyer: userId,
      cart_session: sessionId,
      cart_status: true // true = actif
    };

    const cart = await Cart.create(data);
    return cart.cart_id;
  }

  /**
   * Récupère le panier actif d'un utilisateur ou d'une session
   */
  static async getActiveCart(userId = null, sessionId = null) {
    if (!userId && !sessionId) return null;

    const where = { cart_status: true };
    if (userId) where.cart_buyer = userId;
    else where.cart_session = sessionId;

    return await Cart.findOne({ where });
  }

  /**
   * Transfère un panier de session à un utilisateur
   */
  static async transferToUser(sessionId, userId) {
    const cart = await Cart.findOne({
      where: { cart_session: sessionId, cart_status: true }
    });
    if (!cart) return false;

    await cart.update({ cart_buyer: userId, cart_session: null });
    return true;
  }

  /**
   * Met à jour le statut d'un panier
   */
  static async updateCartStatus(cartId, status) {
    const allowedStatus = ['active', 'abandoned', 'completed'];
    if (!allowedStatus.includes(status)) {
      throw new Error('Statut de panier invalide');
    }

    const cart = await Cart.findByPk(cartId);
    if (!cart) throw new Error('Panier introuvable');

    await cart.update({ cart_status: status === 'active' });
    return true;
  }

  /**
   * Nettoie les paniers abandonnés
   */
  static async cleanAbandonedCarts(days = 30) {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    const abandonedCarts = await Cart.findAll({
      where: {
        cart_status: false, // panier abandonné
        updatedAt: { [Op.lt]: threshold }
      }
    });

    if (!abandonedCarts.length) return [];

    const deletedIds = abandonedCarts.map(c => c.cart_id);

    // Supprimer les items du panier
    await CartItem.destroy({ where: { cart_id: deletedIds } });
    await Cart.destroy({ where: { cart_id: deletedIds } });

    return deletedIds;
  }
}

module.exports = CartService;
