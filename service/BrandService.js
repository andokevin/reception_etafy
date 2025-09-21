const Brand = require('../model/Brand');
const { Op } = require('sequelize');

class BrandService {
  /**
   * Crée une nouvelle marque et retourne son ID.
   * @param {Object} data 
   * @returns {Promise<number>}
   */
  static async createBrand(data) {
    try {
      const brand = await Brand.create(data);
      return brand.brand_id;
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        if (err.errors.some(e => e.path === 'brand_name')) {
          throw new Error('Ce nom de marque est déjà utilisé.');
        }
      }
      throw new Error('Erreur lors de la création de la marque : ' + err.message);
    }
  }

  /**
   * Récupère une marque par son ID.
   * @param {number} id 
   * @returns {Promise<Object>}
   */
  static async getBrandById(id) {
    if (id <= 0) {
      throw new Error('L\'ID de la marque doit être supérieur à zéro.');
    }
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new Error('Marque non trouvée.');
    }
    return brand;
  }

  /**
   * Liste toutes les marques.
   * @returns {Promise<Array>}
   */
  static async listBrands() {
    const brands = await Brand.findAll();
    if (!brands || brands.length === 0) {
      throw new Error('Aucune marque trouvée.');
    }
    return brands;
  }

  /**
   * Met à jour une marque par son ID.
   * @param {number} id 
   * @param {Object} data 
   * @returns {Promise<boolean>}
   */
  static async updateBrand(id, data) {
    if (id <= 0) {
      throw new Error('L\'ID de la marque doit être supérieur à zéro.');
    }
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Les données de la marque ne peuvent pas être vides.');
    }

    const [updated] = await Brand.update(data, { where: { brand_id: id } });
    if (updated === 0) {
      throw new Error('Aucune mise à jour effectuée (marque introuvable ou données identiques).');
    }
    return true;
  }

  /**
   * Supprime une marque (soft delete si activé, sinon hard delete).
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  static async deleteBrand(id) {
    if (id <= 0) {
      throw new Error('L\'ID de la marque doit être supérieur à zéro.');
    }

    const deleted = await Brand.destroy({ where: { brand_id: id } });
    if (deleted === 0) {
      throw new Error('Aucune suppression effectuée (marque introuvable).');
    }
    return true;
  }
}

module.exports = BrandService;
