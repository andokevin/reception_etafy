const FollowerService = require('../services/FollowerService');

class FollowerController {
    async follow(req, res) {
        try {
            const { buyerId, sellerId } = req.body;
            const follower = await FollowerService.follow(buyerId, sellerId);
            res.status(201).json({ status: 'success', follower });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    async unfollow(req, res) {
        try {
            const { buyerId, sellerId } = req.body;
            await FollowerService.unfollow(buyerId, sellerId);
            res.json({ status: 'success', message: 'Désabonnement effectué avec succès' });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    async isFollowing(req, res) {
        try {
            const { buyerId, sellerId } = req.body;
            const following = await FollowerService.isFollowing(buyerId, sellerId);
            res.json({ status: 'success', following });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getFollowedSellers(req, res) {
        try {
            const { buyerId } = req.params;
            const sellers = await FollowerService.getFollowedSellers(buyerId);
            res.json({ status: 'success', data: sellers });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async listFollowers(req, res) {
        try {
            const { sellerId } = req.params;
            const followers = await FollowerService.listFollowers(sellerId);
            res.json({ status: 'success', data: followers });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getTotalFollowersBySeller(req, res) {
        try {
            const { sellerId } = req.params;
            const total = await FollowerService.getTotalFollowersBySeller(sellerId);
            res.json({ status: 'success', total });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new FollowerController();
