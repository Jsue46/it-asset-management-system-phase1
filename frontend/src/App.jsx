import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import Dashboard from './components/Dashboard';
import AssetTable from './components/AssetTable';
import MaintenanceLog from './components/MaintenanceLog';
import AuditLogs from './components/AuditLogs';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de los Modales
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);

  // Formularios
  const [editingAsset, setEditingAsset] = useState(null);
  const [assetForm, setAssetForm] = useState({
    name: '',
    type: 'Hardware',
    category: 'Servidores',
    serialNumber: '',
    status: 'Activo',
    location: '',
    assignedTo: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    price: '',
    description: ''
  });

  const [maintenanceForm, setMaintenanceForm] = useState({
    assetId: '',
    type: 'Preventivo',
    date: new Date().toISOString().split('T')[0],
    technician: '',
    cost: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assetsData, mntData, logsData] = await Promise.all([
        api.getAssets(),
        api.getMaintenance(),
        api.getLogs()
      ]);
      setAssets(assetsData);
      setMaintenance(mntData);
      setLogs(logsData);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAssetModal = (asset = null) => {
    if (asset) {
      setEditingAsset(asset.id);
      setAssetForm({ ...asset });
    } else {
      setEditingAsset(null);
      setAssetForm({
        name: '',
        type: 'Hardware',
        category: 'Servidores',
        serialNumber: '',
        status: 'Activo',
        location: '',
        assignedTo: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        price: '',
        description: ''
      });
    }
    setAssetModalOpen(true);
  };

  const handleCloseAssetModal = () => {
    setAssetModalOpen(false);
    setEditingAsset(null);
  };

  const handleOpenMaintenanceModal = () => {
    setMaintenanceForm({
      assetId: assets[0]?.id || '',
      type: 'Preventivo',
      date: new Date().toISOString().split('T')[0],
      technician: '',
      cost: '',
      description: ''
    });
    setMaintenanceModalOpen(true);
  };

  const handleCloseMaintenanceModal = () => {
    setMaintenanceModalOpen(false);
  };

  const handleAssetTypeChange = (e) => {
    const type = e.target.value;
    const defaultCategory = type === 'Hardware' ? 'Servidores' : 'Licencias';
    setAssetForm(prev => ({ ...prev, type, category: defaultCategory }));
  };

  const handleSaveAsset = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...assetForm,
        price: parseFloat(assetForm.price)
      };

      if (editingAsset) {
        await api.updateAsset(editingAsset, data);
      } else {
        await api.createAsset(data);
      }
      handleCloseAssetModal();
      await loadData();
    } catch (err) {
      alert("Error al guardar activo");
    }
  };

  const handleDeleteAsset = async (id) => {
    if (!confirm(`¿Está seguro de eliminar el activo ${id}? Esta acción quedará registrada en la auditoría.`)) {
      return;
    }
    try {
      await api.deleteAsset(id);
      await loadData();
    } catch (err) {
      alert("Error al eliminar activo");
    }
  };

  const handleSaveMaintenance = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...maintenanceForm,
        cost: parseFloat(maintenanceForm.cost)
      };
      await api.createMaintenance(data);
      handleCloseMaintenanceModal();
      await loadData();
    } catch (err) {
      alert("Error al registrar mantenimiento");
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="logo-container">
            <div className="logo-badge">TS2</div>
            <div className="logo-text">
              <h1>ITAM USAC</h1>
              <span>Fase 1 - Predictivo</span>
            </div>
          </div>
          <nav>
            <ul className="nav-menu">
              <a 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <i className="ri-dashboard-3-line"></i>
                <span>Dashboard</span>
              </a>
              <a 
                className={`nav-item ${activeTab === 'assets' ? 'active' : ''}`}
                onClick={() => setActiveTab('assets')}
              >
                <i className="ri-computer-line"></i>
                <span>Inventario Activos</span>
              </a>
              <a 
                className={`nav-item ${activeTab === 'maintenance' ? 'active' : ''}`}
                onClick={() => setActiveTab('maintenance')}
              >
                <i className="ri-tools-line"></i>
                <span>Mantenimiento</span>
              </a>
              <a 
                className={`nav-item ${activeTab === 'audit' ? 'active' : ''}`}
                onClick={() => setActiveTab('audit')}
              >
                <i className="ri-history-line"></i>
                <span>Bitácora Auditoría</span>
              </a>
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer">
          <p>Teoría de Sistemas 2</p>
          <p style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>Vacaciones Junio 2026</p>
          <p style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>Grupo 7 - FIUSAC</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h2>
              {activeTab === 'dashboard' && 'Dashboard del Sistema ITAM'}
              {activeTab === 'assets' && 'Inventario General de Activos'}
              {activeTab === 'maintenance' && 'Gestión de Mantenimientos'}
              {activeTab === 'audit' && 'Bitácora de Auditoría'}
            </h2>
            <p>
              {activeTab === 'dashboard' && 'Monitoreo general del equipamiento tecnológico de laboratorios y licencias.'}
              {activeTab === 'assets' && 'Consulta, agrega, edita y da de baja hardware y software de la Escuela.'}
              {activeTab === 'maintenance' && 'Control del historial de reparaciones preventivas y correctivas.'}
              {activeTab === 'audit' && 'Historial inalterable de transacciones y operaciones en el sistema.'}
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-accent" onClick={handleOpenMaintenanceModal}>
              <i className="ri-tools-fill"></i> Registrar Mantenimiento
            </button>
            <button className="btn btn-primary" onClick={() => handleOpenAssetModal()}>
              <i className="ri-add-circle-fill"></i> Registrar Activo
            </button>
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
            <p>Cargando información del sistema ITAM...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard assets={assets} logs={logs} />}
            {activeTab === 'assets' && (
              <AssetTable 
                assets={assets} 
                onEdit={handleOpenAssetModal} 
                onDelete={handleDeleteAsset} 
              />
            )}
            {activeTab === 'maintenance' && <MaintenanceLog maintenance={maintenance} />}
            {activeTab === 'audit' && <AuditLogs logs={logs} />}
          </>
        )}
      </main>

      {/* MODAL: REGISTRAR/EDITAR ACTIVO */}
      <div className={`modal-overlay ${assetModalOpen ? 'active' : ''}`}>
        <div className="modal-card">
          <div className="modal-header">
            <h3>{editingAsset ? `Editar Activo: ${editingAsset}` : 'Registrar Nuevo Activo'}</h3>
            <button className="modal-close" onClick={handleCloseAssetModal}>&times;</button>
          </div>
          <form onSubmit={handleSaveAsset}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Nombre del Activo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  placeholder="Ej. Proyector Epson Lab 302"
                  value={assetForm.name}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <div class="form-group">
                  <label className="form-label">Tipo de Activo</label>
                  <select 
                    className="form-control" 
                    value={assetForm.type}
                    onChange={handleAssetTypeChange}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <select 
                    className="form-control"
                    value={assetForm.category}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {assetForm.type === 'Hardware' ? (
                      <>
                        <option value="Servidores">Servidores</option>
                        <option value="Computadoras">Computadoras</option>
                        <option value="Proyectores">Proyectores</option>
                        <option value="Redes">Redes</option>
                      </>
                    ) : (
                      <>
                        <option value="Licencias">Licencias</option>
                        <option value="Sistemas Operativos">Sistemas Operativos</option>
                        <option value="Herramientas Académicas">Herramientas Académicas</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Número de Serie / Licencia</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="S/N o Clave de Producto"
                    value={assetForm.serialNumber}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estado Operativo</label>
                  <select 
                    className="form-control"
                    value={assetForm.status}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Alerta Expiración">Alerta Expiración</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ubicación física / Servidor</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="Ej. Lab 102 - Edificio T-3"
                    value={assetForm.location}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Persona / Rol Asignado</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="Ej. Auxiliar Sergio Larios"
                    value={assetForm.assignedTo}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, assignedTo: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Fecha de Adquisición</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    required
                    value={assetForm.purchaseDate}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Costo / Presupuesto (USD)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    required 
                    placeholder="0.00"
                    value={assetForm.price}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descripción / Comentarios Técnicos</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Detalles de configuración..."
                  value={assetForm.description}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseAssetModal}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar Activo</button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL: REGISTRAR MANTENIMIENTO */}
      <div className={`modal-overlay ${maintenanceModalOpen ? 'active' : ''}`}>
        <div className="modal-card">
          <div className="modal-header">
            <h3>Registrar Orden de Mantenimiento</h3>
            <button className="modal-close" onClick={handleCloseMaintenanceModal}>&times;</button>
          </div>
          <form onSubmit={handleSaveMaintenance}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Seleccionar Activo</label>
                <select 
                  className="form-control" 
                  required
                  value={maintenanceForm.assetId}
                  onChange={(e) => setMaintenanceForm(prev => ({ ...prev, assetId: e.target.value }))}
                >
                  <option value="">Seleccione un activo...</option>
                  {assets.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.id})</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tipo de Mantenimiento</label>
                  <select 
                    className="form-control"
                    value={maintenanceForm.type}
                    onChange={(e) => setMaintenanceForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="Preventivo">Preventivo (Rutina)</option>
                    <option value="Correctivo">Correctivo (Falla)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha del Servicio</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    required
                    value={maintenanceForm.date}
                    onChange={(e) => setMaintenanceForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Técnico / Especialista encargado</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="Nombre del técnico o proveedor"
                    value={maintenanceForm.technician}
                    onChange={(e) => setMaintenanceForm(prev => ({ ...prev, technician: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Costo del Mantenimiento (USD)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    required 
                    placeholder="0.00"
                    value={maintenanceForm.cost}
                    onChange={(e) => setMaintenanceForm(prev => ({ ...prev, cost: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descripción de las Acciones Realizadas</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  required 
                  placeholder="Describa el trabajo realizado..."
                  value={maintenanceForm.description}
                  onChange={(e) => setMaintenanceForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseMaintenanceModal}>Cancelar</button>
              <button type="submit" className="btn btn-accent">Guardar Orden</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
