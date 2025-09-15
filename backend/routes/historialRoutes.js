const express = require('express');
const router = express.Router();
const { verHistorial } = require('../controllers/historialController');
const { authenticateToken, authorize } = require('../middlewares/authmiddleware');

// Solo soporte y admin pueden ver historial
router.get('/solicitudes/:id/historial', authenticateToken, authorize(['admin', 'soporte']), verHistorial);

module.exports = router;
