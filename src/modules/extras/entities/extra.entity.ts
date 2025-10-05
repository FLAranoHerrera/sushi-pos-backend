import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('extras')
export class Extra {
  @ApiProperty({ example: 'uuid generado automáticamente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Aderezo extra', description: 'Descripción del extra' })
  @Column()
  name: string;

  @ApiProperty({ example: 5.50, description: 'Precio adicional del extra' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Product, (product) => product.extras)
  products: Product[];
}
