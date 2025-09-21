const UserCategory = require('../models/userCategory');

class UserCategoryService {

  // Créer une association utilisateur-catégorie
  static async createUserCategory(data) {
    if (!data.user_id || !data.category_id) throw new Error('user_id et category_id requis.');
    const userCategory = await UserCategory.create(data);
    return userCategory;
  }

  // Récupérer toutes les catégories d'un utilisateur
  static async getUserCategories(userId) {
    if (!userId || userId <= 0) throw new Error('userId invalide.');
    const categories = await UserCategory.findAll({ where: { user_id: userId } });
    if (!categories.length) throw new Error('Aucune catégorie trouvée pour cet utilisateur.');
    return categories;
  }

  // Supprimer une association utilisateur-catégorie
  static async deleteUserCategory(userId, categoryId) {
    if (!userId || !categoryId) throw new Error('userId et categoryId requis.');
    await UserCategory.destroy({ where: { user_id: userId, category_id: categoryId } });
    return true;
  }

  // Lister toutes les associations
  static async listUserCategories() {
    const userCategories = await UserCategory.findAll();
    if (!userCategories.length) throw new Error('Aucune association trouvée.');
    return userCategories;
  }

  // Récupérer une association par IDs
  static async getUserCategoryById(userId, categoryId) {
    const userCategory = await UserCategory.findOne({ where: { user_id: userId, category_id: categoryId } });
    if (!userCategory) throw new Error('Association non trouvée.');
    return userCategory;
  }

  // Mettre à jour une association
  static async updateUserCategory(userId, categoryId, data) {
    if (!data || Object.keys(data).length === 0) throw new Error('Données vides.');
    const updated = await UserCategory.update(data, { where: { user_id: userId, category_id: categoryId } });
    return updated[0] > 0;
  }

}

module.exports = UserCategoryService;
