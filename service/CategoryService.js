const Category = require('../model/category');

class CategoryService {
  /**
   * Crée une nouvelle catégorie
   * @param {Object} data
   * @returns {Promise<number>} id de la catégorie
   */
  static async createCategory(data) {
    if (!data.category_name || data.category_name.length < 3 || data.category_name.length > 100) {
      throw new Error('Le nom de la catégorie doit contenir entre 3 et 100 caractères.');
    }

    const category = await Category.create({ category_name: data.category_name });
    return category.category_id;
  }

  /**
   * Récupère une catégorie par son ID
   */
  static async getCategoryById(id) {
    if (!id || id <= 0) throw new Error('L\'ID de la catégorie doit être supérieur à zéro.');

    const category = await Category.findByPk(id);
    if (!category) throw new Error('Catégorie non trouvée.');

    return category;
  }

  /**
   * Met à jour une catégorie
   */
  static async updateCategory(id, data) {
    if (!id || id <= 0) throw new Error('L\'ID de la catégorie doit être supérieur à zéro.');

    const category = await Category.findByPk(id);
    if (!category) throw new Error('Catégorie non trouvée.');

    await category.update({ category_name: data.category_name });
    return category;
  }

  /**
   * Supprime une catégorie
   */
  static async deleteCategory(id) {
    if (!id || id <= 0) throw new Error('L\'ID de la catégorie doit être supérieur à zéro.');

    const deleted = await Category.destroy({ where: { category_id: id } });
    if (!deleted) throw new Error('Catégorie non trouvée ou déjà supprimée.');

    return true;
  }

  /**
   * Liste toutes les catégories
   */
  static async listCategories() {
    const categories = await Category.findAll();
    if (!categories || categories.length === 0) throw new Error('Aucune catégorie trouvée.');
    return categories;
  }

  /**
   * Récupère une catégorie par son nom
   */
  static async getCategoryByName(name) {
    if (!name) throw new Error('Le nom de la catégorie ne peut pas être vide.');
    const category = await Category.findOne({ where: { category_name: name } });
    return category || null;
  }
}

module.exports = CategoryService;
