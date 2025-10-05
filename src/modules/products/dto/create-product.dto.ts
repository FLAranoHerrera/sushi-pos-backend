import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsUUID, Min, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Sushi Especial', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 180, description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 25, description: 'Cantidad disponible en stock' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ example: 'Rollo de sushi con salmón y aguacate', description: 'Descripción del producto' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true, description: 'Indica si el producto está disponible para venta' })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/v123456/sushi.jpg', description: 'URL de imagen del producto' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'ID de subcategoría', description: 'ID de la subcategoría a la que pertenece el producto' })
  @IsUUID()
  subcategoryId: string;

  @ApiPropertyOptional({ example: ['ID de los extras'], description: 'IDs de los extras asociados al producto' })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  extrasIds?: string[];
}
