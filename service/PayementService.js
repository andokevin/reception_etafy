const Payment = require('../models/Payment');

class PaymentService {

  static async createPayment(data) {
    try {
      const payment = await Payment.create(data);
      return payment;
    } catch (error) {
      throw new Error('Erreur création paiement: ' + error.message);
    }
  }

  static async getPayment(paymentId) {
    try {
      const payment = await Payment.findByPk(paymentId);
      if (!payment) throw new Error('Paiement introuvable');
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getPaymentByOrder(orderId) {
    try {
      const payment = await Payment.findOne({ where: { payment_order: orderId } });
      if (!payment) return null;
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateStatus(paymentId, status) {
    try {
      const [updated] = await Payment.update(
        { payment_status: status },
        { where: { payment_id: paymentId } }
      );
      if (!updated) throw new Error('Paiement introuvable ou non modifié');
      return await Payment.findByPk(paymentId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deletePayment(paymentId) {
    try {
      const deleted = await Payment.destroy({ where: { payment_id: paymentId } });
      if (!deleted) throw new Error('Paiement introuvable');
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = PaymentService;
