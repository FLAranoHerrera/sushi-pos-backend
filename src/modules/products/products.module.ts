import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Extra } from '../extras/entities/extra.entity';
import { CloudinaryService } from '../../common/services/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Subcategory, Extra]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService],
  exports: [ProductsService],
})
export class ProductsModule {}
