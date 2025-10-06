import { DataSource } from 'typeorm';
import { Role } from '../../modules/roles/entities/roles.entity';

export const seedRoles = async (dataSource: DataSource) => {
  const rolesRepository = dataSource.getRepository(Role);

  const rolesData = [
    { name: 'ADMIN', description: 'Administrador del sistema' },
    { name: 'USER', description: 'Usuario regular' },
    { name: 'MESERO', description: 'Mesero del restaurante' },
  ];

  const existingRoles = await rolesRepository.find();
  if (existingRoles.length === rolesData.length) {
    console.log('⚠️ Roles ya existen, se omite seeder.');
    return existingRoles;
  }

  const roles: Role[] = [];
  for (const roleData of rolesData) {
    let role = await rolesRepository.findOne({ where: { name: roleData.name } });
    if (!role) {
      role = rolesRepository.create(roleData);
      await rolesRepository.save(role);
    }
    roles.push(role);
  }

  console.log('✅ Roles seeded');
  return roles;
};

