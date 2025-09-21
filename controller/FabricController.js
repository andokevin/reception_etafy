const FabricService = require('../services/FabricService');

class FabricController {
    async createFabric(req, res) {
        try {
            const fabric = await FabricService.createFabric(req.body);
            res.status(201).json({ status: 'success', fabric });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    async listFabrics(req, res) {
        try {
            const fabrics = await FabricService.listFabrics();
            res.json({ status: 'success', fabrics });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getFabricById(req, res) {
        try {
            const fabric = await FabricService.getFabricById(req.params.id);
            res.json({ status: 'success', fabric });
        } catch (error) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }

    async updateFabric(req, res) {
        try {
            const fabric = await FabricService.updateFabric(req.params.id, req.body);
            res.json({ status: 'success', fabric });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    async deleteFabric(req, res) {
        try {
            await FabricService.deleteFabric(req.params.id);
            res.json({ status: 'success', message: 'Tissu supprimé avec succès' });
        } catch (error) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new FabricController();
