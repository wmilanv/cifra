const express = require('express');
const router = express.Router();
const controller = require('../controllers/solicitudController');
 const { authenticateToken }  = require('../middlewares/authmiddleware');
const authorize = require('../middlewares/roleMiddleware');

// router.use(auth);
router.use(authenticateToken); 
router.post('/', authorize(['cliente']), controller.crear);
router.get('/', controller.listar);
router.put('/:id', authorize(['soporte', 'admin']), controller.actualizar);
router.get('/reportes/estado', authorize(['admin']), controller.reporte);

module.exports = router;
