import React from 'react';

export default function MaintenanceLog({ maintenance }) {
  return (
    <div className="content-section">
      <div className="section-header">
        <h3>Registro Histórico de Servicios de Mantenimiento</h3>
      </div>
      <div className="table-responsive">
        <table className="table-premium">
          <thead>
            <tr>
              <th>ID Registro</th>
              <th>ID Activo</th>
              <th>Nombre de Activo</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción del Trabajo</th>
              <th>Técnico Responsable</th>
              <th style={{ textAlign: 'right' }}>Costo (USD)</th>
            </tr>
          </thead>
          <tbody>
            {maintenance.map(m => (
              <tr key={m.id}>
                <td><strong>{m.id}</strong></td>
                <td><span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>{m.assetId}</span></td>
                <td>{m.assetName}</td>
                <td>{m.date}</td>
                <td>
                  <span className={`badge ${m.type === 'Correctivo' ? 'badge-alert' : 'badge-maintenance'}`}>
                    {m.type}
                  </span>
                </td>
                <td 
                  style={{ maxWidth: '250px', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
                  title={m.description}
                >
                  {m.description}
                </td>
                <td>{m.technician}</td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>
                  ${m.cost.toFixed(2)}
                </td>
              </tr>
            ))}
            {maintenance.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No hay registros de mantenimiento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
