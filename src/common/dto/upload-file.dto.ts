import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description: 'Carpeta donde se guardará la imagen en Cloudinary',
    example: 'sushi-pos/products',
    required: false,
  })
  @IsOptional()
  @IsString()
  folder?: string;
}

export class UploadMultipleFilesDto {
  @ApiProperty({
    description: 'Carpeta donde se guardarán las imágenes en Cloudinary',
    example: 'sushi-pos/products',
    required: false,
  })
  @IsOptional()
  @IsString()
  folder?: string;
}
