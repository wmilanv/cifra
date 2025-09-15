const express = require('express');
const router = express.Router();
const { resumenSolicitudes } = require('../controllers/reporteController');
const { authenticateToken, authorize } = require('../middlewares/authmiddleware'); // nombres correctos

router.get('/solicitudes', authenticateToken, authorize('admin'), resumenSolicitudes);

module.exports = router;
