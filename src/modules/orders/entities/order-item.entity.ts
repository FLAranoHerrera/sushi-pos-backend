import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';
import { Extra } from '../../extras/entities/extra.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToMany(() => Extra)
  @JoinTable({ name: 'order_item_extras' })
  extras: Extra[];

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}
