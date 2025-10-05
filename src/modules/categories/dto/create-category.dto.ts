import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Bebidas', description: 'Nombre de la categoría' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
