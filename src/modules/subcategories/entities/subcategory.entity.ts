import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subcategories')
export class Subcategory {
  @ApiProperty({ example: 'uuid generado automáticamente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Ramen', description: 'Una descripcion' })
  @Column()
  name: string;

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.subcategories, { nullable: false, eager: true })
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];
}
