const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runAttendanceMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });

  try {
    console.log('🔗 Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conectado exitosamente');

    // Leer el archivo SQL
    const migrationPath = path.join(__dirname, 'src/database/migrations/001-create-attendance-table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Ejecutando migración de attendance_records...');
    await client.query(migrationSQL);
    console.log('✅ Migración ejecutada exitosamente');

    // Verificar que la tabla se creó
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'attendance_records'
    `);
    
    if (result.rows.length > 0) {
      console.log('✅ Tabla attendance_records creada correctamente');
    } else {
      console.log('❌ Error: La tabla no se creó');
    }

  } catch (error) {
    console.error('❌ Error ejecutando migración:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Conexión cerrada');
  }
}

runAttendanceMigration();
