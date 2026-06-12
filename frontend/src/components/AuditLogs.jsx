import React from 'react';

export default function AuditLogs({ logs }) {
  return (
    <div className="content-section">
      <div className="section-header">
        <h3>Bitácora de Auditoría Completa (Control de Operaciones)</h3>
      </div>
      <div className="audit-list" style={{ maxHeight: '600px' }}>
        {logs.map((log) => {
          const date = new Date(log.timestamp).toLocaleString();
          let logClass = '';
          if (log.action === 'Eliminación') logClass = 'eliminacion';
          else if (log.action === 'Mantenimiento') logClass = 'mantenimiento';

          return (
            <div className={`audit-item ${logClass}`} key={log.id}>
              <div className="audit-item-header">
                <span className="audit-item-title">{log.action}</span>
                <span>{date}</span>
              </div>
              <div>{log.details}</div>
            </div>
          );
        })}
        {logs.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
            No hay registros en la bitácora.
          </p>
        )}
      </div>
    </div>
  );
}
