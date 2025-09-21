const UserCategoryService = require('../services/userCategoryService');

class UserCategoryController {

  // Middleware pour vérifier AJAX
  static ajaxOnly(req, res) {
    return req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
  }

  // Créer une association
  static async create(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const userCategory = await UserCategoryService.createUserCategory(req.body);
      res.status(201).json({ status: 'success', data: userCategory });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Lister toutes les associations
  static async list(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const userCategories = await UserCategoryService.listUserCategories();
      res.json({ status: 'success', data: userCategories });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Récupérer les catégories d'un utilisateur
  static async getUserCategories(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const categories = await UserCategoryService.getUserCategories(req.params.userId);
      res.json({ status: 'success', data: categories });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Supprimer une association
  static async delete(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      await UserCategoryService.deleteUserCategory(req.params.userId, req.params.categoryId);
      res.json({ status: 'success', message: 'Association supprimée.' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Mettre à jour une association
  static async update(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const success = await UserCategoryService.updateUserCategory(req.params.userId, req.params.categoryId, req.body);
      res.json({ status: 'success', message: success ? 'Association mise à jour.' : 'Aucune modification effectuée.' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

}

module.exports = UserCategoryController;
