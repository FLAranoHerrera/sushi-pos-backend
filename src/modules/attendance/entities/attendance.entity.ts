import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum AttendanceStatus {
  ON_TIME = 'on_time',
  LATE = 'late',
  ABSENT = 'absent',
  EXTRA_HOURS = 'extra_hours'
}

@Entity('attendance_records')
@Index(['employee', 'date'], { unique: true }) // Evitar duplicados por día
export class AttendanceRecord {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único del registro de asistencia' })
  id: string;

  @ManyToOne(() => User, (user) => user.attendanceRecords, { eager: true })
  @ApiProperty({ description: 'Empleado asociado al registro' })
  employee: User;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación del registro' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ description: 'Hora de entrada', required: false })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ description: 'Hora de salida', required: false })
  checkOut: Date;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  @ApiProperty({ description: 'Horas trabajadas', required: false })
  workedHours: number;

  @Column({ 
    type: 'enum', 
    enum: AttendanceStatus, 
    default: AttendanceStatus.ON_TIME 
  })
  @ApiProperty({ 
    description: 'Estado de la asistencia',
    enum: AttendanceStatus,
    example: AttendanceStatus.ON_TIME
  })
  status: AttendanceStatus;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Notas adicionales', required: false })
  notes: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;
}
