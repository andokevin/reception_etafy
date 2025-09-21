const Color = require('../model/color');

class ColorService {
  static async createColor(data) {
    if (!data.color_name || data.color_name.length < 1) {
      throw new Error('Le nom de la couleur est requis.');
    }

    const color = await Color.create({
      color_name: data.color_name,
      color_code: data.color_code || null
    });

    return color.color_id;
  }

  static async getColorById(id) {
    if (!id || id <= 0) throw new Error('L\'ID de la couleur doit être supérieur à zéro.');
    const color = await Color.findByPk(id);
    if (!color) throw new Error('Couleur non trouvée.');
    return color;
  }

  static async updateColor(id, data) {
    const color = await ColorService.getColorById(id);
    await color.update({
      color_name: data.color_name || color.color_name,
      color_code: data.color_code || color.color_code
    });
    return color;
  }

  static async deleteColor(id) {
    const deleted = await Color.destroy({ where: { color_id: id } });
    if (!deleted) throw new Error('Couleur non trouvée ou déjà supprimée.');
    return true;
  }

  static async listColors() {
    const colors = await Color.findAll();
    if (!colors || colors.length === 0) throw new Error('Aucune couleur trouvée.');
    return colors;
  }

  static async getColorByName(name) {
    if (!name) throw new Error('Le nom de la couleur est requis.');
    const color = await Color.findOne({ where: { color_name: name } });
    return color || null;
  }
}

module.exports = ColorService;
