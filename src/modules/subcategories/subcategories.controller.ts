import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Subcategory } from './entities/subcategory.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';

@ApiTags('Subcategories')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Crear una nueva subcategoría' })
  @ApiResponse({ status: 201, description: 'Subcategoría creada', type: Subcategory })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateSubcategoryDto })
  create(@Body() dto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Obtener todas las subcategorías con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Listado paginado de subcategorías', type: [Subcategory] })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.subcategoriesService.findAll(+page, +limit);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Obtener una subcategoría por ID' })
  @ApiParam({ name: 'id', description: 'UUID de la subcategoría', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Subcategoría encontrada', type: Subcategory })
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar una subcategoría' })
  @ApiParam({ name: 'id', description: 'UUID de la subcategoría', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Subcategoría actualizada', type: Subcategory })
  @ApiBody({ type: UpdateSubcategoryDto })
  update(@Param('id') id: string, @Body() dto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar una subcategoría' })
  @ApiParam({ name: 'id', description: 'UUID de la subcategoría', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 204, description: 'Subcategoría eliminada' })
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
