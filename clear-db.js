const { Client } = require('pg');
require('dotenv').config({ path: '.env.prod' });

async function clearDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos');

    // Limpiar todas las tablas
    await client.query('TRUNCATE TABLE "users" CASCADE');
    await client.query('TRUNCATE TABLE "roles" CASCADE');
    await client.query('TRUNCATE TABLE "products" CASCADE');
    await client.query('TRUNCATE TABLE "extras" CASCADE');
    await client.query('TRUNCATE TABLE "subcategories" CASCADE');
    await client.query('TRUNCATE TABLE "categories" CASCADE');
    await client.query('TRUNCATE TABLE "orders" CASCADE');
    await client.query('TRUNCATE TABLE "order_items" CASCADE');

    console.log('🧹 Base de datos limpiada');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

clearDatabase();
