const { Solicitud, Historial, User } = require('../models');

exports.crear = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ message: 'Título y descripción son requeridos' });
    }

    console.log('🟡 Usuario autenticado:', req.user?.id);

    const nueva = await Solicitud.create({
      titulo,
      descripcion,
      estado: 'abierta',
      clienteId: req.user.id,  // asegurarse de que req.user existe
    });

    console.log('✅ Solicitud creada:', nueva.id);
    res.status(201).json(nueva);
  } catch (error) {
    console.error('❌ Error al crear solicitud:', error);
    res.status(500).json({ message: 'Error al crear solicitud', error: error.message });
  }
};

exports.listar = async (req, res) => {
  let where = {};
  if (req.user.role === 'cliente') where.clienteId = req.user.id;
  if (req.user.role === 'soporte') where.soporteId = req.user.id;
  const solicitudes = await Solicitud.findAll({ where });
  res.json(solicitudes);
};

exports.actualizar = async (req, res) => {
  const solicitud = await Solicitud.findByPk(req.params.id);
  if (!solicitud) return res.status(404).json({ error: 'No encontrada' });

  const { estado, respuesta } = req.body;
  solicitud.estado = estado ?? solicitud.estado;
  solicitud.respuesta = respuesta ?? solicitud.respuesta;
  solicitud.soporteId = solicitud.soporteId ?? req.user.id;

  await solicitud.save();

  await Historial.create({
    solicitudId: solicitud.id,
    usuarioId: req.user.id,
    cambio: `Estado actualizado a ${solicitud.estado}`
  });

  res.json(solicitud);
};

exports.reporte = async (req, res) => {
  const estados = ['abierta', 'en_proceso', 'cerrada'];
  const resumen = {};
  for (const estado of estados) {
    resumen[estado] = await Solicitud.count({ where: { estado } });
  }
  res.json(resumen);
};
