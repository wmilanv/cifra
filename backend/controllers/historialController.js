const { HistorialCambio, Usuario } = require('../models');

exports.verHistorial = async (req, res) => {
  const { id } = req.params;

  try {
    const historial = await HistorialCambio.findAll({
      where: { solicitudId: id },
      include: [
        { model: Usuario, attributes: ['id', 'nombre', 'rol'] }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(historial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo historial' });
  }
};
