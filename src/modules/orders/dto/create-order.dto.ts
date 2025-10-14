import { IsArray, IsOptional, IsString, IsNumber, IsEnum, ValidateNested, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '../entities/order.entity';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'uuid-del-producto', description: 'ID del producto' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 2, description: 'Cantidad del producto' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: ['uuid-extra-1', 'uuid-extra-2'], description: 'IDs de los extras', type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  extraIds?: string[];

  @ApiPropertyOptional({ example: 'Sin cebolla', description: 'Notas especiales para este item' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-del-usuario', description: 'ID del usuario que realiza la orden' })
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    type: [CreateOrderItemDto], 
    description: 'Items de la orden' 
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ 
    enum: PaymentMethod, 
    example: PaymentMethod.CASH, 
    description: 'Método de pago' 
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ example: 25.00, description: 'Propina (opcional)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  tip?: number;

  @ApiPropertyOptional({ example: 'Mesa 5', description: 'Número de mesa' })
  @IsString()
  @IsOptional()
  tableNumber?: string;

  @ApiPropertyOptional({ example: 'Sin cebolla en el sushi', description: 'Notas especiales de la orden' })
  @IsString()
  @IsOptional()
  notes?: string;
}
