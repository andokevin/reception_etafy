const Fabric = require('../models/fabric');

class FabricService {
    // Créer un tissu
    async createFabric(data) {
        if (!data.fabric_name) {
            throw new Error('Le nom du tissu est requis.');
        }
        const fabric = await Fabric.create(data);
        return fabric;
    }

    // Récupérer un tissu par ID
    async getFabricById(id) {
        if (!id || id <= 0) throw new Error('ID invalide.');
        const fabric = await Fabric.findByPk(id);
        if (!fabric) throw new Error('Tissu non trouvé.');
        return fabric;
    }

    // Mettre à jour un tissu
    async updateFabric(id, data) {
        const fabric = await this.getFabricById(id);
        await fabric.update(data);
        return fabric;
    }

    // Supprimer un tissu
    async deleteFabric(id) {
        const fabric = await this.getFabricById(id);
        await fabric.destroy();
        return true;
    }

    // Lister tous les tissus
    async listFabrics() {
        const fabrics = await Fabric.findAll();
        return fabrics;
    }
}

module.exports = new FabricService();
