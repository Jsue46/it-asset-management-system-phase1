import React from 'react';

export default function Dashboard({ assets, logs }) {
  const total = assets.length;
  const active = assets.filter(a => a.status === 'Activo').length;
  const maintenance = assets.filter(a => a.status === 'Mantenimiento').length;
  const alerts = assets.filter(a => a.status === 'Alerta Expiración').length;

  const categories = {
    Servidores: assets.filter(a => a.category === 'Servidores').length,
    Computadoras: assets.filter(a => a.category === 'Computadoras').length,
    Proyectores: assets.filter(a => a.category === 'Proyectores').length,
    Redes: assets.filter(a => a.category === 'Redes').length,
    Licencias: assets.filter(a => a.category === 'Licencias').length
  };

  const max = Math.max(...Object.values(categories), 1);

  return (
    <div>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <h3>Activos Totales</h3>
            <div className="metric-value">{total}</div>
          </div>
          <div className="metric-icon icon-blue">
            <i className="ri-computer-line"></i>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h3>En Operación</h3>
            <div className="metric-value">{active}</div>
          </div>
          <div className="metric-icon icon-green">
            <i className="ri-checkbox-circle-line"></i>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h3>En Mantenimiento</h3>
            <div className="metric-value">{maintenance}</div>
          </div>
          <div className="metric-icon icon-yellow">
            <i className="ri-tools-line"></i>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h3>Alertas Licencias</h3>
            <div className="metric-value">{alerts}</div>
          </div>
          <div className="metric-icon icon-red">
            <i className="ri-error-warning-line"></i>
          </div>
        </div>
      </div>

      <div className="split-layout">
        <div className="content-section">
          <div className="section-header">
            <h3>Distribución de Activos por Categoría</h3>
          </div>
          <div className="chart-container">
            {Object.keys(categories).map(cat => {
              const count = categories[cat];
              const pct = (count / max) * 100;
              return (
                <div className="chart-bar-wrapper" key={cat}>
                  <div 
                    className="chart-bar" 
                    style={{ height: `${Math.max(pct, 5)}%` }}
                  >
                    <div className="chart-bar-value">{count}</div>
                  </div>
                  <div className="chart-bar-label">{cat}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h3>Actividad Reciente</h3>
          </div>
          <div className="audit-list">
            {logs.slice(0, 4).map((log) => {
              const time = new Date(log.timestamp).toLocaleTimeString();
              let logClass = '';
              if (log.action === 'Eliminación') logClass = 'eliminacion';
              else if (log.action === 'Mantenimiento') logClass = 'mantenimiento';

              return (
                <div className={`audit-item ${logClass}`} key={log.id}>
                  <div className="audit-item-header">
                    <span className="audit-item-title">{log.action}</span>
                    <span>{time}</span>
                  </div>
                  <div>{log.details}</div>
                </div>
              );
            })}
            {logs.length === 0 && (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                Sin actividad reciente.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
