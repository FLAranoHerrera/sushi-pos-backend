const { Client } = require('pg');
require('dotenv').config({ path: '.env.prod' });

async function checkUser() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos');

    // Verificar usuarios
    const usersResult = await client.query('SELECT id, email, name, "roleId" FROM users');
    console.log('👥 Usuarios en la base de datos:');
    console.log(usersResult.rows);

    // Verificar roles
    const rolesResult = await client.query('SELECT id, name FROM roles');
    console.log('🔑 Roles en la base de datos:');
    console.log(rolesResult.rows);

    // Verificar usuario específico
    const adminResult = await client.query('SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u."roleId" = r.id WHERE u.email = $1', ['admin@sushi.com']);
    console.log('👤 Usuario admin:');
    console.log(adminResult.rows);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkUser();
