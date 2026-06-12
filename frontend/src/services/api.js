const BASE_URL = '/api';

export const api = {
  async getAssets() {
    const res = await fetch(`${BASE_URL}/assets`);
    if (!res.ok) throw new Error('Error al cargar activos');
    return res.json();
  },

  async createAsset(assetData) {
    const res = await fetch(`${BASE_URL}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assetData)
    });
    if (!res.ok) throw new Error('Error al registrar activo');
    return res.json();
  },

  async updateAsset(id, assetData) {
    const res = await fetch(`${BASE_URL}/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assetData)
    });
    if (!res.ok) throw new Error('Error al actualizar activo');
    return res.json();
  },

  async deleteAsset(id) {
    const res = await fetch(`${BASE_URL}/assets/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar activo');
    return res.json();
  },

  async getMaintenance() {
    const res = await fetch(`${BASE_URL}/maintenance`);
    if (!res.ok) throw new Error('Error al cargar mantenimientos');
    return res.json();
  },

  async createMaintenance(mntData) {
    const res = await fetch(`${BASE_URL}/maintenance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mntData)
    });
    if (!res.ok) throw new Error('Error al registrar mantenimiento');
    return res.json();
  },

  async getLogs() {
    const res = await fetch(`${BASE_URL}/logs`);
    if (!res.ok) throw new Error('Error al cargar bitácora');
    return res.json();
  }
};
