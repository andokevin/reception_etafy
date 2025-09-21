const FavoriteService = require('../services/FavoriteService');

class FavoriteController {
    async addFavorite(req, res) {
        try {
            const { buyerId, productId } = req.body;
            const result = await FavoriteService.addFavorite(buyerId, productId);

            if (!result) {
                return res.status(400).json({ status: 'error', message: 'Produit déjà en favoris' });
            }

            res.status(201).json({ status: 'success', favorite: result });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async removeFavorite(req, res) {
        try {
            const { buyerId, productId } = req.body;
            const success = await FavoriteService.removeFavorite(buyerId, productId);

            if (!success) {
                return res.status(404).json({ status: 'error', message: 'Favori non trouvé' });
            }

            res.json({ status: 'success', message: 'Favori supprimé avec succès' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async isFavorited(req, res) {
        try {
            const { buyerId, productId } = req.body;
            const favorited = await FavoriteService.isFavorited(buyerId, productId);
            res.json({ status: 'success', favorited });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getFavoritesByUser(req, res) {
        try {
            const { buyerId } = req.params;
            const favorites = await FavoriteService.getFavoritesByUser(buyerId);
            res.json({ status: 'success', favorites });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async clearFavorites(req, res) {
        try {
            const { buyerId } = req.body;
            const success = await FavoriteService.clearFavorites(buyerId);
            res.json({ status: 'success', cleared: success });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new FavoriteController();
