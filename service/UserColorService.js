const UserColor = require('../models/userColor');

class UserColorService {

  // Créer une association utilisateur-couleur
  static async createUserColor(data) {
    if (!data.user_id || !data.color_id) throw new Error('user_id et color_id requis.');
    const userColor = await UserColor.create(data);
    return userColor;
  }

  // Récupérer toutes les couleurs d'un utilisateur
  static async getUserColors(userId) {
    if (!userId || userId <= 0) throw new Error('userId invalide.');
    const colors = await UserColor.findAll({ where: { user_id: userId } });
    if (!colors.length) throw new Error('Aucune couleur trouvée pour cet utilisateur.');
    return colors;
  }

  // Supprimer une association utilisateur-couleur
  static async deleteUserColor(userId, colorId) {
    if (!userId || !colorId) throw new Error('userId et colorId requis.');
    await UserColor.destroy({ where: { user_id: userId, color_id: colorId } });
    return true;
  }

  // Lister toutes les associations
  static async listUserColors() {
    const userColors = await UserColor.findAll();
    if (!userColors.length) throw new Error('Aucune association trouvée.');
    return userColors;
  }

  // Récupérer une association par IDs
  static async getUserColorById(userId, colorId) {
    const userColor = await UserColor.findOne({ where: { user_id: userId, color_id: colorId } });
    if (!userColor) throw new Error('Association non trouvée.');
    return userColor;
  }

  // Mettre à jour une association
  static async updateUserColor(userId, colorId, data) {
    if (!data || Object.keys(data).length === 0) throw new Error('Données vides.');
    const updated = await UserColor.update(data, { where: { user_id: userId, color_id: colorId } });
    return updated[0] > 0;
  }

}

module.exports = UserColorService;
