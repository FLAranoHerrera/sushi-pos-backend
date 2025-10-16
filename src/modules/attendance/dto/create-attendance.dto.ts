import { IsUUID, IsOptional, IsDateString, IsEnum, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../entities/attendance.entity';

export class CreateAttendanceDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ 
    description: 'ID del empleado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  employeeId: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Hora de entrada (ISO string)',
    example: '2024-01-15T08:00:00.000Z',
    required: false
  })
  checkIn?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Hora de salida (ISO string)',
    example: '2024-01-15T17:00:00.000Z',
    required: false
  })
  checkOut?: string;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  @ApiProperty({ 
    description: 'Estado de la asistencia',
    enum: AttendanceStatus,
    example: AttendanceStatus.ON_TIME,
    required: false
  })
  status?: AttendanceStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty({ 
    description: 'Notas adicionales',
    example: 'Entrada tardía por tráfico',
    required: false,
    maxLength: 500
  })
  notes?: string;
}

export class UpdateAttendanceDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Hora de entrada (ISO string)',
    example: '2024-01-15T08:00:00.000Z',
    required: false
  })
  checkIn?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ 
    description: 'Hora de salida (ISO string)',
    example: '2024-01-15T17:00:00.000Z',
    required: false
  })
  checkOut?: string;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  @ApiProperty({ 
    description: 'Estado de la asistencia',
    enum: AttendanceStatus,
    example: AttendanceStatus.ON_TIME,
    required: false
  })
  status?: AttendanceStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty({ 
    description: 'Notas adicionales',
    example: 'Entrada tardía por tráfico',
    required: false,
    maxLength: 500
  })
  notes?: string;
}
