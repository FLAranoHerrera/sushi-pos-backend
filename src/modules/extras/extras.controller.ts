import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Extra } from './entities/extra.entity';

@ApiTags('Extras')
@Controller('extras')
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo extra' })
  @ApiResponse({ status: 201, description: 'Extra creado', type: Extra })
  create(@Body() dto: CreateExtraDto) {
    return this.extrasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los extras' })
  @ApiResponse({ status: 200, description: 'Listado de extras', type: [Extra] })
  findAll() {
    return this.extrasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un extra por ID' })
  @ApiParam({ name: 'id', description: 'UUID del extra', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Extra encontrado', type: Extra })
  findOne(@Param('id') id: string) {
    return this.extrasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un extra' })
  @ApiParam({ name: 'id', description: 'UUID del extra', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Extra actualizado', type: Extra })
  update(@Param('id') id: string, @Body() dto: UpdateExtraDto) {
    return this.extrasService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un extra' })
  @ApiParam({ name: 'id', description: 'UUID del extra', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 204, description: 'Extra eliminado' })
  remove(@Param('id') id: string) {
    return this.extrasService.remove(id);
  }
}
