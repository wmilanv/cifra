const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol'],
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al listar usuarios' });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const existente = await Usuario.findOne({ where: { email } });
    if (existente) return res.status(400).json({ message: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash, rol });
    res.status(201).json({ message: 'Usuario creado', id: usuario.id });
  } catch (err) {
     console.error('❌ Error al crear usuario:', err);
    res.status(500).json({ message: 'Error al crear usuario', error: err.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    await usuario.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
