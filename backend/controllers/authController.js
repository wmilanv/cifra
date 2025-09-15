const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('🟡 Intentando login con:', email, password);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('🔴 Usuario no encontrado para el email:', email);
      return res.status(400).json({ message: 'Login incorrecto' });
    }

    const passwordValida = await bcrypt.compare(password, user.password);

    if (!passwordValida) {
      console.log('🔴 Contraseña incorrecta para usuario:', email);
      return res.status(400).json({ message: 'Login incorrecto' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('✅ Login exitoso:', user.email);
    res.json({ token });
  } catch (err) {
    console.error('❌ Error durante login:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
