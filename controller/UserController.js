const session = require('express-session');
const nodemailer = require('nodemailer');
const UserService = require('../services/userService');

class UserController {

  // Vérifier si la requête est AJAX
  static ajaxOnly(req) {
    return req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
  }

  // Lister utilisateurs
  static async listUsers(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const users = await UserService.listUsers();
      res.json({ status: 'success', data: users });
    } catch (e) {
      res.status(500).json({ status: 'error', message: e.message });
    }
  }

  // Récupérer utilisateur
  static async getUser(req, res, id) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const user = await UserService.getUser(id);
      res.json({ status: 'success', data: user });
    } catch (e) {
      res.status(404).json({ status: 'error', message: e.message });
    }
  }

  // Créer utilisateur
  static async createUser(req, res, data) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const user = await UserService.createUser(data);
      res.status(201).json({ status: 'success', data: user });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Mettre à jour utilisateur
  static async updateUser(req, res, id, data) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const user = await UserService.updateUser(id, data);
      res.json({ status: 'success', data: user });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Supprimer utilisateur
  static async deleteUser(req, res, id) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      await UserService.deleteUser(id);
      res.json({ status: 'success', message: 'Utilisateur supprimé' });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Login
  static async login(req, res, identifier, password) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const user = await UserService.userLogin(identifier, password);
      if (!user) return res.status(401).json({ status: 'error', message: 'Identifiants incorrects' });

      req.session.user = {
        user_id: user.user_id,
        user_name: user.user_name,
        user_prename: user.user_prename,
        user_email: user.user_email,
        user_phone: user.user_phone,
        isLoggedIn: true
      };

      res.json({ status: 'success', data: req.session.user });
    } catch (e) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  // Logout
  static logout(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    req.session.destroy();
    res.json({ status: 'success', message: 'Déconnexion réussie' });
  }

  // Vérifier session
  static isLoggedIn(req, res) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    const user = req.session.user;
    if (user && user.isLoggedIn) {
      res.json({ status: 'success', data: user });
    } else {
      res.status(401).json({ status: 'error', message: 'Utilisateur non connecté' });
    }
  }

  // Reset mot de passe (envoi OTP)
  static async resetPassword(req, res, email, oldPassword, newPassword) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const otp = await UserService.resetPassword(email, oldPassword, newPassword);

      // Envoi email
      const transporter = nodemailer.createTransport({ sendmail: true });
      await transporter.sendMail({
        from: 'no-reply@example.com',
        to: email,
        subject: 'Code OTP pour réinitialisation mot de passe',
        text: `Votre code OTP est : ${otp}\nIl expirera dans 10 minutes.`
      });

      res.json({ message: 'Code OTP envoyé à votre adresse e-mail.' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  // Confirmer OTP
  static async confirmPassword(req, res, email, otp) {
    if (!this.ajaxOnly(req)) return res.status(403).json({ status: 'error', message: 'Accès interdit' });
    try {
      const success = await UserService.confirmPassword(email, otp);
      if (!success) return res.status(401).json({ message: 'Code OTP invalide ou expiré' });

      res.json({ message: 'Mot de passe changé avec succès' });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

}

module.exports = UserController;
