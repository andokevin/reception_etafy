const PromotionService = require('../services/PromotionService');

class PromotionController {

  async create(req, res) {
    try {
      const promotionId = await PromotionService.createPromotion(req.body);
      res.status(201).json({ success: true, promotionId });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await PromotionService.updatePromotion(req.params.id, req.body);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await PromotionService.deletePromotion(req.params.id);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async get(req, res) {
    try {
      const promotion = await PromotionService.getPromotion(req.params.id);
      res.json({ success: true, promotion });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async list(req, res) {
    try {
      const promotions = await PromotionService.listPromotions();
      res.json({ success: true, promotions });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getBySeller(req, res) {
    try {
      const promotions = await PromotionService.getPromotionsBySeller(req.params.sellerId);
      res.json({ success: true, promotions });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getByProduct(req, res) {
    try {
      const promotions = await PromotionService.getPromotionsByProduct(req.params.productId);
      res.json({ success: true, promotions });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getActive(req, res) {
    try {
      const promotions = await PromotionService.getActivePromotions();
      res.json({ success: true, promotions });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PromotionController();
