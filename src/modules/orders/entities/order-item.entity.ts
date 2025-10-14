import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';
import { Extra } from '../../extras/entities/extra.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_items')
export class OrderItem {
  @ApiProperty({ example: 'uuid generado automáticamente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Order, description: 'Orden a la que pertenece este item' })
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ApiProperty({ type: () => Product, description: 'Producto del item' })
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ApiProperty({ type: () => [Extra], description: 'Extras del item', required: false })
  @ManyToMany(() => Extra, { eager: true })
  @JoinTable({ name: 'order_item_extras' })
  extras: Extra[];

  @ApiProperty({ example: 2, description: 'Cantidad del producto' })
  @Column()
  quantity: number;

  @ApiProperty({ example: 129.00, description: 'Precio unitario del producto' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @ApiProperty({ example: 258.00, description: 'Subtotal del item (precio * cantidad + extras)' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ApiProperty({ example: 'Sin cebolla', description: 'Notas especiales para este item' })
  @Column({ nullable: true })
  notes: string;
}
