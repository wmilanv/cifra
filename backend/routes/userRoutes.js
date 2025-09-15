const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  crearUsuario,
  eliminarUsuario,
} = require('../controllers/userController');
const { authenticateToken, authorize } = require('../middlewares/authmiddleware');

// Solo admin puede gestionar usuarios
router.get('/', authenticateToken, authorize(['admin']), listarUsuarios);
router.post('/', authenticateToken, authorize(['admin']), crearUsuario);
router.delete('/:id', authenticateToken, authorize(['admin']), eliminarUsuario);

module.exports = router;
