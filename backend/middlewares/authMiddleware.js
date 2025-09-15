const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');

// Middleware para verificar el token JWT
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Carga el usuario y su rol
    const user = await Usuario.findByPk(decoded.id, {
      include: { model: Rol, as: 'rol' }
    });

    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Middleware para verificar roles
function authorize(...allowedRoles) {
  return (req, res, next) => {
    const rolNombre = req.user?.rol?.nombre;
    if (!rolNombre || !allowedRoles.includes(rolNombre)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorize,
};
