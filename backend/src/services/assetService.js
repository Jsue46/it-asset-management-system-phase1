const db = require('../models/db');

class AssetService {
  getAllAssets() {
    const data = db.readDB();
    return data.assets;
  }

  getAssetById(id) {
    const data = db.readDB();
    return data.assets.find(a => a.id === id);
  }

  createAsset(assetData) {
    const data = db.readDB();
    const newAsset = {
      id: `ASSET-${String(data.assets.length + 1).padStart(3, '0')}`,
      ...assetData,
      status: assetData.status || 'Activo'
    };
    
    data.assets.push(newAsset);
    
    // Log de auditoría
    data.logs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "Creación",
      details: `Activo registrado: ${newAsset.name} (${newAsset.id}) asignado a ${newAsset.assignedTo || 'Nadie'}.`
    });

    db.writeDB(data);
    return newAsset;
  }

  updateAsset(id, assetData) {
    const data = db.readDB();
    const assetIndex = data.assets.findIndex(a => a.id === id);

    if (assetIndex === -1) return null;

    const oldAsset = data.assets[assetIndex];
    const updatedAsset = { ...oldAsset, ...assetData, id }; // Preservar ID
    data.assets[assetIndex] = updatedAsset;

    // Detectar cambios significativos para auditoría
    let changes = [];
    if (oldAsset.status !== updatedAsset.status) {
      changes.push(`Estado de "${oldAsset.status}" a "${updatedAsset.status}"`);
    }
    if (oldAsset.assignedTo !== updatedAsset.assignedTo) {
      changes.push(`Responsable de "${oldAsset.assignedTo || 'Nadie'}" a "${updatedAsset.assignedTo || 'Nadie'}"`);
    }
    if (oldAsset.location !== updatedAsset.location) {
      changes.push(`Ubicación de "${oldAsset.location}" a "${updatedAsset.location}"`);
    }

    data.logs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "Actualización",
      details: `Activo ${id} modificado. Cambios: ${changes.join(', ') || 'Actualización general de atributos.'}`
    });

    db.writeDB(data);
    return updatedAsset;
  }

  deleteAsset(id) {
    const data = db.readDB();
    const assetIndex = data.assets.findIndex(a => a.id === id);

    if (assetIndex === -1) return null;

    const deletedAsset = data.assets.splice(assetIndex, 1)[0];

    data.logs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "Eliminación",
      details: `Activo dado de baja del inventario: ${deletedAsset.name} (${id}).`
    });

    db.writeDB(data);
    return deletedAsset;
  }
}

module.exports = new AssetService();
