const UserBrand = require('../models/userBrand');

class UserBrandService {

  // Créer une association utilisateur-marque
  static async createUserBrand(data) {
    if (!data.user_id || !data.brand_id) throw new Error('user_id et brand_id requis.');
    const userBrand = await UserBrand.create(data);
    return userBrand;
  }

  // Récupérer toutes les marques d'un utilisateur
  static async getUserBrands(userId) {
    if (!userId || userId <= 0) throw new Error('userId invalide.');
    const brands = await UserBrand.findAll({ where: { user_id: userId } });
    if (!brands.length) throw new Error('Aucune marque trouvée pour cet utilisateur.');
    return brands;
  }

  // Supprimer une association utilisateur-marque
  static async deleteUserBrand(userId, brandId) {
    if (!userId || !brandId) throw new Error('userId et brandId requis.');
    await UserBrand.destroy({ where: { user_id: userId, brand_id: brandId } });
    return true;
  }

  // Lister toutes les associations
  static async listUserBrands() {
    const userBrands = await UserBrand.findAll();
    if (!userBrands.length) throw new Error('Aucune association trouvée.');
    return userBrands;
  }

  // Récupérer une association par ses IDs
  static async getUserBrandById(userId, brandId) {
    const userBrand = await UserBrand.findOne({ where: { user_id: userId, brand_id: brandId } });
    if (!userBrand) throw new Error('Association non trouvée.');
    return userBrand;
  }

  // Mettre à jour une association (rarement utilisé)
  static async updateUserBrand(userId, brandId, data) {
    if (!data || Object.keys(data).length === 0) throw new Error('Données vides.');
    const updated = await UserBrand.update(data, { where: { user_id: userId, brand_id: brandId } });
    return updated[0] > 0;
  }

}

module.exports = UserBrandService;
