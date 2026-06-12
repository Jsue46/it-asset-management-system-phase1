# Documento de Justificación de Diseño y Requerimientos
## Proyecto: Sistema Integral de Gestión de Activos de TI (ITAM) - USAC
### Escuela de Ciencias y Sistemas - Facultad de Ingeniería - Universidad de San Carlos de Guatemala

---

## 1. Integrantes del Equipo de Trabajo y Roles (Grupo 7)
Para la ejecución de la Fase 1 (Inicio y Planificación) y el desarrollo de este prototipo, el equipo de 7 integrantes se ha organizado en los siguientes roles profesionales alineados al PMBOK 8:

1. **Director del Proyecto (Project Manager):** Responsable de la integración general del proyecto, la gestión del cronograma y la comunicación con los interesados (auxiliar y catedrático).
2. **Líder de Arquitectura y Backend:** Diseñador del backend en Node.js y la API REST, garantizando un código desacoplado y listo para migrar de base de datos en la Fase 2.
3. **Líder de Frontend y Experiencia de Usuario (UX/UI):** Creador del Dashboard y vistas del inventario en React, implementando estilos dinámicos de alto nivel y transiciones suaves.
4. **Administrador de Base de Datos y Persistencia:** Encargado del diseño de los esquemas de activos, mantenimientos e historial, así como de la estructuración del almacenamiento inicial de datos en el archivo de persistencia local.
5. **Ingeniero de DevOps e Infraestructura:** Responsable de la dockerización del proyecto, configurando las imágenes, los puertos, el proxy reverso y la orquestación en red en Docker Compose.
6. **Analista de Calidad y Pruebas (QA):** Encargado de la validación sintáctica, funcionalidad de la interfaz y verificación del flujo completo de operaciones en el sistema.
7. **Analista de Riesgos y Control Predictivo:** Responsable de la elaboración de los planes de contingencia, la bitácora de auditoría y los entregables predictivos alineados con el cronograma de laboratorio.

---

## 2. Justificación de la Arquitectura de Diseño
El prototipo ha sido diseñado bajo una **arquitectura desacoplada en capas (N-Tier)** separando el frontend del backend por las siguientes razones fundamentales:

### 2.1. Desacoplamiento de Responsabilidades
Al separar la interfaz del servidor web, logramos que los cambios visuales o de interacción del usuario (Frontend) no afecten en absoluto el procesamiento de la información ni las reglas de dominio del inventario (Backend). Esto facilita enormemente el desarrollo simultáneo y en paralelo de los integrantes del equipo.

### 2.2. Escalabilidad y Migración a Base de Datos (Fase 2)
El backend utiliza un controlador central y una capa de servicios (`backend/src/services/`) que interactúa con un modelo de datos (`backend/src/models/db.js`). 
* **Por qué:** Actualmente los datos se guardan en un archivo JSON local (`data.json`) para facilitar la ejecución y demostración del prototipo sin obligar a los evaluadores a instalar motores SQL locales.
* **Escalabilidad:** Si en la Fase 2 del laboratorio se solicita migrar el sistema a una base de datos PostgreSQL, SQLite o MySQL conectada en la nube, el equipo solo tendrá que actualizar el archivo `db.js` para usar un ORM o un Pool de conexiones a bases de datos relacionales. Ninguna línea de código de los controladores, servicios o el frontend tendrá que ser modificada.

### 2.3. Contenedores con Docker y Docker Compose
El proyecto corre en contenedores individuales orquestados por Docker Compose:
* **Entorno Estandarizado:** Garantiza que la aplicación funcione de forma idéntica en la laptop de cualquiera de los 7 miembros del grupo, así como en la computadora del auxiliar o catedrático que califica, evitando incompatibilidades de software de sistema.
* **Simulación Real:** Permite simular cómo funciona un servidor web moderno donde el frontend y la API son servicios independientes en una red privada virtual de contenedores.

---

## 3. Matriz de Requerimientos del Sistema (Funcionales y No Funcionales)

### 3.1. Requerimientos Funcionales (RF)
* **RF-01 (Dashboard Centralizado):** El sistema debe mostrar un resumen en tiempo real del estado de los activos, dividiéndolos en total de activos, activos en operación, activos en mantenimiento y alertas de licencias por vencer.
* **RF-02 (Distribución Gráfica):** El panel de control debe visualizar un gráfico interactivo del conteo de activos según sus categorías (servidores, computadoras, proyectores, redes y licencias).
* **RF-03 (CRUD de Activos):** El sistema debe permitir registrar, listar, editar y dar de baja activos tecnológicos (Hardware y Software).
* **RF-04 (Control de Asignaciones):** Cada activo registrado debe contar con campos obligatorios para su ubicación física (laboratorio, servidor) y la persona o rol asignado como responsable técnico.
* **RF-05 (Gestión de Mantenimientos):** El sistema debe permitir registrar órdenes de mantenimiento correctivo y preventivo, indicando costo, técnico encargado y descripción detallada del trabajo.
* **RF-06 (Transición de Estado Automática):** Al registrar una orden de mantenimiento, el sistema debe cambiar automáticamente el estado del activo vinculado a "Mantenimiento".
* **RF-07 (Bitácora de Auditoría):** Cada acción que afecte el inventario (alta, modificación, mantenimiento o baja) debe generar de forma inalterable y en tiempo real una entrada en la bitácora de auditoría detallando la operación y el timestamp exacto.

### 3.2. Requerimientos No Funcionales (RNF)
* **RNF-01 (Estética Premium):** La interfaz de usuario debe utilizar una paleta de colores oscuros moderna, tipografía premium (Outfit), animaciones en los modales y estilos basados en glassmorphism.
* **RNF-02 (Compatibilidad Docker):** Todo el sistema debe poder levantarse y construirse con un único comando utilizando Docker Compose.
* **RNF-03 (Persistencia de Datos):** La información cargada en el inventario debe persistir mediante almacenamiento físico local (volumen montado), asegurando que no se pierdan datos al apagar o reiniciar los contenedores.
* **RNF-04 (Tiempo de Respuesta):** Las búsquedas y filtros dinámicos en el inventario de activos deben realizarse del lado del cliente en tiempo real para agilizar la interacción del usuario.

---

## 4. Alineación Metodológica con PMBOK 8
El desarrollo del prototipo y de la documentación ha sido gestionado bajo el enfoque de entrega de valor predictivo, estructurando los entregables según los principios del PMBOK 8:

1. **Gestión del Alcance (EDT/WBS):** Definición estricta de las actividades para completar el prototipo y la documentación predictiva de la Fase 1 en un periodo de 2.5 semanas.
2. **Dominio de Desempeño del Equipo:** Organización de los 7 miembros en roles bien definidos de ingeniería de software (DevOps, QA, Backend, Frontend, PM, DB).
3. **Dominio de Desempeño de la Planificación:** Control de costos del proyecto y uso del cronograma base para evitar retrasos en las entregas diarias obligatorias del laboratorio.
4. **Dominio de Desempeño de la Entrega (Valor):** Generación de valor tangible mediante un software funcional (Proof of Concept) en lugar de limitarse a entregar documentación teórica vacía.
