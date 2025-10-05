import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'admin',
    description: 'Nuevo rol a asignar al usuario (por nombre)',
  })
  @IsOptional()
  @IsString()
  role?: string;
}
