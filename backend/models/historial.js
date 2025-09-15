const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Historial', {
    cambio: DataTypes.TEXT
  });
};
