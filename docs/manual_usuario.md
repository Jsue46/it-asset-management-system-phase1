# Manual de Usuario
## Sistema Integral de Gestión de Activos de TI (ITAM) - USAC
### Escuela de Ciencias y Sistemas - Facultad de Ingeniería - Universidad de San Carlos de Guatemala

---

## 1. Introducción al Sistema
El **Sistema de Gestión de Activos de TI (ITAM)** es una plataforma web desarrollada para la administración, control y auditoría de la infraestructura tecnológica de la Escuela de Ciencias y Sistemas. El software permite centralizar la información de computadoras, servidores, redes, proyectores y licencias académicas, sustituyendo el uso de hojas de cálculo dispersas.

Con esta plataforma, la facultad puede:
* Mantener un control en tiempo real de la ubicación y responsables de los equipos.
* Administrar y programar mantenimientos correctivos y preventivos.
* Recibir alertas oportunas de expiración de licencias académicas críticas.
* Mantener una bitácora inalterable de auditoría para fines de rendición de cuentas y seguridad.

---

## 2. Requisitos de Uso
Para acceder y operar el sistema, el usuario final solo requiere:
* **Navegador Web Moderno:** Google Chrome, Mozilla Firefox, Microsoft Edge o Safari (versiones actualizadas).
* **Resolución Recomendada:** La interfaz es responsiva, por lo que es operable en laptops, monitores de escritorio y tablets.
* **Acceso de Red:** Conexión local o de red universitaria a la dirección asignada del sistema.

---

## 3. Estructura de la Interfaz y Navegación
La plataforma cuenta con una interfaz oscura moderna y un menú lateral de navegación rápida que se divide en cuatro módulos principales:

```
[ ITAM USAC ] ──> 📊 Dashboard (Resumen general y métricas)
              ──> 💻 Inventario Activos (Lista, búsqueda y operaciones CRUD)
              ──> 🔧 Mantenimiento (Historial y registro de servicios técnicos)
              ──> 📝 Bitácora Auditoría (Bitácora en tiempo real)
```

---

## 4. Guía de Procedimientos Paso a Paso

### 4.1. Visualización del Dashboard (Panel Principal)
Al ingresar al sistema, será dirigido al **Dashboard**. Este panel contiene:
1. **Métricas Clave:** Cuatro paneles superiores que indican el total de activos registrados, cuántos están activos (en operación), cuántos están en mantenimiento y cuántas alertas de licencias de software están vigentes.
2. **Distribución por Categorías:** Gráfico de barras interactivo que muestra visualmente cuántos Servidores, Computadoras, Proyectores, Equipos de Red y Licencias existen.
3. **Actividad Reciente:** Un feed de auditoría simplificado con los últimos movimientos hechos en el inventario.

---

### 4.2. Registro de un Nuevo Activo
Para registrar un nuevo equipo u licencia en la facultad:
1. Presione el botón azul **"Registrar Activo"** en la esquina superior derecha de la pantalla.
2. Se desplegará un formulario modal. Complete los siguientes campos:
   * **Nombre del Activo:** Ej. *Proyector Epson Lab 302* o *Licencia Anual MATLAB*.
   * **Tipo de Activo:** Seleccione entre *Hardware* (físico) o *Software* (digital).
   * **Categoría:** Las categorías cambian dinámicamente según el tipo (Servidores, Computadoras, Proyectores, Redes para Hardware; Licencias o Sistemas Operativos para Software).
   * **Número de Serie / Licencia:** Identificador único o clave de producto.
   * **Estado Operativo:** Seleccione el estado inicial (*Activo*, *Mantenimiento*, *Alerta Expiración* o *Inactivo*).
   * **Ubicación Física / Servidor:** Laboratorio o ubicación física exacta.
   * **Persona / Rol Asignado:** Nombre del catedrático, auxiliar o responsable del activo.
   * **Fecha de Adquisición:** Fecha de compra o ingreso.
   * **Costo / Presupuesto:** Precio de adquisición en USD.
   * **Descripción:** Comentarios técnicos adicionales.
3. Haga clic en **"Guardar Activo"**. El nuevo activo aparecerá inmediatamente en el inventario y se actualizará el Dashboard.

---

### 4.3. Búsqueda y Edición de Activos
1. Diríjase a la pestaña **"Inventario Activos"** en el menú lateral.
2. Utilice la barra de búsqueda superior para encontrar activos escribiendo el nombre, número de serie, ubicación o responsable.
3. Puede filtrar rápidamente por tipo de activo o por su estado usando los selectores desplegables.
4. Para **editar** la información de un activo (ej. cambiarlo de laboratorio o asignar un nuevo responsable):
   * Haga clic en el botón gris con el ícono de lápiz en la fila del activo correspondiente.
   * Modifique los campos necesarios en el formulario y presione **"Guardar Activo"**.
   * El cambio se guardará y generará una entrada automática en la bitácora de auditoría.

---

### 4.4. Registro de un Mantenimiento Técnico
Cuando un equipo físico falla o requiere revisión de rutina:
1. Haga clic en el botón amarillo **"Registrar Mantenimiento"** en el encabezado de la aplicación.
2. Complete el formulario con los siguientes datos:
   * **Seleccionar Activo:** Busque y seleccione el activo correspondiente en la lista desplegable.
   * **Tipo de Mantenimiento:** Seleccione *Preventivo* (rutina) o *Correctivo* (por daño/falla).
   * **Fecha del Servicio:** Fecha en la que se realiza el mantenimiento.
   * **Técnico / Especialista encargado:** Nombre del técnico interno o empresa proveedora.
   * **Costo del Mantenimiento:** Valor económico del servicio.
   * **Descripción:** Detalle de las acciones que se realizaron (ej. *"Limpieza de filtros y cambio de lámpara"*).
3. Presione **"Guardar Orden"**.
4. **Nota del Sistema:** Al guardar la orden, el estado del activo se actualizará automáticamente a **"Mantenimiento"** en el inventario de forma inmediata.

---

### 4.5. Dar de Baja / Eliminar un Activo
1. En la pestaña **"Inventario Activos"**, localice el activo.
2. Haga clic en el botón gris con el ícono de basurero rojo en la columna de acciones.
3. Confirme la acción en el cuadro de diálogo del navegador. 
4. El activo se eliminará del inventario y se generará un registro de eliminación inalterable en la bitácora indicando qué activo fue removido.

---

### 4.6. Consulta de la Bitácora de Auditoría
Para revisar el historial detallado de quién y cuándo modificó los activos:
1. Ingrese a la pestaña **"Bitácora Auditoría"** en el menú lateral.
2. Podrá visualizar una lista cronológica completa de todas las transacciones realizadas (Creación, Actualización, Mantenimiento, Eliminación) con su fecha, hora y descripción de los cambios efectuados.

---

## 5. Preguntas Frecuentes (FAQ)

**¿Qué pasa si una licencia vence?**
El administrador debe cambiar manualmente el estado del activo de software a "Alerta Expiración" para que el Dashboard lo contabilice en el panel rojo y se alerte visualmente al personal.

**¿El costo del mantenimiento se suma al precio original del activo?**
No. El costo del mantenimiento se registra de forma independiente en el módulo de "Mantenimiento" para control presupuestario y de contabilidad.

**¿Por qué un activo cambió automáticamente a estado "Mantenimiento"?**
Esto ocurre porque se registró una orden de servicio técnico para ese activo. Una vez que el técnico entregue el equipo operativo, el administrador debe ir al inventario, editar el activo y regresar su estado a "Activo".
