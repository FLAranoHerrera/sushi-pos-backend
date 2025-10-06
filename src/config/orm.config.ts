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

export const typeOrmConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Role, Product, Order, OrderItem, Subcategory, Category, Extra],
  synchronize: true,
  logging: ['query', 'error', 'schema'],
  logger: 'advanced-console',
});
