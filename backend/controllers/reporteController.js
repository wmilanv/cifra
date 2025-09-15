const { Solicitud } = require('../models');

exports.resumenSolicitudes = async (req, res) => {
  try {
    const estados = ['abierta', 'en_proceso', 'cerrada'];
    const resumen = {};

    for (const estado of estados) {
      const count = await Solicitud.count({ where: { estado } });
      resumen[estado] = count;
    }

    res.json(resumen);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generando el reporte' });
  }
};
