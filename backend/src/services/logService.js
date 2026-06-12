const db = require('../models/db');

class LogService {
  getAllLogs() {
    const data = db.readDB();
    return data.logs;
  }
}

module.exports = new LogService();
