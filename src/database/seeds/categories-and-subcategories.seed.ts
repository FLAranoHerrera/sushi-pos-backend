import { DataSource } from 'typeorm';
import { Category } from '../../modules/categories/entities/category.entity';
import { Subcategory } from '../../modules/subcategories/entities/subcategory.entity';

export const seedCategoriesAndSubcategories = async (dataSource: DataSource) => {
  const categoryRepo = dataSource.getRepository(Category);
  const subcategoryRepo = dataSource.getRepository(Subcategory);

  console.log('🔄 Insertando categorías...');

  // Verificar si ya existen categorías
  const existingCategories = await categoryRepo.find();
  if (existingCategories.length > 0) {
    console.log('⚠️ Categorías ya existen, se omite seeder.');
    return { categories: existingCategories, subcategories: [] };
  }

  // Crear categorías
  const categories = categoryRepo.create([
    { name: 'Alimentos' },
    { name: 'Extras' },
    { name: 'Merchandising' },
  ]);
  await categoryRepo.save(categories);

  // Crear subcategorías solo para Alimentos
  const alimentosCategory = categories.find(c => c.name === 'Alimentos')!;
  const subcategories = subcategoryRepo.create([
    { name: 'Ramen', category: alimentosCategory },
    { name: 'Sushi', category: alimentosCategory },
    { name: 'Entradas', category: alimentosCategory },
    { name: 'Dulces y Botanas', category: alimentosCategory },
  ]);
  await subcategoryRepo.save(subcategories);

  console.log('✅ Categorías y subcategorías seeded');
  return { categories, subcategories };
};
