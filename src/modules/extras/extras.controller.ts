import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Extra } from './entities/extra.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';

@ApiTags('Extras')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('extras')
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Crear un nuevo extra' })
  @ApiBody({ type: CreateExtraDto })
  @ApiResponse({ status: 201, description: 'Extra creado', type: Extra })
  create(@Body() dto: CreateExtraDto) {
    return this.extrasService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Obtener todos los extras con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Listado paginado de extras', type: [Extra] })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.extrasService.findAll(+page, +limit);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Obtener un extra por ID' })
  @ApiParam({ name: 'id', description: 'UUID del extra', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 200, description: 'Extra encontrado', type: Extra })
  findOne(@Param('id') id: string) {
    return this.extrasService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Actualizar un extra' })
  @ApiParam({ name: 'id', description: 'UUID del extra', example: 'uuid-ejemplo' })
  @ApiBody({ type: UpdateExtraDto })
  @ApiResponse({ status: 200, description: 'Extra actualizado', type: Extra })
  update(@Param('id') id: string, @Body() dto: UpdateExtraDto) {
    return this.extrasService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar un extra' })
  @ApiParam({ name: 'id', description: 'UUID del extra', example: 'uuid-ejemplo' })
  @ApiResponse({ status: 204, description: 'Extra eliminado' })
  remove(@Param('id') id: string) {
    return this.extrasService.remove(id);
  }
}
