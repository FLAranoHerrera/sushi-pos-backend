import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Francisco Leonardo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'francisco@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+529981112233' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Nombre del rol que se asignará al usuario (por defecto: "user")',
  })
  @IsString()
  @IsOptional()
  role?: string;
}
