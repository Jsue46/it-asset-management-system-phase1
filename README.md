# Sistema Integral de Gestión de Activos de TI (ITAM) - USAC
## Proyecto #1 (Fase 1: Inicio y Planificación con Enfoque Predictivo)
### Teoría de Sistemas 2 - Grupo 7 (Vacaciones de Junio 2026)

Este repositorio contiene tanto la **documentación de gestión bajo el estándar PMBOK 8** como un **prototipo web interactivo, funcional y altamente escalable** empaquetado con Docker Compose.

---

##  Arquitectura y Escalabilidad

El prototipo se ha estructurado utilizando un enfoque limpio de separación de capas (Backend API + Frontend SPA) para garantizar que en la **Fase 2** (o fase de desarrollo masivo) el equipo pueda escalar el sistema de manera rápida y sin acoplamiento:
1. **Frontend (SPA):** Diseñado con HTML5 semántico, CSS3 personalizado con variables de tema (colores institucionales de la USAC en un entorno moderno dark-mode con glassmorphism) y Javascript vanilla.
2. **Backend (API REST):** Construido sobre Node.js y Express.js, exponiendo endpoints limpios para el CRUD de activos, registro de mantenimientos y bitácora de auditoría.
3. **Persistencia (Base de Datos):** Implementa un motor en memoria con persistencia en archivo JSON (`data.json`). Esto elimina la necesidad de configurar bases de datos complejas para la demostración del prototipo, pero la capa de datos en `src/db.js` está lista para ser reemplazada directamente por PostgreSQL, MySQL o SQLite en la Fase 2 sin alterar la lógica de negocio ni el frontend.

---

## 🐳 Cómo Ejecutar el Prototipo

### Opción 1: Usando Docker (Recomendado)
Asegúrese de tener Docker y Docker Compose instalados, luego ejecute:
```bash
docker compose up --build
```
Una vez levantado, abra su navegador en: **`http://localhost:3000`**

### Opción 2: Ejecución Local (Sin Docker)
Si prefiere ejecutarlo directamente en su equipo con Node.js:

1. **Backend:**
   Abra una terminal en la raíz, navegue al backend e instale/inicie:
   ```bash
   cd backend
   npm install
   npm start
   ```
   *La API estará disponible en `http://localhost:5000`.*

2. **Frontend:**
   En otra terminal, navegue al frontend e instale/inicie:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *La interfaz de usuario estará disponible en `http://localhost:3000`.*

---

## 📂 Estructura de Carpetas

```text
├── docs/                      # Entregables de Gestión Predictiva (PMBOK 8)
│   ├── [TEO2]P1_Predictivo_Jun26.pdf
│   ├── acta_constitucion.md   # Acta de Constitución del Proyecto (Project Charter)
│   ├── edt_wbs.md             # Estructura de Desglose del Trabajo
│   ├── cronograma_gantt.md    # Hitos, Gantt y Ruta Crítica
│   ├── presupuesto_costos.md  # Plan de Recursos y Costos Ficticios
│   └── matriz_riesgos.md      # Matriz de Probabilidad e Impacto
├── src/                       # Código Fuente del Prototipo
│   ├── db.js                  # Manejador de persistencia de datos (JSON DB)
│   ├── server.js              # Servidor Express y endpoints API REST
│   └── public/                # Código Frontend (Interfaz de Usuario)
│       ├── index.html         # Pantalla principal SPA
│       └── style.css          # Estilos premium, animaciones y glassmorphism
├── data.json                  # Base de datos simulada
├── Dockerfile                 # Definición del contenedor de la aplicación
├── docker-compose.yml         # Orquestador del servicio dockerizado
└── package.json               # Dependencias del proyecto Node.js
```

---

## 🛠️ Características del Prototipo Técnico
* **Dashboard Interactivo:** Métricas clave en tiempo real (Activos Totales, En Operación, En Mantenimiento, Alertas de Expiración de Licencias) y gráfico de barras CSS dinámico por categorías.
* **Control de Inventario Completo:** CRUD completo (Creación, Lectura, Actualización, Eliminación) de hardware (servidores, computadoras, redes) y software (licencias).
* **Asignaciones de Activos:** Vinculación directa de equipos a docentes y auxiliares de laboratorios (ej. Ing. Jorge Luis Álvarez, Aux. Sergio Larios).
* **Mantenimiento Técnico:** Registro de mantenimientos preventivos y correctivos, calculando costos asociados y actualizando el estado de los activos automáticamente.
* **Bitácora de Auditoría en Tiempo Real:** Registro automático de cada acción (creación, edición, eliminación o mantenimiento) para cumplir con las normas de gobernanza de TI de la USAC.