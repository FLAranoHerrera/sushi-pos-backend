import { DataSource } from 'typeorm';
import { Product } from '../../modules/products/entities/product.entity';
import { Category } from '../../modules/categories/entities/category.entity';

interface MerchSeed {
  name: string;
  price: number;
  stock: number;
  category: Category;
}

export const seedMerchandising = async (
  dataSource: DataSource,
  categories: Category[],
) => {
  const productRepo = dataSource.getRepository(Product);

  const merchCategory = categories.find(c => c.name === 'Merchandising')!;
  
  // Contamos solo los productos de la categoría Merchandising
  const count = await productRepo.count({ where: { category: { id: merchCategory.id } } });
  if (count > 0) {
    console.log('⚠️ Productos de la categoría Merchandising ya existen, se omite seeder.');
    return productRepo.find({ where: { category: { id: merchCategory.id } } });
  }

  const merchData: MerchSeed[] = [
    { name: 'Playera blanca Ch.', price: 290, stock: 20, category: merchCategory },
    { name: 'Playera blanca M.', price: 290, stock: 20, category: merchCategory },
    { name: 'Playera blanca L.', price: 290, stock: 20, category: merchCategory },
    { name: 'Playera blanca XL.', price: 290, stock: 20, category: merchCategory },
  ];

  const merch = productRepo.create(merchData);
  await productRepo.save(merch);

  console.log('✅ Merchandising seeded');
  return merch;
};
