const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Habilitar métricas por defecto (CPU, RAM del contenedor)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// 2. Métricas personalizadas
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP procesadas',
  labelNames: ['metodo', 'ruta', 'estado_http'],
});

const activeUsersGauge = new client.Gauge({
  name: 'active_users_current',
  help: 'Número actual de usuarios activos simulados'
});

// Middleware para contar peticiones
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      metodo: req.method,
      ruta: req.path,
      estado_http: res.statusCode
    });
  });
  next();
});

// Rutas de la App
app.get('/', (req, res) => {
  // Simulación de usuarios activos aleatorios para la gráfica
  activeUsersGauge.set(Math.floor(Math.random() * 100));
  res.send('🚀 Servidor Node.js corriendo perfectamente');
});

// 3. RUTA VITAL: Endpoint /metrics para Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Métricas disponibles en http://localhost:${PORT}/metrics`);
});