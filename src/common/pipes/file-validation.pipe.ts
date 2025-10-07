import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
  ];

  private readonly maxSize = 5 * 1024 * 1024; // 5MB

  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

  
    if (!this.allowedMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido. Tipos permitidos: ${this.allowedMimeTypes.join(', ')}`
      );
    }

  
    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `El archivo es demasiado grande. Tamaño máximo permitido: ${this.maxSize / (1024 * 1024)}MB`
      );
    }

  
    if (!value.buffer || value.buffer.length === 0) {
      throw new BadRequestException('El archivo está vacío o corrupto');
    }

    return value;
  }
}
