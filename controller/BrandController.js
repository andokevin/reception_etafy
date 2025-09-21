const BrandService = require('../services/BrandService');
const { body, validationResult } = require('express-validator');

class BrandController {
  static validateBrand() {
    return [
      body('brand_name')
        .exists().withMessage('Le nom de la marque est requis.')
        .isLength({ min: 3, max: 100 }).withMessage('Le nom doit contenir entre 3 et 100 caractères.')
    ];
  }

  // Créer une nouvelle marque
  static async createBrand(req, res) {
    try {
      if (!req.xhr) {
        throw new Error('La requête doit être une requête AJAX.');
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ status: 'error', message: 'Validation failed', errors: errors.array() });
      }

      const brandId = await BrandService.createBrand(req.body);
      res.json({ status: 'success', brand_id: brandId });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  // Récupérer une marque par son ID
  static async getBrandById(req, res) {
    try {
      if (!req.xhr) {
        throw new Error('La requête doit être une requête AJAX.');
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id) || id <= 0) throw new Error("L'ID de la marque doit être supérieur à zéro.");

      const brand = await BrandService.getBrandById(id);
      res.json({ status: 'success', brand });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  // Lister toutes les marques
  static async listBrands(req, res) {
    try {
      if (!req.xhr) {
        throw new Error('La requête doit être une requête AJAX.');
      }

      const brands = await BrandService.listBrands();
      res.json({ status: 'success', brands });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  // Mettre à jour une marque
  static async updateBrand(req, res) {
    try {
      if (!req.xhr) {
        throw new Error('La requête doit être une requête AJAX.');
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id) || id <= 0) throw new Error("L'ID de la marque doit être supérieur à zéro.");

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ status: 'error', message: 'Validation failed', errors: errors.array() });
      }

      await BrandService.updateBrand(id, req.body);
      res.json({ status: 'success', message: 'Marque mise à jour avec succès.' });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }

  // Supprimer une marque
  static async deleteBrand(req, res) {
    try {
      if (!req.xhr) {
        throw new Error('La requête doit être une requête AJAX.');
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id) || id <= 0) throw new Error("L'ID de la marque doit être supérieur à zéro.");

      await BrandService.deleteBrand(id);
      res.json({ status: 'success', message: 'Marque supprimée avec succès.' });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  }
}

module.exports = BrandController;
