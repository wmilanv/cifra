const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Solicitud', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM('abierta', 'en_proceso', 'cerrada'),
      defaultValue: 'abierta'
    },
    respuesta: DataTypes.TEXT
  });
};
