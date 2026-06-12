# Manual Técnico
## Sistema Integral de Gestión de Activos de TI (ITAM) - USAC
### Escuela de Ciencias y Sistemas - Facultad de Ingeniería - Universidad de San Carlos de Guatemala

---

## 1. Arquitectura del Sistema
El prototipo adopta una **arquitectura desacoplada de n capas (cliente-servidor)** para garantizar modularidad, extensibilidad y escalabilidad de cara a la implementación de la Fase 2.

```
       [ CLIENTE WEB ]
              │ (React Single Page Application)
              ▼
   [ REVERSO PROXY (Vite) ]
              │ (Mapeo de endpoints en puerto 3000)
              ▼
       [ BACKEND API ]
         (Puerto 5000)
              │
              ├── [ RUTAS (Routes) ] 
              │     Mapeo de URLs a controladores
              │
              ├── [ CONTROLADORES (Controllers) ]
              │     Validación de HTTP Request y formateo de JSON Response
              │
              ├── [ SERVICIOS (Services) ]
              │     Lógica de negocio y reglas de dominio ITAM
              │
              └── [ MODELOS / PERSISTENCIA ]
                    Lectura/Escritura en base de datos local JSON (db.js)
```

### 1.1. Ventajas de la Arquitectura
* **Desacoplamiento Completo:** El frontend de React y el backend de Node corren de forma independiente. Esto permite cambiar o rediseñar el frontend sin afectar las reglas de negocio del backend.
* **Escalabilidad de Base de Datos:** Toda la interacción de datos se realiza a través de `backend/src/models/db.js` y clases de servicio. Para la Fase 2, migrar a PostgreSQL o MySQL solo requerirá cambiar la conexión de red de `db.js` por un driver como `pg` o `sequelize`, manteniendo intacta la lógica del resto del servidor.
* **Contenedores Independientes:** El uso de Docker Compose permite escalar horizontalmente los contenedores del backend o frontend según la demanda de los servidores de la facultad.

---

## 2. Tecnologías Utilizadas

### 2.1. Backend
* **Entorno de Ejecución:** Node.js (v20-alpine)
* **Framework Web:** Express.js (v4.19.2)
* **Librerías Adicionales:** CORS (v2.8.5) para habilitar peticiones entre orígenes durante el desarrollo local.

### 2.2. Frontend
* **Herramienta de Construcción:** Vite (v5.3.1)
* **Librería de Componentes:** React (v18.3.1)
* **Estilizado:** CSS3 Vanilla utilizando variables nativas, transiciones fluidas y técnicas de glassmorphism.
* **Iconografía:** Remix Icons (v3.5.0) mediante carga externa CDN.

### 2.3. DevOps e Infraestructura
* **Motor de Contenedores:** Docker
* **Orquestador:** Docker Compose

---

## 3. Modelo y Estructura de Datos
La base de datos actual se aloja en un archivo de almacenamiento no relacional estructurado denominado `data.json`. La estructura principal contiene tres colecciones clave:

### 3.1. Esquema de Activos (`assets`)
| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | String | Identificador único autogenerado | `"ASSET-001"` |
| `name` | String | Nombre representativo del activo | `"Servidor HP ProLiant"` |
| `type` | String | Tipo de activo: `Hardware` o `Software` | `"Hardware"` |
| `category` | String | Categoría del activo | `"Servidores"` |
| `serialNumber` | String | Número de serie físico o clave de licencia | `"SNDL360G10X99"` |
| `location` | String | Ubicación física o servidor del recurso | `"Lab 301"` |
| `assignedTo` | String | Persona o rol a cargo del activo | `"Sergio Larios"` |
| `purchaseDate` | String | Fecha de adquisición (YYYY-MM-DD) | `"2024-01-15"` |
| `price` | Number | Costo financiero en USD | `4500.00` |
| `status` | String | Estado operativo: `Activo`/`Mantenimiento`/`Alerta`/`Inactivo` | `"Activo"` |
| `description` | String | Notas o comentarios adicionales | `"Servidor principal"` |

### 3.2. Esquema de Mantenimiento (`maintenance`)
| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | String | Identificador del registro | `"MNT-001"` |
| `assetId` | String | ID del activo relacionado | `"ASSET-004"` |
| `assetName` | String | Nombre del activo relacionado | `"Switch Cisco"` |
| `date` | String | Fecha del servicio técnico | `"2026-06-10"` |
| `type` | String | Tipo de mantenimiento: `Preventivo` o `Correctivo` | `"Correctivo"` |
| `description` | String | Detalle de las acciones realizadas | `"Actualización de firmware"` |
| `technician` | String | Nombre del encargado del soporte | `"Ing. Soporte TI"` |
| `cost` | Number | Costo económico del servicio | `150.00` |

