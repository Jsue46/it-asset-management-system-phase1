const db = require('../models/db');

class MaintenanceService {
  getAllMaintenance() {
    const data = db.readDB();
    return data.maintenance;
  }

  createMaintenance(maintenanceData) {
    const data = db.readDB();
    
    // Obtener información del activo
    const asset = data.assets.find(a => a.id === maintenanceData.assetId);
    
    const newMaintenance = {
      id: `MNT-${String(data.maintenance.length + 1).padStart(3, '0')}`,
      ...maintenanceData,
      assetName: asset ? asset.name : 'Activo Desconocido',
      date: maintenanceData.date || new Date().toISOString().split('T')[0]
    };

    data.maintenance.push(newMaintenance);

    // Cambiar estado del activo a Mantenimiento
    if (asset) {
      const assetIndex = data.assets.findIndex(a => a.id === asset.id);
      data.assets[assetIndex].status = "Mantenimiento";
    }

    // Registrar auditoría
    data.logs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "Mantenimiento",
      details: `Registro de mantenimiento ${newMaintenance.type} para el activo ${newMaintenance.assetId}. Estado del activo cambiado a Mantenimiento.`
    });

    db.writeDB(data);
    return newMaintenance;
  }
}

module.exports = new MaintenanceService();
