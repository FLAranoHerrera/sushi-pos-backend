import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Role } from '../../modules/roles/entities/roles.entity';
import * as bcrypt from 'bcryptjs';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);

  // Siempre insertar usuario admin
  console.log('🔄 Insertando usuario administrador...');

  // Buscar el rol ADMIN
  const adminRole = await roleRepository.findOne({ where: { name: 'ADMIN' } });
  if (!adminRole) {
    console.log('❌ Rol ADMIN no encontrado. Ejecuta primero el seeder de roles.');
    return;
  }

  // Verificar si el usuario ya existe
  const existingAdmin = await userRepository.findOne({ 
    where: { email: 'admin@sushi.com' },
    relations: ['role']
  });

  if (existingAdmin) {
    console.log('⚠️ Usuario admin ya existe, se omite seeder.');
    return existingAdmin;
  }

  // Crear usuario admin
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const adminUser = userRepository.create({
    name: process.env.ADMIN_NAME || 'Administrador',
    email: process.env.ADMIN_EMAIL || 'admin@sushi.com',
    password: hashedPassword,
    phone: process.env.ADMIN_PHONE || '123456789',
    role: adminRole,
  });

  const savedUser = await userRepository.save(adminUser);
  console.log('✅ Usuario administrador creado:', savedUser.id);
  return savedUser;
};
