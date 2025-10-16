import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Delete, 
  Param, 
  Body, 
  Query, 
  HttpCode, 
  HttpStatus,
  UseGuards 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery,
  ApiBearerAuth 
} from '@nestjs/swagger';
import { AttendanceService } from '../services/attendance.service';
import { UpdateAttendanceDto } from '../dto/create-attendance.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in/:employeeId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Registrar entrada de empleado',
    description: 'Registra la hora de entrada de un empleado para el día actual'
  })
  @ApiParam({ 
    name: 'employeeId', 
    description: 'ID del empleado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Entrada registrada exitosamente' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Entrada ya registrada para hoy' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'No autorizado' 
  })
  registerCheckIn(@Param('employeeId') employeeId: string) {
    return this.attendanceService.registerCheckIn(employeeId);
  }

  @Post('check-out/:employeeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Registrar salida de empleado',
    description: 'Registra la hora de salida de un empleado para el día actual'
  })
  @ApiParam({ 
    name: 'employeeId', 
    description: 'ID del empleado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Salida registrada exitosamente' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'No se encontró entrada para hoy' 
  })
  registerCheckOut(@Param('employeeId') employeeId: string) {
    return this.attendanceService.registerCheckOut(employeeId);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ 
    summary: 'Obtener asistencia de empleado',
    description: 'Obtiene el historial de asistencia de un empleado específico'
  })
  @ApiParam({ 
    name: 'employeeId', 
    description: 'ID del empleado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiQuery({ 
    name: 'startDate', 
    required: false, 
    description: 'Fecha de inicio (ISO string)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @ApiQuery({ 
    name: 'endDate', 
    required: false, 
    description: 'Fecha de fin (ISO string)',
    example: '2024-01-31T23:59:59.999Z'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Historial de asistencia obtenido exitosamente' 
  })
  getAttendanceByEmployee(
    @Param('employeeId') employeeId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.getAttendanceByEmployee(employeeId, start, end);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ 
    summary: 'Obtener toda la asistencia',
    description: 'Obtiene el historial de asistencia de todos los empleados (solo ADMIN)'
  })
  @ApiQuery({ 
    name: 'startDate', 
    required: false, 
    description: 'Fecha de inicio (ISO string)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @ApiQuery({ 
    name: 'endDate', 
    required: false, 
    description: 'Fecha de fin (ISO string)',
    example: '2024-01-31T23:59:59.999Z'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Historial de asistencia obtenido exitosamente' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado - Se requiere rol ADMIN' 
  })
  getAllAttendance(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.getAllAttendance(start, end);
  }

  @Get('record/:id')
  @ApiOperation({ 
    summary: 'Obtener registro de asistencia por ID',
    description: 'Obtiene un registro específico de asistencia por su ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del registro de asistencia',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro de asistencia obtenido exitosamente' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Registro de asistencia no encontrado' 
  })
  getAttendanceById(@Param('id') id: string) {
    return this.attendanceService.getAttendanceById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ 
    summary: 'Actualizar registro de asistencia',
    description: 'Actualiza un registro de asistencia existente (solo ADMIN)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del registro de asistencia',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro actualizado exitosamente' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Registro de asistencia no encontrado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado - Se requiere rol ADMIN' 
  })
  updateAttendance(
    @Param('id') id: string,
    @Body() updateDto: UpdateAttendanceDto
  ) {
    return this.attendanceService.updateAttendance(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Eliminar registro de asistencia',
    description: 'Elimina un registro de asistencia (solo ADMIN)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del registro de asistencia',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Registro eliminado exitosamente' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Registro de asistencia no encontrado' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado - Se requiere rol ADMIN' 
  })
  deleteAttendance(@Param('id') id: string) {
    return this.attendanceService.deleteAttendance(id);
  }

  @Get('stats/overview')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ 
    summary: 'Obtener estadísticas de asistencia',
    description: 'Obtiene estadísticas generales de asistencia (solo ADMIN)'
  })
  @ApiQuery({ 
    name: 'employeeId', 
    required: false, 
    description: 'ID del empleado para filtrar',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiQuery({ 
    name: 'startDate', 
    required: false, 
    description: 'Fecha de inicio (ISO string)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @ApiQuery({ 
    name: 'endDate', 
    required: false, 
    description: 'Fecha de fin (ISO string)',
    example: '2024-01-31T23:59:59.999Z'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Estadísticas obtenidas exitosamente' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acceso denegado - Se requiere rol ADMIN' 
  })
  getAttendanceStats(
    @Query('employeeId') employeeId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.attendanceService.getAttendanceStats(employeeId, start, end);
  }
}
