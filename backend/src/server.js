const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=== Backend del Sistema ITAM USAC corriendo en el puerto ${PORT} ===`);
});
