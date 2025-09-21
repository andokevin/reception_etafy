const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/user');
const UserBrand = require('../models/userBrand');
const UserCategory = require('../models/userCategory');
const fs = require('fs');
const path = require('path');

class UserService {

  // Créer un utilisateur
  static async createUser(data) {
    try {
      // Hash du mot de passe
      if (data.user_password) {
        const salt = await bcrypt.genSalt(10);
        data.user_password = await bcrypt.hash(data.user_password, salt);
      }

      // Gestion image base64 pour user_profile
      if (data.user_profile) {
        const { fileName, buffer } = UserService.handleBase64Image(data.user_profile);
        const uploadPath = path.join(__dirname, '..', 'uploads', 'user_profiles');
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
        fs.writeFileSync(path.join(uploadPath, fileName), buffer);
        data.user_profile = fileName;
      }

      const user = await User.create(data);

      // Relations user_brand
      if (data.user_brand && Array.isArray(data.user_brand)) {
        for (const brandId of data.user_brand) {
          await UserBrand.create({ user_id: user.user_id, brand_id: brandId });
        }
      }

      // Relations user_category
      if (data.user_category && Array.isArray(data.user_category)) {
        for (const categoryId of data.user_category) {
          await UserCategory.create({ user_id: user.user_id, category_id: categoryId });
        }
      }

      return user;

    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        const field = err.errors[0].path;
        if (field === 'user_email') throw new Error('Cette adresse e-mail est déjà utilisée.');
        if (field === 'user_phone') throw new Error('Ce numéro de téléphone est déjà utilisé.');
      }
      throw err;
    }
  }

  // Lister tous les utilisateurs
  static async listUsers() {
    const users = await User.findAll();
    return users;
  }

  // Récupérer un utilisateur par ID
  static async getUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Utilisateur introuvable.');
    return user;
  }

  // Mettre à jour un utilisateur
  static async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Utilisateur introuvable.');

    // Hash mot de passe si présent
    if (data.user_password) {
      const salt = await bcrypt.genSalt(10);
      data.user_password = await bcrypt.hash(data.user_password, salt);
    }

    // Gestion image base64
    if (data.user_profile) {
      const { fileName, buffer } = UserService.handleBase64Image(data.user_profile);
      const uploadPath = path.join(__dirname, '..', 'uploads', 'user_profiles');
      if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
      fs.writeFileSync(path.join(uploadPath, fileName), buffer);
      data.user_profile = fileName;
    }

    await user.update(data);

    // Mettre à jour les relations
    if (data.user_brand && Array.isArray(data.user_brand)) {
      await UserBrand.destroy({ where: { user_id: id } });
      for (const brandId of data.user_brand) {
        await UserBrand.create({ user_id: id, brand_id: brandId });
      }
    }

    if (data.user_category && Array.isArray(data.user_category)) {
      await UserCategory.destroy({ where: { user_id: id } });
      for (const categoryId of data.user_category) {
        await UserCategory.create({ user_id: id, category_id: categoryId });
      }
    }

    return user;
  }

  // Supprimer un utilisateur (soft delete si le modèle le supporte)
  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Utilisateur introuvable.');
    await user.destroy();
    return true;
  }

  // Authentification
  static async userLogin(identifier, password) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { user_email: identifier },
          { user_phone: identifier }
        ]
      }
    });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.user_password);
    return match ? user : null;
  }

  // Reset mot de passe (OTP)
  static async resetPassword(email, oldPassword, newPassword) {
    const user = await User.findOne({ where: { user_email: email } });
    if (!user) throw new Error('Utilisateur introuvable.');

    const match = await bcrypt.compare(oldPassword, user.user_password);
    if (!match) throw new Error('Ancien mot de passe incorrect.');

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedNewPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

    await user.update({
      user_otp_reset: otp.toString(),
      user_expires_otp: new Date(Date.now() + 10 * 60 * 1000),
      temp_new_password: hashedNewPassword
    });

    return otp;
  }

  // Confirmer OTP
  static async confirmPassword(email, otp) {
    const user = await User.findOne({
      where: {
        user_email: email,
        user_otp_reset: otp,
        user_expires_otp: { [Op.gte]: new Date() }
      }
    });
    if (!user) return false;

    await user.update({
      user_password: user.temp_new_password,
      user_otp_reset: null,
      user_expires_otp: null,
      temp_new_password: null
    });

    return true;
  }

  static async getUserGenre(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Utilisateur introuvable.');
    return user.user_genre || 'inconnu';
  }

  // Utilitaire pour gérer les images base64
  static handleBase64Image(base64String) {
    let extension = 'png';
    if (/^data:image\/(\w+);base64,/.test(base64String)) {
      const match = base64String.match(/^data:image\/(\w+);base64,/);
      extension = match[1].toLowerCase();
      base64String = base64String.split(',')[1];
    }
    const buffer = Buffer.from(base64String, 'base64');
    const fileName = `profile_${Date.now()}.${extension}`;
    return { fileName, buffer };
  }

}

module.exports = UserService;
