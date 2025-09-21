const CartService = require('../services/CartService');
const CartItemService = require('../services/CartItemService'); 
const ProductService = require('../services/ProductService'); 

class CartController {
  // Récupère ou crée un panier actif
  static async getOrCreateCart(req, res) {
    try {
      if (!req.xhr) throw new Error('Accès non autorisé');

      const userId = req.session?.user?.user_id || null;
      let sessionId = req.session?.cart_session || null;

      if (!sessionId && !userId) {
        sessionId = require('crypto').randomBytes(16).toString('hex');
        req.session.cart_session = sessionId;
      }

      let cart = await CartService.getActiveCart(userId, sessionId);
      if (!cart) {
        const cartId = await CartService.createCart(userId, sessionId);
        cart = await CartService.getActiveCart(userId, sessionId);
      }

      res.json(cart);
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }

  // Transfère le panier à un utilisateur connecté
  static async transferToUser(req, res) {
    try {
      if (!req.xhr) throw new Error('Accès non autorisé');
      const userId = req.session?.user?.user_id;
      const sessionId = req.session?.cart_session;

      if (!userId) return res.status(401).json({ status: 'error', message: 'Utilisateur non connecté' });

      if (sessionId) {
        await CartService.transferToUser(sessionId, userId);
        delete req.session.cart_session;
      }

      res.json({ status: 'success', message: 'Panier transféré avec succès' });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }

  // Nettoie les paniers abandonnés
  static async cleanAbandonedCarts(req, res) {
    try {
      if (!req.xhr) throw new Error('Accès non autorisé');
      const days = parseInt(req.query.days) || 30;

      const deletedIds = await CartService.cleanAbandonedCarts(days);

      res.json({
        status: 'success',
        message: deletedIds.length ? `${deletedIds.length} paniers nettoyés` : 'Aucun panier abandonné à nettoyer',
        deleted_ids: deletedIds,
        days
      });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
}

module.exports = CartController;
