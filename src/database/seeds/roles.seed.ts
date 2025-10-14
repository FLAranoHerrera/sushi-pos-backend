import { DataSource } from 'typeorm';
import { Role } from '../../modules/roles/entities/roles.entity';

export const seedRoles = async (dataSource: DataSource) => {
  const rolesRepository = dataSource.getRepository(Role);

  const rolesData = [
    { name: 'ADMIN', description: 'Administrador del sistema - Acceso completo' },
    { name: 'MESERO', description: 'Mesero del restaurante - POS y órdenes' },
  ];

  console.log('🔄 Insertando roles...');

  // Verificar si ya existen roles
  const existingRoles = await rolesRepository.find();
  if (existingRoles.length > 0) {
    console.log('⚠️ Roles ya existen, se omite seeder.');
    return existingRoles;
  }

  const roles: Role[] = [];
  for (const roleData of rolesData) {
    const role = rolesRepository.create(roleData);
    await rolesRepository.save(role);
    roles.push(role);
  }

  console.log('✅ Roles seeded');
  return roles;
};

