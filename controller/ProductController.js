const ProductService = require('../services/serviceProduct');

class ProductController {
  
  async createProduct(req, res) {
    try {
      const id = await ProductService.createProduct(req.body);
      res.status(201).json({ status: 'success', product_id: id, message: 'Produit créé avec succès.' });
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }

  async listProduct(req, res) {
    try {
      const products = await ProductService.listProduct();
      res.json({ status: 'success', count: products.length, data: products });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await ProductService.getProduct(req.params.id);
      res.json({ status: 'success', data: product });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updated = await ProductService.updateProduct(req.params.id, req.body);
      res.json({ status: 'success', message: 'Produit mis à jour avec succès.', data: updated });
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.json({ status: 'success', message: 'Produit supprimé avec succès.' });
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }

  async publishProduct(req, res) {
    try {
      await ProductService.publishProduct(req.params.id);
      res.json({ status: 'success', message: 'Produit publié avec succès.' });
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }

  async searchProduct(req, res) {
    try {
      const results = await ProductService.searchProduct(req.body);
      res.json({ status: 'success', count: results.length, data: results });
    } catch (err) {
      res.status(400).json({ status: 'error', message: err.message });
    }
  }
}

module.exports = new ProductController();
