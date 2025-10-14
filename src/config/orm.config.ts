import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../modules/roles/entities/roles.entity';
import { Product } from '../modules/products/entities/product.entity';
import { Order } from '../modules/orders/entities/order.entity';
import { OrderItem } from '../modules/orders/entities/order-item.entity';
import { Subcategory } from '../modules/subcategories/entities/subcategory.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Extra } from '../modules/extras/entities/extra.entity';

export const typeOrmConfig = (configService: ConfigService): DataSourceOptions => {
  // Verificar si tenemos DATABASE_URL (connection string) o variables individuales
  const databaseUrl = configService.get<string>('DATABASE_URL');
  
  if (databaseUrl) {
    // Usar connection string (recomendado para Neon)
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [User, Role, Product, Order, OrderItem, Subcategory, Category, Extra],
      synchronize: configService.get<string>('NODE_ENV') === 'development',
      logging: configService.get<string>('NODE_ENV') === 'development' ? ['query', 'error', 'schema'] : ['error'],
      logger: 'advanced-console',
      ssl: {
        rejectUnauthorized: false,
      },
    };
  } else {
    // Fallback a variables individuales (para desarrollo local)
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [User, Role, Product, Order, OrderItem, Subcategory, Category, Extra],
      synchronize: configService.get<string>('NODE_ENV') === 'development',
      logging: configService.get<string>('NODE_ENV') === 'development' ? ['query', 'error', 'schema'] : ['error'],
      logger: 'advanced-console',
      ssl: false, // No SSL para desarrollo local
    };
  }
};
