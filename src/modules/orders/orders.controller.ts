import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards,
  ParseUUIDPipe 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { Order, OrderStatus, PaymentStatus } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth('access-token')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente', type: Order })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Usuario o producto no encontrado' })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida exitosamente', type: [Order] })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus, description: 'Filtrar por estado de orden' })
  @ApiQuery({ name: 'userId', required: false, type: String, description: 'Filtrar por ID de usuario' })
  findAll(
    @Query('status') status?: OrderStatus,
    @Query('userId') userId?: string,
  ): Promise<Order[]> {
    if (status) {
      return this.ordersService.findByStatus(status);
    }
    if (userId) {
      return this.ordersService.findByUser(userId);
    }
    return this.ordersService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de órdenes' })
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas exitosamente' })
  getStats() {
    return this.ordersService.getOrderStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden encontrada', type: Order })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una orden' })
  @ApiResponse({ status: 200, description: 'Orden actualizada exitosamente', type: Order })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de una orden' })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente', type: Order })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }

  @Post(':id/payment')
  @ApiOperation({ summary: 'Procesar pago de una orden' })
  @ApiResponse({ status: 200, description: 'Pago procesado exitosamente', type: Order })
  @ApiResponse({ status: 400, description: 'Error en el procesamiento del pago' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  processPayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() processPaymentDto: ProcessPaymentDto,
  ): Promise<Order> {
    return this.ordersService.processPayment(id, processPaymentDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar una orden' })
  @ApiResponse({ status: 200, description: 'Orden cancelada exitosamente', type: Order })
  @ApiResponse({ status: 400, description: 'No se puede cancelar la orden' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  cancel(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.cancel(id);
  }
}
