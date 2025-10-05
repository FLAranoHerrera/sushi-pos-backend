import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Nombre del rol. Debe ser único.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Administrador con acceso total al sistema',
    description: 'Descripción opcional del rol.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

