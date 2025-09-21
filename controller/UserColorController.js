const UserColorService = require('../services/userColorService');

class UserColorController {

  // Middleware pour vérifier AJAX
  static ajaxOnly(req, res) {
    return req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
  }

  // Créer une association
  static async create(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const userColor = await UserColorService.createUserColor(req.body);
      res.status(201).json({ status: 'success', data: userColor });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Lister toutes les associations
  static async list(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const userColors = await UserColorService.listUserColors();
      res.json({ status: 'success', data: userColors });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Récupérer les couleurs d'un utilisateur
  static async getUserColors(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const colors = await UserColorService.getUserColors(req.params.userId);
      res.json({ status: 'success', data: colors });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Supprimer une association
  static async delete(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      await UserColorService.deleteUserColor(req.params.userId, req.params.colorId);
      res.json({ status: 'success', message: 'Association supprimée.' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Mettre à jour une association
  static async update(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const success = await UserColorService.updateUserColor(req.params.userId, req.params.colorId, req.body);
      res.json({ status: 'success', message: success ? 'Association mise à jour.' : 'Aucune modification effectuée.' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

}

module.exports = UserColorController;
