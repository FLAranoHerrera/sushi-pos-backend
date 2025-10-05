import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty({ example: 'Sodas', description: 'Nombre de la subcategoría' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'uuid-de-categoría', description: 'ID de la categoría a la que pertenece' })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
