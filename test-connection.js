const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conexión a Neon exitosa!');
    
    const result = await client.query('SELECT version();');
    console.log('📊 Versión de PostgreSQL:', result.rows[0].version);
    
    await client.end();
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

testConnection();
