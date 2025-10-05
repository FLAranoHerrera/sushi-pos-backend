import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Extra } from '../../extras/entities/extra.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 'f3d6a43b-9f41-4d23-9b8b-2a8b3e49b8a1' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Sushi Especial', description: 'Nombre del producto' })
  @Column()
  name: string;

  @ApiProperty({ example: 180, description: 'Precio del producto' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ example: 25, description: 'Cantidad disponible en stock' })
  @Column({ type: 'int'})
  stock: number;

  @ApiPropertyOptional({ example: 'Rollo de sushi con salmón y aguacate', description: 'Descripción del producto' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: true, description: 'Indica si el producto está disponible para venta' })
  @Column({ default: true })
  available: boolean;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/v123456/sushi.jpg', description: 'URL de imagen del producto' })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ type: () => Subcategory, description: 'Subcategoría a la que pertenece el producto' })
  @ManyToOne(() => Subcategory, (sub) => sub.products, { eager: true, nullable: false })
  subcategory: Subcategory;

  @ApiProperty({ type: () => [Extra], description: 'Extras asociados al producto', required: false })
  @ManyToMany(() => Extra, (extra) => extra.products, { eager: true, cascade: true })
  @JoinTable({ name: 'products_extras' })
  extras: Extra[];

  @ApiProperty({ example: '2025-10-05T22:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-10-05T22:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
