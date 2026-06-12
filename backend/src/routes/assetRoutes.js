const express = require('express');
const assetController = require('../controllers/assetController');

const router = express.Router();

router.get('/', assetController.getAssets);
router.get('/:id', assetController.getAsset);
router.post('/', assetController.createAsset);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);

module.exports = router;
