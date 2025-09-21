const DiscountService = require('../services/DiscountService');

class DiscountController {
  static async createDiscount(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const id = await DiscountService.createDiscount(req.body);
      res.json({ status: 'success', discount_id: id });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async getDiscountById(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const discount = await DiscountService.getDiscountById(req.params.id);
      res.json({ status: 'success', discount });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async updateDiscount(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const discount = await DiscountService.updateDiscount(req.params.id, req.body);
      res.json({ status: 'success', discount });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async deleteDiscount(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      await DiscountService.deleteDiscount(req.params.id);
      res.json({ status: 'success', message: 'Réduction supprimée avec succès' });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async listDiscounts(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const discounts = await DiscountService.listDiscounts();
      res.json({ status: 'success', discounts });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async getDiscountByCode(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const discount = await DiscountService.getDiscountByCode(req.params.code);
      res.json({ status: 'success', discount });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async applyDiscount(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const newPrice = await DiscountService.applyDiscount(req.body.discount_code, parseFloat(req.body.product_price));
      res.json({ status: 'success', new_price: newPrice });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async getActiveDiscounts(req, res) {
    try {
      if (!req.xhr) throw new Error('Requête AJAX requise');
      const discounts = await DiscountService.getActiveDiscounts();
      res.json({ status: 'success', discounts });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }
}

module.exports = DiscountController;
