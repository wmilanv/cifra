// backend/seed.js

const { User, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Limpia y recrea las tablas (opcional pero útil en dev)

    const users = [
      { name: 'Admin', email: 'admin@test.com', password: '123456', role: 'admin' },
      { name: 'Soporte', email: 'soporte@test.com', password: '123456', role: 'soporte' },
      { name: 'Cliente', email: 'cliente@test.com', password: '123456', role: 'cliente' },
    ];

    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.findOrCreate({
        where: { email: u.email },
        defaults: {
          name: u.name,
          password: hashedPassword,
          role: u.role
        }
      });
    }

    console.log('✅ Usuarios insertados correctamente.');
    process.exit();
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error);
    process.exit(1);
  }
}

seed();
