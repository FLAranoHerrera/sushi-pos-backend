import { IsNumber, IsString, IsOptional, IsObject, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty({ example: 250.50, description: 'Monto a pagar' })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiPropertyOptional({ example: 'mxn', description: 'Moneda del pago', default: 'mxn' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({ example: 'ORD-2024-001', description: 'Número de orden' })
  @IsString()
  @IsOptional()
  orderNumber?: string;

  @ApiPropertyOptional({ example: { tableNumber: 'Mesa 5' }, description: 'Metadatos adicionales' })
  @IsObject()
  @IsOptional()
  metadata?: any;
}
