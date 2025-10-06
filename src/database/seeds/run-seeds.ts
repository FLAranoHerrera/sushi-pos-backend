import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '../../config/orm.config';
import { seedRoles } from './roles.seed';
import { seedCategoriesAndSubcategories } from './categories-and-subcategories.seed';
import { seedProducts } from './product.seed';
import { seedExtras } from './extras.seed';
import { seedMerchandising } from './merchandising.seed';

async function runSeeds() {
  const configService = new ConfigService();
  const dataSource = new DataSource(typeOrmConfig(configService));

  await dataSource.initialize();
  console.log('💾 Conectado a la base de datos');

  try {
  
    const { categories, subcategories } = await seedCategoriesAndSubcategories(dataSource);
    console.log('✅ Categorías y Subcategorías insertadas');

   
    await seedProducts(dataSource, subcategories, categories);
    console.log('✅ Productos insertados');

  
    await seedExtras(dataSource, categories);
    console.log('✅ Extras insertados');

   
    await seedMerchandising(dataSource, categories);
    console.log('✅ Merchandising insertado');

     await seedRoles(dataSource);
    console.log('✅ Roles insertados');

    console.log('🎉 Todos los seeders se ejecutaron exitosamente');
  } catch (err) {
    console.error('❌ Error ejecutando seeders:', err);
  } finally {
    await dataSource.destroy();
    console.log('🔒 Conexión cerrada');
  }
}

runSeeds();
