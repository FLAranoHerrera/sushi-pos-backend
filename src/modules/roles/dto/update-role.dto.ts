import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({ example: 'Nuevo nombre del rol', description: 'Nombre actualizado del rol.' })
  name?: string;

  @ApiPropertyOptional({ example: 'Descripción actualizada', description: 'Descripción del rol actualizada.' })
  description?: string;
}
