# Informe de Monitoreo: Línea Base de Tiempo, Hitos y Entregables
## Proyecto: Sistema Integral de Gestión de Activos de TI (ITAM) - USAC

Este informe presenta el estado del control de entregables y la línea base de tiempo del proyecto ITAM para asegurar el cumplimiento del cronograma oficial del laboratorio de Teoría de Sistemas 2.

---

## 1. Monitoreo de Línea Base de Tiempo

Hemos definido la línea base original (PV - Planned Value) con fechas de corte estrictas para cada entregable de gestión. A la fecha actual de reporte (**12 de junio de 2026**), el estado del avance es el siguiente:

| Hito / Entregable | Fecha Planificada | Fecha Real | Desviación (Días) | Estado de Cumplimiento |
| :--- | :---: | :---: | :---: | :---: |
| 1. Definición del Alcance | 02/Jun/2026 | 02/Jun/2026 | 0 | ✅ Completado a tiempo |
| 2. Acta de Constitución | 03/Jun/2026 | 03/Jun/2026 | 0 | ✅ Completado a tiempo |
| 3. EDT / WBS | 04/Jun/2026 | 04/Jun/2026 | 0 | ✅ Completado a tiempo |
| 4. Cronograma y Ruta Crítica | 05/Jun/2026 | 05/Jun/2026 | 0 | ✅ Completado a tiempo |
| 5. Presupuesto y Costos | 08/Jun/2026 | 08/Jun/2026 | 0 | ✅ Completado a tiempo |
| 6. Planificación de Riesgos | 09/Jun/2026 | 09/Jun/2026 | 0 | ✅ Completado a tiempo |
| 7. Informe de Monitoreo | 10/Jun/2026 | 10/Jun/2026 | 0 | ✅ Completado a tiempo |
| 8. Informe de Desempeño EVM | 11/Jun/2026 | 11/Jun/2026 | 0 | ✅ Completado a tiempo |
| 9. Presentación Gerencial / Prototipo | 12/Jun/2026 | 12/Jun/2026 | 0 | ✅ Completado a tiempo |
| 10. Presentación Final y Cierre | 15/Jun/2026 | - | - | 🕒 En ejecución |

---

## 2. Control de Variaciones
* **Desviación de Tiempo:** 0 días. El equipo ha logrado mantener el ritmo diario gracias a la asignación clara de roles.
* **Control del Prototipo:** El alcance técnico inicial (Dashboard + CRUD de activos + Mantenimientos + Bitácora) se completó el 12 de junio, cumpliendo con la meta de tener un entregable funcional interactivo antes del cierre.

---

## 3. Acciones Preventivas y Correctivas Implementadas
1. **Acción Preventiva (DevOps):** Empaquetar el frontend y backend en imágenes Docker independientes y subir las configuraciones a Git antes de la fase de pruebas integrales para evitar el riesgo de caídas locales.
2. **Acción Correctiva (QA):** Ejecución automatizada de pruebas sintácticas de código para corregir fallos menores de importación que impedían arrancar el servidor backend en entornos Unix/macOS.
