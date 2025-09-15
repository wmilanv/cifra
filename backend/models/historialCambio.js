module.exports = (sequelize, DataTypes) => {
  const HistorialCambio = sequelize.define('HistorialCambio', {
    solicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estadoAnterior: {
      type: DataTypes.STRING,
    },
    estadoNuevo: {
      type: DataTypes.STRING,
    },
    respuestaAnterior: {
      type: DataTypes.TEXT,
    },
    respuestaNueva: {
      type: DataTypes.TEXT,
    },
  });

  HistorialCambio.associate = (models) => {
    HistorialCambio.belongsTo(models.Solicitud, { foreignKey: 'solicitudId' });
    HistorialCambio.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
  };

  return HistorialCambio;
};
