import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'admin', description: 'Nombre del rol' })
  name: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'Administrador del sistema', description: 'Descripción del rol' })
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  @ApiProperty({ type: () => [User], description: 'Usuarios que tienen este rol', required: false })
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
