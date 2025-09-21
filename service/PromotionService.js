const { Op } = require('sequelize');
const Promotion = require('../models/promotion');

class PromotionService {

  // Ajouter une promotion
  async createPromotion(data) {
    try {
      const promotion = await Promotion.create(data);
      return promotion.promotion_id;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout de la promotion: ' + error.message);
    }
  }

  // Modifier une promotion
  async updatePromotion(id, data) {
    try {
      const promotion = await Promotion.findByPk(id);
      if (!promotion) throw new Error('Promotion introuvable');

      await promotion.update(data);
      return true;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la promotion: ' + error.message);
    }
  }

  // Supprimer une promotion
  async deletePromotion(id) {
    try {
      const promotion = await Promotion.findByPk(id);
      if (!promotion) throw new Error('Promotion introuvable');

      await promotion.destroy();
      return true;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la promotion: ' + error.message);
    }
  }

  // Récupérer une promotion par ID
  async getPromotion(id) {
    if (id <= 0) throw new Error('ID de promotion invalide');

    const promotion = await Promotion.findByPk(id);
    if (!promotion) throw new Error('Promotion introuvable');

    return promotion;
  }

  // Récupérer toutes les promotions
  async listPromotions() {
    return Promotion.findAll();
  }

  // Récupérer toutes les promotions d’un vendeur
  async getPromotionsBySeller(sellerId) {
    if (sellerId <= 0) throw new Error('ID de vendeur invalide');

    const promotions = await Promotion.findAll({ where: { promotion_seller: sellerId } });
    if (!promotions.length) throw new Error('Aucune promotion trouvée pour ce vendeur');

    return promotions;
  }

  // Récupérer toutes les promotions d’un produit
  async getPromotionsByProduct(productId) {
    if (productId <= 0) throw new Error('ID de produit invalide');

    const promotions = await Promotion.findAll({ where: { promotion_product: productId } });
    if (!promotions.length) throw new Error('Aucune promotion trouvée pour ce produit');

    return promotions;
  }

  // Récupérer les promotions actives
  async getActivePromotions() {
    const now = new Date();
    return Promotion.findAll({
      where: {
        promotion_start: { [Op.lte]: now },
        promotion_end: { [Op.gte]: now },
      }
    });
  }
}

module.exports = new PromotionService();
