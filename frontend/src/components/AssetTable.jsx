import React, { useState } from 'react';

export default function AssetTable({ assets, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');

  const filtered = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.id.toLowerCase().includes(search.toLowerCase()) ||
                          a.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
                          a.location.toLowerCase().includes(search.toLowerCase()) ||
                          a.assignedTo.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter === 'todos' || a.type === typeFilter;
    const matchesStatus = statusFilter === 'todos' || a.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="content-section">
      <div className="controls-row">
        <div className="search-box">
          <i className="ri-search-line"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar por nombre, serie, responsable, ubicación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select 
            className="filter-select" 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="todos">Todos los Tipos</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>
          <select 
            className="filter-select" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos los Estados</option>
            <option value="Activo">Activos</option>
            <option value="Mantenimiento">En Mantenimiento</option>
            <option value="Alerta Expiración">Alerta Expiración</option>
            <option value="Inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table-premium">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Activo</th>
              <th>Tipo / Categoría</th>
              <th>Ubicación</th>
              <th>Responsable</th>
              <th>Estado</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(asset => {
              let badgeClass = 'badge-active';
              if (asset.status === 'Mantenimiento') badgeClass = 'badge-maintenance';
              else if (asset.status === 'Alerta Expiración') badgeClass = 'badge-alert';
              else if (asset.status === 'Inactivo') badgeClass = 'badge-inactive';

              return (
                <tr key={asset.id}>
                  <td><strong style={{ color: 'var(--accent-gold)' }}>{asset.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{asset.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>S/N: {asset.serialNumber}</div>
                  </td>
                  <td>
                    <div>{asset.type}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{asset.category}</div>
                  </td>
                  <td>{asset.location}</td>
                  <td>{asset.assignedTo}</td>
                  <td><span className={`badge ${badgeClass}`}>{asset.status}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.4rem 0.75rem', marginRight: '0.5rem' }} 
                      onClick={() => onEdit(asset)}
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.4rem 0.75rem', color: 'var(--status-alert)' }} 
                      onClick={() => onDelete(asset.id)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No se encontraron activos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
