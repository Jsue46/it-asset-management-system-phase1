const logService = require('../services/logService');

class LogController {
  getLogs(req, res) {
    try {
      const logs = logService.getAllLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Error interno al obtener los logs" });
    }
  }
}

module.exports = new LogController();
