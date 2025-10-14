import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  DIGITAL = 'digital',
  MIXED = 'mixed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Entity('orders')
export class Order {
  @ApiProperty({ example: 'uuid generado automáticamente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => User, description: 'Usuario que realizó la orden' })
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ApiProperty({ type: () => [OrderItem], description: 'Items de la orden' })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items: OrderItem[];

  @ApiProperty({ example: 250.50, description: 'Total de la orden' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ApiProperty({ example: 25.00, description: 'Propina (opcional)' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tip: number;

  @ApiProperty({ example: 275.50, description: 'Total final incluyendo propina' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  finalTotal: number;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING, description: 'Estado de la orden' })
  @Column({ 
    type: 'enum', 
    enum: OrderStatus, 
    default: OrderStatus.PENDING 
  })
  status: OrderStatus;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CASH, description: 'Método de pago' })
  @Column({ 
    type: 'enum', 
    enum: PaymentMethod, 
    default: PaymentMethod.CASH 
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING, description: 'Estado del pago' })
  @Column({ 
    type: 'enum', 
    enum: PaymentStatus, 
    default: PaymentStatus.PENDING 
  })
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: 'ORD-2024-001', description: 'Número de orden legible' })
  @Column({ unique: true })
  orderNumber: string;

  @ApiProperty({ example: 'Mesa 5', description: 'Número de mesa (opcional)' })
  @Column({ nullable: true })
  tableNumber: string;

  @ApiProperty({ example: 'Sin cebolla', description: 'Notas especiales de la orden' })
  @Column({ nullable: true })
  notes: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
