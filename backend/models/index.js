const sequelize = require('../config/db');

const User = require('./user')(sequelize);
const Solicitud = require('./solicitud')(sequelize);
const Historial = require('./historial')(sequelize);

// Relaciones
User.hasMany(Solicitud, { foreignKey: 'clienteId' });
User.hasMany(Solicitud, { foreignKey: 'soporteId' });
Solicitud.belongsTo(User, { as: 'cliente', foreignKey: 'clienteId' });
Solicitud.belongsTo(User, { as: 'soporte', foreignKey: 'soporteId' });

Solicitud.hasMany(Historial, { foreignKey: 'solicitudId' });
Historial.belongsTo(User, { foreignKey: 'usuarioId' });

module.exports = {
  sequelize,
  User,
  Solicitud,
  Historial
};
