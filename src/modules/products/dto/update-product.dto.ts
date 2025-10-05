import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ example: 'uuid-de-subcategoria', description: 'ID de la subcategoría a la que pertenece el producto' })
  subcategoryId?: string;

  @ApiPropertyOptional({ example: ['uuid-extra1', 'uuid-extra2'], description: 'IDs de los extras asociados al producto' })
  extrasIds?: string[];
}
