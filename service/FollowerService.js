const Follower = require('../models/Follower');

class FollowerService {
    /**
     * Suivre un vendeur
     */
    static async follow(buyerId, sellerId) {
        try {
            const exists = await Follower.findOne({
                where: { follower_buyer: buyerId, follower_seller: sellerId }
            });

            if (exists) {
                throw new Error('Vous suivez déjà ce vendeur.');
            }

            const follower = await Follower.create({
                follower_buyer: buyerId,
                follower_seller: sellerId
            });

            return follower;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Se désabonner d'un vendeur
     */
    static async unfollow(buyerId, sellerId) {
        try {
            const deleted = await Follower.destroy({
                where: { follower_buyer: buyerId, follower_seller: sellerId }
            });

            if (!deleted) {
                throw new Error('Vous ne suivez pas ce vendeur.');
            }

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Vérifie si un acheteur suit un vendeur
     */
    static async isFollowing(buyerId, sellerId) {
        const count = await Follower.count({
            where: { follower_buyer: buyerId, follower_seller: sellerId }
        });
        return count > 0;
    }

    /**
     * Liste des vendeurs suivis par un acheteur
     */
    static async getFollowedSellers(buyerId) {
        return await Follower.findAll({
            where: { follower_buyer: buyerId }
        });
    }

    /**
     * Liste des abonnés d’un vendeur
     */
    static async listFollowers(sellerId) {
        return await Follower.findAll({
            where: { follower_seller: sellerId }
        });
    }

    /**
     * Total des abonnés pour un vendeur
     */
    static async getTotalFollowersBySeller(sellerId) {
        return await Follower.count({
            where: { follower_seller: sellerId }
        });
    }
}

module.exports = FollowerService;
