import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExtraDto {
  @ApiProperty({ example: 'Queso extra', description: 'Nombre del extra' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 5.50, description: 'Precio adicional del extra' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
