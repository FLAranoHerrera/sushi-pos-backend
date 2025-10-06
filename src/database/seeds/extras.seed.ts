import { DataSource } from 'typeorm';
import { Extra } from '../../modules/extras/entities/extra.entity';
import { Category } from '../../modules/categories/entities/category.entity';

export const seedExtras = async (dataSource: DataSource, categories: Category[]) => {
  const extraRepo = dataSource.getRepository(Extra);
  const categoryRepo = dataSource.getRepository(Category);

  const count = await extraRepo.count();
  if (count > 0) {
    console.log('⚠️ Extras ya existen, se omite seeder.');
    return await extraRepo.find();
  }

  const extrasCategory = categories.find(c => c.name === 'Extras');
  if (!extrasCategory) {
    console.error('❌ No se encontró la categoría "Extras"');
    return;
  }

  const extrasData = [
    {
      name: 'Pasta ramen extra',
      price: 38,
      stock: 20,
    },
    {
      name: 'Salsa Picante',
      price: 15,
      stock: 20,
    },
    {
      name: 'Aderezo tampico extra',
      price: 35,
      stock: 20,
    },
    {
      name: 'Entrenador de palillos',
      price: 20,
      stock: 20,
    },
  ];

  const extras = extrasData.map(data => {
    const extra = extraRepo.create(data);
    return extra;
  });

  await extraRepo.save(extras);
  console.log('✅ Extras seeded');

  return extras;
};
