const PaymentService = require('../services/PaymentService');

class PaymentController {

  async createPayment(req, res) {
    try {
      const payment = await PaymentService.createPayment(req.body);
      res.status(201).json({ status: 'success', data: payment });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async getPayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await PaymentService.getPayment(id);
      res.json({ status: 'success', data: payment });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  async getPaymentByOrder(req, res) {
    try {
      const { orderId } = req.params;
      const payment = await PaymentService.getPaymentByOrder(orderId);
      if (!payment) return res.status(404).json({ status: 'error', message: 'Paiement introuvable' });
      res.json({ status: 'success', data: payment });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const payment = await PaymentService.updateStatus(id, status);
      res.json({ status: 'success', data: payment });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async deletePayment(req, res) {
    try {
      const { id } = req.params;
      await PaymentService.deletePayment(id);
      res.json({ status: 'success', message: 'Paiement supprimé avec succès' });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new PaymentController();
