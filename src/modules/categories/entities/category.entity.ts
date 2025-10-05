import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 'uuid generado automáticamente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Alimentos', description: 'Nombre de la categoría' })
  @Column()
  name: string;

  @OneToMany(() => Subcategory, (sub) => sub.category, { cascade: true })
  subcategories: Subcategory[];
}
