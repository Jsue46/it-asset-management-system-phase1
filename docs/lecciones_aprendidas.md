# Registro de Lecciones Aprendidas y Cierre del Proyecto
## Proyecto: Sistema Integral de Gestión de Activos de TI (ITAM) - USAC

Este documento formaliza el cierre del proyecto y recopila la retroalimentación técnica e institucional del equipo tras la entrega final del prototipo de la Fase 1.

---

## 1. Resumen de Lecciones Aprendidas

### 1.1. Gestión y Planificación Predictiva (PMBOK 8)
* **Lo que funcionó:** La elaboración de la EDT/WBS y la identificación de la Ruta Crítica desde el inicio de la primera semana evitó la sobreposición de actividades técnicas y administrativas. El equipo mantuvo una disciplina estricta de reuniones diarias cortas (15 minutos) para destrabar el avance.
* **Lo que no funcionó:** Inicialmente, no se contemplaron las holguras adecuadas para la recopilación de datos históricos de hardware de la facultad, lo que obligó a diseñar un esquema de carga ficticia (`data.json`) para la demostración del prototipo.
* **Lección para el Futuro:** Para la Fase 2, se deben agendar las reuniones de requerimientos con el personal administrativo de laboratorios con al menos 3 días de anticipación.

### 1.2. Desarrollo Técnico y Arquitectura
* **Lo que funcionó:** El diseño de la **arquitectura desacoplada en capas (Backend API + Frontend React)**. Aunque requirió más configuración de archivos al principio, demostró ser sumamente robusto. Permite al equipo de frontend modificar la UI sin riesgo de romper el servidor web, y deja el terreno listo para conectar una base de datos PostgreSQL real en la Fase 2 sin alterar los componentes visuales.
* **Lo que no funcionó:** Configurar el proxy reverso de Vite para comunicar el frontend con el backend dentro de la red interna de Docker dio fallas iniciales debido al mapeo de los hosts de red.
* **Lección para el Futuro:** Utilizar siempre variables de entorno (`process.env`) parametrizadas en archivos de configuración de red en lugar de quemar direcciones URL locales (`http://localhost`) en los servicios del frontend.

---

## 2. Recomendaciones Estratégicas para la Fase 2

1. **Implementación de Base de Datos Relacional:** Reemplazar el motor temporal de almacenamiento en memoria JSON (`src/models/db.js`) por un pool de conexiones a una base de datos PostgreSQL o MySQL administrada, soportando relaciones de llaves foráneas entre activos, responsables y bitácora.
2. **Autenticación y Roles:** Añadir un middleware de autenticación (JWT) para restringir el acceso a los formularios de creación, edición e historial de mantenimientos según roles (ej. Administrador de TI, Auxiliar de Laboratorio, Catedrático).
3. **Módulo de Reportes en PDF Real:** Desarrollar una funcionalidad para la exportación y descarga de archivos PDF/Excel con el inventario actual filtrado, facilitando las auditorías físicas semestrales requeridas por la Escuela de Ciencias y Sistemas.
