import { DataSource } from 'typeorm';
import { Product } from '../../modules/products/entities/product.entity';
import { Subcategory } from '../../modules/subcategories/entities/subcategory.entity';
import { Category } from 'src/modules/categories/entities/category.entity';

interface ProductSeed {
  name: string;
  price: number;
  stock: number;
  description?: string;
  subcategory: Subcategory;
  category: Category;
  imageUrl?: string;
}

export const seedProducts = async (
  dataSource: DataSource,
  subcategories: Subcategory[],
  categories: Category[],
) => {
  const productRepo = dataSource.getRepository(Product);
  const subcategoryNames = ['Ramen', 'Sushi', 'Entradas', 'Dulces y Botanas'];
  const alimentosCategory = categories.find(c => c.name === 'Alimentos');
  if (!alimentosCategory) throw new Error('❌ No se encontró la categoría: Alimentos');

  const subcategoriesMap: Record<string, Subcategory> = {};

  // Validamos que todas las subcategorías existan
  for (const name of subcategoryNames) {
    const sub = subcategories.find(s => s.name === name);
    if (!sub) throw new Error(`❌ No se encontró la subcategoría: ${name}`);
    subcategoriesMap[name] = sub;
  }

  // Revisamos si hay productos en estas subcategorías
  const existingProducts = await productRepo.find({
    where: Object.values(subcategoriesMap).map(sub => ({ subcategory: { id: sub.id } })),
  });

  if (existingProducts.length > 0) {
    console.log('⚠️ Algunos productos ya existen en la base de datos, se omite seeder.');
    return existingProducts;
  }

  const productsData: ProductSeed[] = [
    // Ramen
    {
      name: 'Ramen Tonkotsu',
      price: 185,
      stock: 20,
      description: 'Bowl de caldo de cerdo cremoso con miso y soya, fideos japoneses, huevo hervido marinado, cebollin, papa tempura frita, lonjas de lomo de cerdo marinado, aceite de ajo rostizado y naruto.',
      subcategory: subcategoriesMap['Ramen'],
      category: alimentosCategory,
    },
    {
      name: 'Ramen Tantanmen',
      price: 195,
      stock: 20,
      description: 'Bowl de caldo de cerdo cremoso con miso, soya y tahini, naruto maki, fideos japoneses, huevo hervido marinado, cebollin, carne picada de cerdo especial, granos de elote y aceite aromático de chiles hechos en casa.',
      subcategory: subcategoriesMap['Ramen'],
      category: alimentosCategory,
    },
    // Sushi
    {
      name: 'California Roll',
      price: 129,
      stock: 20,
      description: 'Surimi, queso crema y pepino por dentro, ajonjolí por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    {
      name: 'Golden Roll',
      price: 144,
      stock: 20,
      description: 'Surimi, queso crema y pepino por dentro, empanizado crujiente por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    {
      name: 'Banana Roll',
      price: 144,
      stock: 20,
      description: 'Surimi, queso crema y pepino por dentro, platano macho frito, salsa de anguila y ajonjolí por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    {
      name: 'Culichi Roll',
      price: 235,
      stock: 20,
      description: 'Rollo extra grande con camarón empanizado, carne de res, aguacate y queso manchego por dentro, aderezo tampico, salsa de anguila, mayonesa picante, furikake y cebollin por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    {
      name: 'Ebi Roll',
      price: 169,
      stock: 20,
      description: 'Camarón empanizado, aguacate y queso crema por dentro, aderezo tampico, salsa de anguila, furikake y cebollin por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    {
      name: 'Especial Empanizado',
      price: 169,
      stock: 20,
      description: 'Surimi, aguacate y queso manchego por dentro, empanizado crujiente pieza por pieza y mayonesa picante por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    {
      name: 'Nori Roll',
      price: 139,
      stock: 20,
      description: 'Atún, surimi y queso crema por dentro, alga nori por fuera.',
      subcategory: subcategoriesMap['Sushi'],
      category: alimentosCategory,
    },
    // Entradas
    {
      name: 'Edamames',
      price: 89,
      stock: 20,
      description: 'Vainas de frijol de soja a la plancha con un toque picante.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    {
      name: 'Goldigiris',
      price: 139,
      stock: 20,
      description: '5 bolas de arroz rellenas de queso crema, tampico y queso manchego empanizadas con panko.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    {
      name: 'Onigiris',
      price: 119,
      stock: 20,
      description: '2 piezas de arroz en forma de triángulo envuelto en alga nori, relleno de queso crema y aderezo tampico.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    {
      name: 'Gohan Tampico',
      price: 110,
      stock: 20,
      description: 'Tazón de arroz coronado con aderezo tampico y furikake.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    {
      name: 'Kushiagues de queso',
      price: 139,
      stock: 20,
      description: '3 piezas de queso empanizadas acompañado de aderezo picante y salsa de anguila dulce.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    {
      name: 'Gyozas',
      price: 120,
      stock: 20,
      description: '8 empanadillas de harina fritas, rellenas con carne molida de cerdo.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    {
      name: 'Yakimeshi de Res',
      price: 175,
      stock: 20,
      description: 'Arroz a la plancha con verduras de temporada y carne de res, sazonada con salsas orientales.',
      subcategory: subcategoriesMap['Entradas'],
      category: alimentosCategory,
    },
    // Dulces y botanas
    {
      name: 'Pockys de chocolate 70 grs',
      price: 89,
      stock: 20,
      description: 'Palitos de galleta cubiertos de chocolate (producto importado de Japón)',
      subcategory: subcategoriesMap['Dulces y Botanas'],
      category: alimentosCategory,
    },
    {
      name: 'Galleta de la fortuna extra',
      price: 4,
      stock: 20,
      description: 'Galleta crujiente y delgada con un mensaje escrito en un papel en su interior.',
      subcategory: subcategoriesMap['Dulces y Botanas'],
      category: alimentosCategory,
    },
  ];

  const products = productRepo.create(productsData);
  await productRepo.save(products);

  console.log('✅ Products seeded');
  return products;
};
