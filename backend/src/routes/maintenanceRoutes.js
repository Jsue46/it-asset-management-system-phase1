const express = require('express');
const maintenanceController = require('../controllers/maintenanceController');

const router = express.Router();

router.get('/', maintenanceController.getMaintenance);
router.post('/', maintenanceController.createMaintenance);

module.exports = router;
