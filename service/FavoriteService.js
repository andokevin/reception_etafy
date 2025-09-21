const Favorite = require('../models/Favorite');

class FavoriteService {
    /**
     * Ajoute un produit aux favoris d’un utilisateur
     */
    static async addFavorite(buyerId, productId) {
        try {
            const exists = await Favorite.findOne({
                where: { favorite_buyer: buyerId, favorite_product: productId }
            });

            if (exists) return false;

            const favorite = await Favorite.create({
                favorite_buyer: buyerId,
                favorite_product: productId
            });

            return favorite;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Supprime un produit des favoris d’un utilisateur
     */
    static async removeFavorite(buyerId, productId) {
        try {
            const deleted = await Favorite.destroy({
                where: { favorite_buyer: buyerId, favorite_product: productId }
            });
            return deleted > 0;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Vérifie si un produit est dans les favoris d’un utilisateur
     */
    static async isFavorited(buyerId, productId) {
        try {
            const count = await Favorite.count({
                where: { favorite_buyer: buyerId, favorite_product: productId }
            });
            return count > 0;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Récupère tous les produits favoris d’un utilisateur
     */
    static async getFavoritesByUser(buyerId) {
        try {
            return await Favorite.findAll({
                where: { favorite_buyer: buyerId }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Supprime tous les favoris d’un utilisateur
     */
    static async clearFavorites(buyerId) {
        try {
            const deleted = await Favorite.destroy({
                where: { favorite_buyer: buyerId }
            });
            return deleted > 0;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = FavoriteService;
