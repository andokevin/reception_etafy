const SellerService = require('../services/SellerService');
const sendEmail = require('../utils/sendEmail'); // fonction utilitaire pour l'envoi d'email

class SellerController {

  async create(req, res) {
    try {
      const sellerId = await SellerService.createSeller(req.body);
      const seller = await SellerService.getSeller(sellerId);
      res.status(201).json({ status: 'success', data: seller });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async list(req, res) {
    try {
      const sellers = await SellerService.listSeller();
      res.json({ status: 'success', data: sellers });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async get(req, res) {
    try {
      const seller = await SellerService.getSeller(req.params.id);
      res.json({ status: 'success', data: seller });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  async update(req, res) {
    try {
      await SellerService.updateSeller(req.params.id, req.body);
      const seller = await SellerService.getSeller(req.params.id);
      res.json({ status: 'success', data: seller });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await SellerService.deleteSeller(req.params.id);
      res.json({ status: 'success', message: 'Vendeur supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async verify(req, res) {
    try {
      const { identifier, password } = req.body;
      const seller = await SellerService.verifySeller(identifier, password);
      if (!seller) return res.status(401).json({ status: 'error', message: 'Identifiants incorrects' });
      res.json({ status: 'success', data: seller });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const otp = await SellerService.preparePasswordReset(email, oldPassword, newPassword);

      await sendEmail(email, 'Code de confirmation OTP', `Votre code OTP est : ${otp}. Il expire dans 10 minutes.`);

      res.json({ status: 'success', message: 'Code OTP envoyé à votre e-mail' });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async confirmPassword(req, res) {
    try {
      const { email, otp } = req.body;
      const success = await SellerService.applyPasswordChange(email, otp);
      if (!success) return res.status(401).json({ status: 'error', message: 'Code OTP invalide ou expiré' });
      res.json({ status: 'success', message: 'Mot de passe changé avec succès' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new SellerController();
