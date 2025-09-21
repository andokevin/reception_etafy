const Discount = require('../model/discount');
const { Op } = require('sequelize');

class DiscountService {
  static async createDiscount(data) {
    if (!data.discount_code || !data.discount_value || !data.discount_type) {
      throw new Error('Le code, la valeur et le type de réduction sont requis.');
    }

    const discount = await Discount.create({
      discount_seller: data.discount_seller,
      discount_code: data.discount_code,
      discount_type: data.discount_type,
      discount_value: data.discount_value,
      discount_order_total: data.discount_order_total || null,
      discount_limit: data.discount_limit || null,
      discount_expired_date: data.discount_expired_date || null,
      discount_status: data.discount_status || 1
    });

    return discount.discount_id;
  }

  static async getDiscountById(id) {
    if (!id || id <= 0) throw new Error('ID invalide.');
    const discount = await Discount.findByPk(id);
    if (!discount) throw new Error('Réduction non trouvée.');
    return discount;
  }

  static async updateDiscount(id, data) {
    const discount = await DiscountService.getDiscountById(id);
    await discount.update(data);
    return discount;
  }

  static async deleteDiscount(id) {
    const deleted = await Discount.destroy({ where: { discount_id: id } });
    if (!deleted) throw new Error('Réduction non trouvée ou déjà supprimée.');
    return true;
  }

  static async listDiscounts() {
    const discounts = await Discount.findAll();
    if (!discounts || discounts.length === 0) throw new Error('Aucune réduction trouvée.');
    return discounts;
  }

  static async getDiscountByCode(code) {
    if (!code) throw new Error('Le code de réduction est requis.');
    const discount = await Discount.findAll({ where: { discount_code: code } });
    return discount;
  }

  static async getActiveDiscounts() {
    const discounts = await Discount.findAll({
      where: {
        discount_status: 1,
        discount_expired_date: { [Op.gte]: new Date() }
      }
    });
    return discounts;
  }

  static async checkDiscountCodeValid(code) {
    const discount = await Discount.findOne({
      where: {
        discount_code: code,
        discount_status: 1,
        discount_expired_date: { [Op.gte]: new Date() }
      }
    });
    return !!discount;
  }

  static async applyDiscount(code, price) {
    const discount = await Discount.findOne({ where: { discount_code: code, discount_status: 1 } });
    if (!discount) return price;
    if (discount.discount_type === 'percentage') {
      return price - (price * discount.discount_value / 100);
    } else {
      return price - discount.discount_value;
    }
  }
}

module.exports = DiscountService;
