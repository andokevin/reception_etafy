const ColorService = require('../services/ColorService');

class ColorController {
  static async createColor(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const colorId = await ColorService.createColor(req.body);
      res.json({ status: 'success', color_id: colorId });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async getColorById(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const color = await ColorService.getColorById(parseInt(req.params.id, 10));
      res.json({ status: 'success', color });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async updateColor(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const color = await ColorService.updateColor(parseInt(req.params.id, 10), req.body);
      res.json({ status: 'success', message: 'Couleur mise à jour avec succès.', color });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async deleteColor(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      await ColorService.deleteColor(parseInt(req.params.id, 10));
      res.json({ status: 'success', message: 'Couleur supprimée avec succès.' });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async listColors(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const colors = await ColorService.listColors();
      res.json({ status: 'success', colors });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  static async getColorByName(req, res) {
    try {
      if (!req.xhr) throw new Error('La requête doit être une requête AJAX.');
      const color = await ColorService.getColorByName(req.params.name);
      if (!color) return res.json({ status: 'error', message: 'Couleur non trouvée.' });
      res.json({ status: 'success', color });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }
}

module.exports = ColorController;
