# Acta de Constitución del Proyecto (Project Charter)
## Proyecto: Sistema Integral de Gestión de Activos de TI (ITAM) - USAC

---

### 1. Caso de Negocio (Business Case)
**Justificación:** Actualmente, la Escuela de Ciencias y Sistemas de la Facultad de Ingeniería carece de un sistema centralizado para el control de sus activos de TI (laboratorios, servidores, proyectores y licencias), gestionando su inventario mediante hojas de cálculo dispersas. Esto genera pérdidas de equipamiento, falta de mantenimiento preventivo y expiración no controlada de licencias críticas. La inversión en el Sistema ITAM se justifica plenamente al centralizar el control en una única plataforma auditable, reduciendo en un 85% la pérdida de equipo por falta de trazabilidad, incrementando la vida útil del hardware en un 30% gracias a alertas de mantenimientos programados, y evitando multas o interrupciones académicas por licencias vencidas (como MATLAB u Oracle). El beneficio tangible es una infraestructura tecnológica confiable, óptima para las acreditaciones de la Escuela y eficiente en el uso de los recursos públicos de la facultad.

---

### 2. Identificación de Interesados (Stakeholders)
* **Patrocinador del Proyecto:** Junta Directiva de la Facultad de Ingeniería (ente que autoriza el proyecto y el presupuesto).
* **Clientes Clave / Usuarios Directos:** 
  * **Director de la Escuela de Ciencias y Sistemas:** Responsable final de la infraestructura y acreditación académica.
  * **Administrador de Laboratorios y Catedráticos:** Personal responsable de custodiar el hardware y dictar cursos prácticos.
  * **Auxiliares de Laboratorio:** Usuarios operativos del sistema que reportarán novedades e inventario.
* **Beneficiarios Indirectos:** Estudiantes de Ingeniería (quienes contarán con laboratorios funcionales y licencias de software vigentes).
* **Equipo de Dirección del Proyecto (Grupo 7):**
  * **Director del Proyecto:** Gestión e integración general.
  * **Líder Técnico:** Desarrollo y arquitectura del software.
  * **Analista de Calidad (QA):** Validación y pruebas de los entregables.

---

### 3. Definición de Entregables de Alto Nivel
1. **Acta de Constitución (Project Charter):** Este documento formalizando el inicio del proyecto.
2. **Estructura de Desglose del Trabajo (EDT/WBS):** Descomposición jerárquica del alcance.
3. **Cronograma Base:** Diagrama de Gantt y cálculo de la Ruta Crítica para la entrega del sistema.
4. **Presupuesto y Plan de Recursos:** Estimación detallada de costos de horas-hombre y recursos de servidor.
5. **Matriz de Gestión de Riesgos:** Matriz de probabilidad e impacto con planes de contingencia.
6. **Prototipo Funcional ITAM (Software):** Aplicación web dockerizada con módulo de Dashboard, gestión de activos (Hardware/Software), registro de mantenimientos y bitácora de auditoría.
7. **Informe del Valor Ganado (EVM) y Lecciones Aprendidas:** Evaluación financiera y técnica al cierre.

---

### 4. Premisas y Restricciones
#### Premisas (Supuestos):
1. **Acceso a Datos Históricos:** El equipo de desarrollo asumirá que la administración de laboratorios entregará las hojas de cálculo del inventario actual a más tardar el día 2 de planificación.
2. **Disponibilidad de Recursos:** Cada integrante del equipo dedicará un mínimo de 3 horas diarias para el avance técnico e informará de inmediato cualquier contratiempo.
3. **Capacidad del Entorno Local:** Se asume que las computadoras del personal de la facultad cuentan con capacidad de ejecutar contenedores Docker para la demostración del prototipo.

#### Restricciones:
1. **Plazo Fijo e Improrrogable:** El proyecto debe ser completado y entregado a más tardar el **15 de junio de 2026** (fecha de cierre de vacaciones).
2. **Presupuesto Limitado:** Al ser un proyecto académico, no se cuenta con fondos reales para contratación de terceros, debiéndose utilizar únicamente licencias de software libre (Docker, Node.js) y capas gratuitas de nube si correspondiera.
3. **Sin Desarrollo Desde Cero:** Se restringe el desarrollo de módulos complejos no contemplados (como un chat interno o pasarelas de pago), enfocándose estrictamente en las necesidades centrales de ITAM: activos, mantenimientos, asignaciones y logs.

---

### 5. Riesgos Iniciales de Alto Nivel
1. **Riesgo 1: Baja disponibilidad de tiempo de los miembros del equipo.** Debido a la alta carga académica de la escuela en vacaciones de junio, existe el riesgo de retrasos en las entregas críticas. 
   - *Mitigación:* Definición de entregables diarios y reuniones ágiles de 15 minutos para destrabar tareas.
2. **Riesgo 2: Incompatibilidad de entornos de ejecución durante la presentación.** Que la laptop del integrante que exponga o el equipo del auxiliar no soporte la versión de Docker.
   - *Mitigación:* Configurar una alternativa de despliegue local simplificada mediante Node.js nativo (detallada en el README).
3. **Riesgo 3: Datos históricos incompletos o erróneos.** Que la información de licencias y hardware provista por la facultad esté desactualizada, entorpeciendo la migración de datos.
   - *Mitigación:* Diseñar un esquema flexible de importación de datos y precargar el prototipo con datos de prueba realistas pero simulados para la demostración técnica.
