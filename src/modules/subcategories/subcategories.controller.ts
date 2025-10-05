import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Subcategory } from './entities/subcategory.entity';

@ApiTags('Subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva subcategoría' })
  @ApiResponse({ status: 201, description: 'Subcategoría creada', type: Subcategory })
  create(@Body() dto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las subcategorías' })
  @ApiResponse({ status: 200, description: 'Listado de subcategorías', type: [Subcategory] })
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una subcategoría por ID' })
  @ApiParam({ name: 'id', description: 'UUID de la subcategoría', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Subcategoría encontrada', type: Subcategory })
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una subcategoría' })
  @ApiParam({ name: 'id', description: 'UUID de la subcategoría', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Subcategoría actualizada', type: Subcategory })
  update(@Param('id') id: string, @Body() dto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una subcategoría' })
  @ApiParam({ name: 'id', description: 'UUID de la subcategoría', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 204, description: 'Subcategoría eliminada' })
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
