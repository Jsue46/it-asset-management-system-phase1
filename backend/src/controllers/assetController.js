const assetService = require('../services/assetService');

class AssetController {
  getAssets(req, res) {
    try {
      const assets = assetService.getAllAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: "Error interno al obtener los activos" });
    }
  }

  getAsset(req, res) {
    try {
      const asset = assetService.getAssetById(req.params.id);
      if (!asset) return res.status(404).json({ error: "Activo no encontrado" });
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: "Error interno al obtener el activo" });
    }
  }

  createAsset(req, res) {
    try {
      const newAsset = assetService.createAsset(req.body);
      res.status(201).json(newAsset);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el activo" });
    }
  }

  updateAsset(req, res) {
    try {
      const updatedAsset = assetService.updateAsset(req.params.id, req.body);
      if (!updatedAsset) return res.status(404).json({ error: "Activo no encontrado para actualizar" });
      res.json(updatedAsset);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el activo" });
    }
  }

  deleteAsset(req, res) {
    try {
      const deletedAsset = assetService.deleteAsset(req.params.id);
      if (!deletedAsset) return res.status(404).json({ error: "Activo no encontrado para eliminar" });
      res.json({ message: "Activo eliminado de manera exitosa", asset: deletedAsset });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el activo" });
    }
  }
}

module.exports = new AssetController();
