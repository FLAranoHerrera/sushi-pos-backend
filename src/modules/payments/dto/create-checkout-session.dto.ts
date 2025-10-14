import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LineItemDto {
  @ApiProperty({ example: 'Sushi Especial', description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2, description: 'Cantidad' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 129.00, description: 'Precio unitario' })
  @IsNumber()
  @Min(0.01)
  price: number;
}

export class CreateCheckoutSessionDto {
  @ApiProperty({ 
    type: [LineItemDto], 
    description: 'Items de la orden' 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];

  @ApiProperty({ example: 'https://tu-sitio.com/success', description: 'URL de éxito' })
  @IsString()
  successUrl: string;

  @ApiProperty({ example: 'https://tu-sitio.com/cancel', description: 'URL de cancelación' })
  @IsString()
  cancelUrl: string;

  @ApiPropertyOptional({ example: 'ORD-2024-001', description: 'Número de orden' })
  @IsString()
  @IsOptional()
  orderNumber?: string;

  @ApiPropertyOptional({ example: { tableNumber: 'Mesa 5' }, description: 'Metadatos adicionales' })
  @IsOptional()
  metadata?: any;
}
