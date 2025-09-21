// controllers/OrderController.js
const OrderService = require('../services/OrderService');

class OrderController {
  async createOrder(req, res) {
    try {
      const data = req.body;
      // Ici tu peux ajouter une validation plus stricte si besoin

      const order = await OrderService.createOrder(data);
      res.status(201).json({ status: 'success', message: 'Commande créée', data: order });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrder(id);
      res.json({ status: 'success', data: order });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  async listOrders(req, res) {
    try {
      const orders = await OrderService.listOrders();
      res.json({ status: 'success', data: orders });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.updateOrder(id, req.body);
      res.json({ status: 'success', message: 'Commande mise à jour', data: order });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      await OrderService.deleteOrder(id);
      res.json({ status: 'success', message: 'Commande supprimée avec succès' });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { order_status } = req.body;
      if (!order_status) throw new Error('Statut manquant');

      const order = await OrderService.updateOrderStatus(id, order_status);
      res.json({
        status: 'success',
        message: 'Statut mis à jour',
        data: order
      });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async getOrdersByBuyer(req, res) {
    try {
      const { buyerId } = req.params;
      const orders = await OrderService.getOrdersByBuyer(buyerId);
      res.json({ status: 'success', data: orders });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getOrdersBySeller(req, res) {
    try {
      const { sellerId } = req.params;
      const orders = await OrderService.getOrdersBySeller(sellerId);
      res.json({ status: 'success', data: orders });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getOrdersByStatus(req, res) {
    try {
      const { status } = req.params;
      const orders = await OrderService.getOrdersByStatus(status);
      res.json({ status: 'success', data: orders });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getOrdersByPaymentMethod(req, res) {
    try {
      const { method } = req.params;
      const orders = await OrderService.getOrdersByPaymentMethod(method);
      res.json({ status: 'success', data: orders });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getOrdersByPaymentStatus(req, res) {
    try {
      const { status } = req.params;
      const orders = await OrderService.getOrdersByPaymentStatus(status);
      res.json({ status: 'success', data: orders });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async checkOrderStatus(req, res) {
    try {
      const { id, status } = req.params;
      const isStatus = await OrderService.checkOrderStatus(id, status);
      res.json({ status: 'success', data: { isStatus } });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  async checkOrderPaymentStatus(req, res) {
    try {
      const { id, status } = req.params;
      const isPaymentStatus = await OrderService.checkOrderPaymentStatus(id, status);
      res.json({ status: 'success', data: { isPaymentStatus } });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new OrderController();
