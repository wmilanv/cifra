const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('cliente', 'soporte', 'admin')
  }, {
    hooks: {
      // beforeCreate: async (user) => {
      //   user.password = await bcrypt.hash(user.password, 10);
      // }
    }
  });

  return User;
};
