const maintenanceService = require('../services/maintenanceService');

class MaintenanceController {
  getMaintenance(req, res) {
    try {
      const records = maintenanceService.getAllMaintenance();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: "Error interno al obtener mantenimientos" });
    }
  }

  createMaintenance(req, res) {
    try {
      const newRecord = maintenanceService.createMaintenance(req.body);
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ error: "Error al registrar el mantenimiento" });
    }
  }
}

module.exports = new MaintenanceController();
