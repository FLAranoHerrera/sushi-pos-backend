import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../roles/entities/roles.entity';
import { Order } from '../../orders/entities/order.entity';
import { AttendanceRecord } from '../../attendance/entities/attendance.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty( { example: 'prueba@mail.com', description: 'Email del usuario' } )
  email: string;

  @Column()
  @ApiProperty( { example: 'strongPassword123', description: 'Contraseña del usuario' } )
  password: string;

  @Column()
  @ApiProperty( { example: 'Juan Perez', description: 'Nombre completo del usuario' } )
  name: string;

  @Column({ nullable: true })
  @ApiProperty( { example: '+1234567890', description: 'Número de teléfono del usuario', required: false } )
  phone: string;

  @ManyToOne(() => Role, (role) => role.users)
  @ApiProperty({ type: () => Role, description: 'Rol asignado al usuario' })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => AttendanceRecord, (attendance) => attendance.employee)
  attendanceRecords: AttendanceRecord[];

   @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
