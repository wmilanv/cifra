require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const reporteRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const historialRoutes = require('./routes/historialRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 60 }));

app.use('/auth', authRoutes);
app.use('/solicitudes', solicitudRoutes);
app.use('/reportes', reporteRoutes);
app.use('/usuarios', userRoutes);
app.use('/', historialRoutes);
// Test DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('DB sync complete');
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  });
});
