const CartItem = require('../model/CartItem');
const Product = require('../model/Product');
const { Op } = require('sequelize');

class CartItemService {
  /**
   * Ajoute ou met à jour un item dans le panier
   */
  static async upsertItem(data) {
    let item = await CartItem.findOne({
      where: { ci_cart: data.cart_id, ci_product: data.product_id }
    });

    if (item) {
      const newQuantity = item.ci_quantity + (data.quantity || 1);
      await item.update({ ci_quantity: newQuantity, ci_price: data.price || item.ci_price });
      return item;
    } else {
      item = await CartItem.create({
        ci_cart: data.cart_id,
        ci_product: data.product_id,
        ci_quantity: data.quantity || 1,
        ci_price: data.price
      });
      return item;
    }
  }

  /**
   * Récupère les items d'un panier avec détails produit
   */
  static async getCartItemsWithDetails(cartId) {
    return await CartItem.findAll({
      where: { ci_cart: cartId },
      include: { model: Product, as: 'product' } // Associer le modèle Product
    });
  }

  /**
   * Met à jour la quantité d'un item
   */
  static async updateQuantity(cartId, productId, quantity) {
    const item = await CartItem.findOne({ where: { ci_cart: cartId, ci_product: productId } });
    if (!item) throw new Error('Item introuvable');
    await item.update({ ci_quantity: quantity });
    return true;
  }

  /**
   * Supprime un item du panier
   */
  static async deleteItem(cartId, productId) {
    const deleted = await CartItem.destroy({ where: { ci_cart: cartId, ci_product: productId } });
    if (!deleted) throw new Error('Erreur suppression item');
    return true;
  }

  /**
   * Vide complètement un panier
   */
  static async clearCart(cartId) {
    await CartItem.destroy({ where: { ci_cart: cartId } });
    return true;
  }

  /**
   * Calcule le total d'un panier
   */
  static async getCartTotal(cartId) {
    const items = await CartItem.findAll({ where: { ci_cart: cartId } });
    return items.reduce((total, item) => total + item.ci_quantity * item.ci_price, 0);
  }

  /**
   * Vérifie si un produit existe déjà dans le panier
   */
  static async itemExists(cartId, productId) {
    const count = await CartItem.count({ where: { ci_cart: cartId, ci_product: productId } });
    return count > 0;
  }
}

module.exports = CartItemService;
