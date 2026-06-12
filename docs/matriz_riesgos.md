# Planificación de Riesgos (Matriz de Probabilidad e Impacto)
## Proyecto: Sistema Integral de Gestión de Activos de TI (ITAM) - USAC

---

## 1. Identificación y Categorización de Riesgos

Hemos identificado 6 riesgos principales que podrían afectar el alcance, tiempo o costo del proyecto ITAM durante el curso vacacional.

| ID Riesgo | Descripción del Riesgo | Categoría (RBS) | Impacto Potencial |
| :---: | :--- | :--- | :--- |
| **R-01** | Disponibilidad limitada de los integrantes por carga académica. | Recursos Humanos | Retrasos en las fechas límite de los hitos. |
| **R-02** | Incompatibilidad del entorno Docker en los equipos de evaluación. | Tecnológico | Fallo en la demostración práctica ante el auxiliar. |
| **R-03** | Hojas de inventario histórico corruptas o incompletas. | Alcance / Datos | Errores en la migración inicial de activos. |
| **R-04** | Cambios en los requerimientos o directivas a mitad del curso. | Gestión | Reproceso de desarrollo y desfase en el presupuesto. |
| **R-05** | Fallo del servidor de hosting local durante la presentación. | Tecnológico | Imposibilidad de mostrar el prototipo. |
| **R-06** | Pérdida de código por fallos en el control de versiones (Git). | Técnico | Pérdida de hasta 2 días de trabajo técnico. |

---

## 2. Matriz de Probabilidad e Impacto

Cada riesgo es evaluado en una escala del 1 al 5 para obtener su severidad (Severidad = Probabilidad × Impacto).

| ID Riesgo | Probabilidad (1-5) | Impacto (1-5) | Severidad (P×I) | Clasificación de Prioridad |
| :---: | :---: | :---: | :---: | :---: |
| **R-01** | 4 | 4 | **16** | 🔴 ALTA (Crítico) |
| **R-02** | 3 | 4 | **12** | 🟡 MEDIA (Moderado) |
| **R-03** | 3 | 3 | **9**  | 🟡 MEDIA (Moderado) |
| **R-04** | 2 | 4 | **8**  | 🟡 MEDIA (Moderado) |
| **R-05** | 2 | 5 | **10** | 🟡 MEDIA (Moderado) |
| **R-06** | 1 | 5 | **5**  | 🟢 BAJA (Aceptable) |

---

## 3. Planes de Respuesta y Mitigación

* **R-01 (Carga académica):**
  * *Mitigación:* Establecer parejas de desarrollo cruzado para relevos y micro-reuniones de avance diario.
* **R-02 (Problemas con Docker):**
  * *Mitigación:* Proveer una guía de despliegue local simplificada (README) sin Docker para correr la aplicación mediante Node local.
* **R-03 (Datos incompletos):**
  * *Mitigación:* Estructurar un conjunto de datos ficticios iniciales completos (`data.json`) listos para ser mostrados como Proof of Concept.
* **R-04 (Cambios en requerimientos):**
  * *Mitigación:* Implementar la arquitectura desacoplada en capas para que cualquier cambio técnico en BD se realice en minutos en el archivo `db.js`.
* **R-05 (Caída de servidor local):**
  * *Mitigación:* El backend guarda cambios en caliente en el volumen de Docker. Se puede restaurar el contenedor en segundos con `docker compose down` y `up`.
* **R-06 (Fallo en Git):**
  * *Mitigación:* Forzar empujes (push) diarios al repositorio remoto en GitHub.
