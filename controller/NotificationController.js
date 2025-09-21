const NotificationService = require('../services/NotificationService');

class NotificationController {
    async createNotification(req, res) {
        try {
            const notification = await NotificationService.createNotification(req.body);
            res.status(201).json({ status: 'success', notification });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    async listNotifications(req, res) {
        try {
            const { userId } = req.params;
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;

            const data = await NotificationService.listNotifications(userId, limit, offset);
            res.json({ status: 'success', ...data });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const notification = await NotificationService.markAsRead(id);
            res.json({ status: 'success', notification });
        } catch (error) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }

    async markAllAsRead(req, res) {
        try {
            const { userId } = req.body;
            await NotificationService.markAllAsRead(userId);
            res.json({ status: 'success', message: 'Toutes les notifications marquées comme lues' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async deleteNotification(req, res) {
        try {
            const { id } = req.params;
            await NotificationService.deleteNotification(id);
            res.json({ status: 'success', message: 'Notification supprimée' });
        } catch (error) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }

    async unreadCount(req, res) {
        try {
            const { userId } = req.params;
            const count = await NotificationService.countUnread(userId);
            res.json({ status: 'success', unreadCount: count });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async cleanOldNotifications(req, res) {
        try {
            const days = parseInt(req.body.days) || 30;
            await NotificationService.cleanOldNotifications(days);
            res.json({ status: 'success', message: 'Nettoyage des anciennes notifications effectué' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new NotificationController();
