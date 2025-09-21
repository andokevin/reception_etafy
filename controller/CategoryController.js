const CategoryService = require('../services/CategoryService');

class CategoryController {
  static async createCategory(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const categoryId = await CategoryService.createCategory(req.body);
      return res.json({ status: 'success', category_id: categoryId });
    } catch (err) {
      return res.json({ status: 'error', message: err.message });
    }
  }

  static async getCategoryById(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const category = await CategoryService.getCategoryById(parseInt(req.params.id, 10));
      return res.json({ status: 'success', category });
    } catch (err) {
      return res.json({ status: 'error', message: err.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const category = await CategoryService.updateCategory(parseInt(req.params.id, 10), req.body);
      return res.json({ status: 'success', message: 'Catégorie mise à jour avec succès.', category });
    } catch (err) {
      return res.json({ status: 'error', message: err.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      await CategoryService.deleteCategory(parseInt(req.params.id, 10));
      return res.json({ status: 'success', message: 'Catégorie supprimée avec succès.' });
    } catch (err) {
      return res.json({ status: 'error', message: err.message });
    }
  }

  static async listCategories(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const categories = await CategoryService.listCategories();
      return res.json({ status: 'success', categories });
    } catch (err) {
      return res.json({ status: 'error', message: err.message });
    }
  }

  static async getCategoryByName(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const category = await CategoryService.getCategoryByName(req.params.name);
      if (!category) return res.json({ status: 'error', message: 'Catégorie non trouvée.' });
      return res.json({ status: 'success', category });
    } catch (err) {
      return res.json({ status: 'error', message: err.message });
    }
  }
}

module.exports = CategoryController;
