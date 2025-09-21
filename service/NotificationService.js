const Notification = require('../models/Notification');

class NotificationService {
    /**
     * Crée une notification
     */
    static async createNotification(data) {
        try {
            const notification = await Notification.create({
                notification_user: data.notification_user,
                notification_title: data.notification_title,
                notification_message: data.notification_message,
                notification_type: data.notification_type,
                notification_entity_type: data.notification_entity_type,
                notification_entity_id: data.notification_entity_id,
                notification_is_read: data.notification_is_read ?? false
            });
            return notification;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Récupère les notifications d'un utilisateur avec pagination
     */
    static async listNotifications(userId, limit = 10, offset = 0) {
        try {
            const notifications = await Notification.findAll({
                where: { notification_user: userId },
                order: [['notification_id', 'DESC']],
                limit,
                offset
            });
            const unreadCount = await Notification.count({
                where: { notification_user: userId, notification_is_read: false }
            });
            return { notifications, unreadCount };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Marque une notification comme lue
     */
    static async markAsRead(notificationId) {
        const notification = await Notification.findByPk(notificationId);
        if (!notification) throw new Error('Notification non trouvée');

        notification.notification_is_read = true;
        await notification.save();
        return notification;
    }

    /**
     * Marque toutes les notifications d'un utilisateur comme lues
     */
    static async markAllAsRead(userId) {
        return await Notification.update(
            { notification_is_read: true },
            { where: { notification_user: userId, notification_is_read: false } }
        );
    }

    /**
     * Supprime une notification
     */
    static async deleteNotification(notificationId) {
        const deleted = await Notification.destroy({
            where: { notification_id: notificationId }
        });
        if (!deleted) throw new Error('Notification non trouvée');
        return true;
    }

    /**
     * Compte les notifications non lues
     */
    static async countUnread(userId) {
        return await Notification.count({
            where: { notification_user: userId, notification_is_read: false }
        });
    }

    /**
     * Nettoie les notifications anciennes
     */
    static async cleanOldNotifications(days = 30) {
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - days);

        return await Notification.destroy({
            where: {
                notification_created_at: { $lt: dateLimit }
            }
        });
    }
}

module.exports = NotificationService;
