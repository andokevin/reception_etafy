const UserBrandService = require('../services/userBrandService');

class UserBrandController {

  // Middleware pour vérifier AJAX
  static ajaxOnly(req, res) {
    return req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
  }

  // Créer une association
  static async create(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const userBrand = await UserBrandService.createUserBrand(req.body);
      res.status(201).json({ status: 'success', data: userBrand });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Lister toutes les associations
  static async list(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const userBrands = await UserBrandService.listUserBrands();
      res.json({ status: 'success', data: userBrands });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Récupérer les marques d'un utilisateur
  static async getUserBrands(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const brands = await UserBrandService.getUserBrands(req.params.userId);
      res.json({ status: 'success', data: brands });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Supprimer une association
  static async delete(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      await UserBrandService.deleteUserBrand(req.params.userId, req.params.brandId);
      res.json({ status: 'success', message: 'Association supprimée.' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Mettre à jour une association
  static async update(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const success = await UserBrandService.updateUserBrand(req.params.userId, req.params.brandId, req.body);
      res.json({ status: 'success', message: success ? 'Association mise à jour.' : 'Aucune modification effectuée.' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

}

module.exports = UserBrandController;
