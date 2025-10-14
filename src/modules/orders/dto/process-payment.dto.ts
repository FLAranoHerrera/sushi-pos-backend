import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '../entities/order.entity';

export class ProcessPaymentDto {
  @ApiProperty({ 
    enum: PaymentMethod, 
    example: PaymentMethod.CASH, 
    description: 'Método de pago seleccionado' 
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 275.50, description: 'Monto total a pagar' })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiPropertyOptional({ example: 300.00, description: 'Monto recibido (para pago en efectivo)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  receivedAmount?: number;

  @ApiPropertyOptional({ example: 24.50, description: 'Cambio a devolver (para pago en efectivo)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  change?: number;

  @ApiPropertyOptional({ example: 'stripe_payment_intent_id', description: 'ID del payment intent de Stripe' })
  @IsString()
  @IsOptional()
  stripePaymentIntentId?: string;

  @ApiPropertyOptional({ example: 'card_ending_in_4242', description: 'Información de la tarjeta (para pagos con tarjeta)' })
  @IsString()
  @IsOptional()
  cardInfo?: string;
}
