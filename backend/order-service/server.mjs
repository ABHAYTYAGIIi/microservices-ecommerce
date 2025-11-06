import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import client from 'prom-client'; // <---- Add this line

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/microservicesDB';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Order Service connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ----------------------------
// 🔹 PROMETHEUS METRICS SETUP
// ----------------------------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // collects Node.js default metrics

// Optional custom metric: count HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// ----------------------------
// Existing endpoints
// ----------------------------
app.get('/api/orders', (req, res) => {
  res.json([{ orderId: 101, item: 'Laptop', userId: 1 }]);
});

app.get('/health', (req, res) => {
  if (mongoose.connection.readyState === 1) res.status(200).send('OK');
  else res.status(500).send('MongoDB not connected');
});

app.get('/ready', (req, res) => {
  if (mongoose.connection.readyState === 1) res.status(200).send('Ready');
  else res.status(503).send('Not Ready');
});

// ----------------------------
// 🔹 PROMETHEUS /metrics ENDPOINT
// ----------------------------
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// ----------------------------
// Start the service
// ----------------------------
const PORT = process.env.PORT || 4002;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Order Service running on port ${PORT}`));

