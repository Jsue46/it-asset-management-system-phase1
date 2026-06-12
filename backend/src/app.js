const express = require('express');
const cors = require('cors');
const assetRoutes = require('./routes/assetRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Montar rutas de la API
app.use('/api/assets', assetRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/logs', logRoutes);

// Manejo global de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta de API no encontrada" });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error("Error capturado en middleware:", err);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

module.exports = app;
