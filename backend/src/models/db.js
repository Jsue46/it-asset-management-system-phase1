const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

function readDB() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Si por alguna razón no existe, inicializar vacío
      const empty = { assets: [], maintenance: [], logs: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(empty, null, 2), 'utf8');
      return empty;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al leer la base de datos JSON en backend:", error);
    return { assets: [], maintenance: [], logs: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error al escribir en la base de datos JSON en backend:", error);
    return false;
  }
}

module.exports = {
  readDB,
  writeDB
};
