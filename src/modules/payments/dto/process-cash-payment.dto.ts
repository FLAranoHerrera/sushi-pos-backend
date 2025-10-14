import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProcessCashPaymentDto {
  @ApiProperty({ example: 250.50, description: 'Monto total a pagar' })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 300.00, description: 'Monto recibido del cliente' })
  @IsNumber()
  @Min(0.01)
  receivedAmount: number;

  @ApiPropertyOptional({ example: 49.50, description: 'Cambio a devolver (calculado automáticamente si no se proporciona)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  change?: number;
}