### 3.3. Esquema de Auditoría (`logs`)
| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | String | ID del log de auditoría | `"LOG-17002012920"` |
| `timestamp` | String | Fecha y hora en formato ISO | `"2026-06-12T10:00:00Z"` |
| `action` | String | Operación: `Creación`/`Actualización`/`Eliminación`/`Mantenimiento` | `"Creación"` |
| `details` | String | Detalle textual de los cambios | `"Activo registrado..."` |

---

## 4. Documentación de la API REST

### 4.1. Módulo de Activos

#### Obtener todos los activos
* **Ruta:** `GET /api/assets`
* **Respuesta Exitosa (200 OK):**
  ```json
  [
    {
      "id": "ASSET-001",
      "name": "Servidor HP ProLiant",
      "type": "Hardware",
      "category": "Servidores",
      "status": "Activo"
    }
  ]
  ```

#### Crear un activo
* **Ruta:** `POST /api/assets`
* **Cuerpo de Petición (Payload):**
  ```json
  {
    "name": "Proyector Epson L520U",
    "type": "Hardware",
    "category": "Proyectores",
    "serialNumber": "EPSON1234",
    "location": "Lab 301",
    "assignedTo": "Sergio Larios",
    "purchaseDate": "2026-06-12",
    "price": 1200.00,
    "description": "Proyector de prueba"
  }
  ```
* **Respuesta Exitosa (201 Created):** Retorna el activo creado con su ID autogenerado.

#### Actualizar un activo
* **Ruta:** `PUT /api/assets/:id`
* **Cuerpo de Petición (Payload):** Igual al anterior con los campos modificados.
* **Respuesta Exitosa (200 OK):** Retorna el activo modificado y agrega registro en auditoría.

#### Eliminar un activo
* **Ruta:** `DELETE /api/assets/:id`
* **Respuesta Exitosa (200 OK):**
  ```json
  {
    "message": "Activo eliminado de manera exitosa",
    "asset": { "id": "ASSET-001", "name": "Servidor HP ProLiant" }
  }
  ```

---

### 4.2. Módulo de Mantenimiento

#### Obtener historial de mantenimientos
* **Ruta:** `GET /api/maintenance`
* **Respuesta Exitosa (200 OK):** Retorna un array con todas las órdenes registradas.

#### Registrar mantenimiento
* **Ruta:** `POST /api/maintenance`
* **Cuerpo de Petición (Payload):**
  ```json
  {
    "assetId": "ASSET-002",
    "type": "Preventivo",
    "date": "2026-06-12",
    "technician": "Soporte EPSON",
    "cost": 50.00,
    "description": "Limpieza de lentes"
  }
  ```
* **Respuesta Exitosa (201 Created):** Registra el servicio técnico y actualiza el estado del activo a `"Mantenimiento"`.

---

### 4.3. Módulo de Auditoría

#### Obtener bitácora
* **Ruta:** `GET /api/logs`
* **Respuesta Exitosa (200 OK):** Retorna el array de logs ordenados en forma descendente cronológicamente.

---

## 5. Estructura de Componentes Frontend (React)
La interfaz web es una Single Page Application estructurada modularmente en `frontend/src/`:
* `App.jsx`: Componente padre. Aloja los estados principales de la app, maneja el ciclo de vida del componente mediante `useEffect` para cargar datos iniciales, y coordina la lógica de apertura y envío de formularios en los modales.
* `components/Dashboard.jsx`: Calcula las métricas generales (Totales, Activos, Mantenimientos, Alertas) y renderiza el gráfico de barras responsivo por categorías.
* `components/AssetTable.jsx`: Renders de tablas con filtrado en tiempo real. Contiene hooks internos para el estado de búsqueda y filtros.
* `components/MaintenanceLog.jsx`: Renderiza la tabla histórica de servicios técnicos.
* `components/AuditLogs.jsx`: Muestra la lista de logs de auditoría formateados en tiempo real.

---

## 6. Configuración de Despliegue en Servidores

### 6.1. Requisitos del Servidor
* Motor Docker instalado.
* Docker Compose.

### 6.2. Configuración de Red
El archivo `docker-compose.yml` expone dos puertos en el host:
* Puerto `3000` redirigido al contenedor del frontend (`itam-frontend`).
* Puerto `5000` redirigido al contenedor del backend (`itam-backend`).

La comunicación externa del cliente en el navegador se realiza a través del puerto `3000`. Vite redirige transparentemente las peticiones de `/api/*` al backend en el puerto `5000` de forma interna gracias a su configuración de proxy de desarrollo.

### 6.3. Migración a Entorno de Producción
En un despliegue de producción real en servidores de la facultad, se recomienda colocar un servidor web proxy reverso (como Nginx o Apache) enfrente del puerto `3000` y `5000` para administrar los certificados de seguridad SSL (HTTPS).

Para habilitar persistencia física robusta fuera del contenedor de Docker, el volumen está configurado en `./backend/src/models/data.json`, permitiendo realizar copias de seguridad de la base de datos simplemente copiando dicho archivo en el host del servidor.
