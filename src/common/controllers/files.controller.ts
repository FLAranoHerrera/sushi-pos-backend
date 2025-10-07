import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../services/cloudinary.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../modules/auth/guards/roles.guard';
import { Roles } from '../../modules/auth/decorators/roles.decorators';
import { UploadFileDto, UploadMultipleFilesDto } from '../dto/upload-file.dto';
import { FileValidationPipe } from '../pipes/file-validation.pipe';

@ApiTags('Files')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ 
    summary: 'Subir una imagen',
    description: 'Sube una imagen a Cloudinary. Solo usuarios ADMIN pueden usar este endpoint.'
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ 
    status: 201, 
    description: 'Imagen subida exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Imagen subida exitosamente' },
        data: {
          type: 'object',
          properties: {
            publicId: { type: 'string', example: 'sushi-pos/products/abc123' },
            url: { type: 'string', example: 'https://res.cloudinary.com/...' },
            width: { type: 'number', example: 800 },
            height: { type: 'number', example: 600 },
            format: { type: 'string', example: 'jpg' },
            size: { type: 'number', example: 245760 }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Error en la carga del archivo' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - Solo ADMIN' })
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadFileDto,
  ) {
    if (!file) {
      throw new HttpException('No se proporcionó ningún archivo', HttpStatus.BAD_REQUEST);
    }

    // Validaciones básicas
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new HttpException(
        `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`,
        HttpStatus.BAD_REQUEST
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new HttpException(
        `El archivo es demasiado grande. Tamaño máximo: ${maxSize / (1024 * 1024)}MB`,
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const result = await this.cloudinaryService.uploadImage(file, uploadDto.folder);
      return {
        success: true,
        message: 'Imagen subida exitosamente',
        data: {
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Error al subir la imagen: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('upload-multiple')
  @Roles('ADMIN')
  @UseInterceptors(FilesInterceptor('files', 10)) // Máximo 10 archivos
  @ApiOperation({ summary: 'Subir múltiples imágenes' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Imágenes subidas exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en la carga de archivos' })
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadDto: UploadMultipleFilesDto,
  ) {
    if (!files || files.length === 0) {
      throw new HttpException('No se proporcionaron archivos', HttpStatus.BAD_REQUEST);
    }

    try {
      const results = await this.cloudinaryService.uploadMultipleImages(files, uploadDto.folder);
      return {
        success: true,
        message: `${results.length} imágenes subidas exitosamente`,
        data: results.map(result => ({
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes,
        })),
      };
    } catch (error) {
      throw new HttpException(
        'Error al subir las imágenes: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
