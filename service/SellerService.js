const Seller = require('../models/seller');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

class SellerService {

  // Créer un nouveau vendeur
  async createSeller(data) {
    try {
      // Vérifier si email ou téléphone existent déjà
      const existing = await Seller.findOne({
        where: { [Op.or]: [{ seller_email: data.seller_email }, { seller_phone: data.seller_phone }] }
      });

      if (existing) {
        if (existing.seller_email === data.seller_email) throw new Error('Cette adresse e-mail est déjà utilisée.');
        if (existing.seller_phone === data.seller_phone) throw new Error('Ce numéro de téléphone est déjà utilisé.');
      }

      // Hashage du mot de passe
      if (data.seller_password) {
        data.seller_password = await bcrypt.hash(data.seller_password, 10);
      }

      const seller = await Seller.create(data);
      return seller.seller_id;

    } catch (error) {
      throw new Error('Erreur lors de la création du vendeur: ' + error.message);
    }
  }

  // Récupérer un vendeur
  async getSeller(id) {
    const seller = await Seller.findByPk(id);
    if (!seller) throw new Error('Vendeur introuvable.');
    return seller;
  }

  // Liste de tous les vendeurs
  async listSeller() {
    return Seller.findAll();
  }

  // Mettre à jour un vendeur
  async updateSeller(id, data) {
    const seller = await Seller.findByPk(id);
    if (!seller) throw new Error('Vendeur introuvable.');

    if (data.seller_password) {
      data.seller_password = await bcrypt.hash(data.seller_password, 10);
    }

    await seller.update(data);
    return true;
  }

  // Supprimer un vendeur (soft delete si tu veux gérer `deletedAt`)
  async deleteSeller(id) {
    const seller = await Seller.findByPk(id);
    if (!seller) throw new Error('Vendeur introuvable.');
    await seller.destroy();
    return true;
  }

  // Vérifier login seller
  async verifySeller(identifier, password) {
    const seller = await Seller.findOne({
      where: { [Op.or]: [{ seller_email: identifier }, { seller_phone: identifier }] }
    });

    if (!seller) return null;
    const valid = await bcrypt.compare(password, seller.seller_password);
    return valid ? seller : null;
  }

  // Préparer réinitialisation mot de passe
  async preparePasswordReset(email, oldPassword, newPassword) {
    const seller = await Seller.findOne({ where: { seller_email: email } });
    if (!seller) throw new Error('Utilisateur introuvable.');

    const valid = await bcrypt.compare(oldPassword, seller.seller_password);
    if (!valid) throw new Error('Ancien mot de passe incorrect.');

    const otp = Math.floor(100000 + Math.random() * 900000);

    await seller.update({
      seller_otp_reset: otp.toString(),
      seller_expires_otp: new Date(Date.now() + 10 * 60 * 1000),
      temp_new_password: await bcrypt.hash(newPassword, 10)
    });

    return otp;
  }

  // Confirmer changement de mot de passe
  async applyPasswordChange(email, otp) {
    const seller = await Seller.findOne({
      where: {
        seller_email: email,
        seller_otp_reset: otp,
        seller_expires_otp: { [Op.gte]: new Date() }
      }
    });

    if (!seller) return false;

    await seller.update({
      seller_password: seller.temp_new_password,
      seller_otp_reset: null,
      seller_expires_otp: null,
      temp_new_password: null
    });

    return true;
  }
}

module.exports = new SellerService();
