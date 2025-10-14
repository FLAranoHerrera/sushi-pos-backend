import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Extra } from '../extras/entities/extra.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Extra)
    private readonly extraRepository: Repository<Extra>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items, paymentMethod, tip = 0, tableNumber, notes } = createOrderDto;

    // Verificar que el usuario existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Generar número de orden único
    const orderNumber = await this.generateOrderNumber();

    // Crear la orden
    const order = this.orderRepository.create({
      user,
      paymentMethod,
      tip,
      tableNumber,
      notes,
      orderNumber,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
    });

    // Procesar items y calcular totales
    let total = 0;
    const orderItems: OrderItem[] = [];

    for (const itemDto of items) {
      const product = await this.productRepository.findOne({
        where: { id: itemDto.productId },
        relations: ['extras'],
      });

      if (!product) {
        throw new NotFoundException(`Producto con ID ${itemDto.productId} no encontrado`);
      }

      if (!product.available) {
        throw new BadRequestException(`El producto ${product.name} no está disponible`);
      }

      if (product.stock < itemDto.quantity) {
        throw new BadRequestException(`Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
      }

      // Obtener extras si existen
      let extras: Extra[] = [];
      if (itemDto.extraIds && itemDto.extraIds.length > 0) {
        extras = await this.extraRepository.findByIds(itemDto.extraIds);
      }

      // Calcular precio unitario (producto + extras)
      const extrasPrice = extras.reduce((sum, extra) => sum + Number(extra.price), 0);
      const unitPrice = Number(product.price) + extrasPrice;
      const subtotal = unitPrice * itemDto.quantity;

      const orderItem = this.orderItemRepository.create({
        product,
        quantity: itemDto.quantity,
        unitPrice,
        subtotal,
        notes: itemDto.notes,
        extras,
      });

      orderItems.push(orderItem);
      total += subtotal;
    }

    // Calcular totales finales
    order.total = total;
    order.finalTotal = total + tip;

    // Guardar la orden
    const savedOrder = await this.orderRepository.save(order);

    // Guardar los items
    for (const item of orderItems) {
      item.order = savedOrder;
      await this.orderItemRepository.save(item);
    }

    // Actualizar stock de productos
    for (const itemDto of items) {
      await this.productRepository.decrement(
        { id: itemDto.productId },
        'stock',
        itemDto.quantity
      );
    }

    return this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'items', 'items.product', 'items.extras'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product', 'items.extras'],
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'items', 'items.product', 'items.extras'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status },
      relations: ['user', 'items', 'items.product', 'items.extras'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderDto);
    await this.orderRepository.save(order);

    return this.findOne(id);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.update(id, { status });
  }

  async processPayment(id: string, processPaymentDto: ProcessPaymentDto): Promise<Order> {
    const order = await this.findOne(id);

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new BadRequestException('La orden ya ha sido pagada');
    }

    const { paymentMethod, amount, receivedAmount, change } = processPaymentDto;

    // Validar monto
    if (Math.abs(amount - order.finalTotal) > 0.01) {
      throw new BadRequestException('El monto no coincide con el total de la orden');
    }

    // Validar pago en efectivo
    if (paymentMethod === 'cash') {
      if (!receivedAmount || receivedAmount < amount) {
        throw new BadRequestException('El monto recibido debe ser mayor o igual al total');
      }
      if (change !== undefined && Math.abs(change - (receivedAmount - amount)) > 0.01) {
        throw new BadRequestException('El cambio calculado no es correcto');
      }
    }

    // Actualizar orden
    order.paymentMethod = paymentMethod;
    order.paymentStatus = PaymentStatus.PAID;
    order.status = OrderStatus.PAID;

    await this.orderRepository.save(order);

    return this.findOne(id);
  }

  async cancel(id: string): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.PAID) {
      throw new BadRequestException('No se puede cancelar una orden ya pagada');
    }

    // Restaurar stock
    for (const item of order.items) {
      await this.productRepository.increment(
        { id: item.product.id },
        'stock',
        item.quantity
      );
    }

    order.status = OrderStatus.CANCELLED;
    await this.orderRepository.save(order);

    return this.findOne(id);
  }

  async getOrderStats(): Promise<any> {
    const totalOrders = await this.orderRepository.count();
    const paidOrders = await this.orderRepository.count({ where: { paymentStatus: PaymentStatus.PAID } });
    const pendingOrders = await this.orderRepository.count({ where: { status: OrderStatus.PENDING } });
    
    const totalRevenue = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.finalTotal)', 'total')
      .where('order.paymentStatus = :status', { status: PaymentStatus.PAID })
      .getRawOne();

    return {
      totalOrders,
      paidOrders,
      pendingOrders,
      totalRevenue: Number(totalRevenue.total) || 0,
    };
  }

  private async generateOrderNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    const prefix = `ORD-${year}${month}${day}`;
    
    // Buscar el último número de orden del día
    const lastOrder = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.orderNumber LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('order.orderNumber', 'DESC')
      .getOne();

    let sequence = 1;
    if (lastOrder && lastOrder.orderNumber) {
      const parts = lastOrder.orderNumber.split('-');
      if (parts.length >= 3) {
        const lastSequence = parseInt(parts[2]) || 0;
        sequence = lastSequence + 1;
      }
    }

    const orderNumber = `${prefix}-${String(sequence).padStart(3, '0')}`;
    
    // Verificar que el número no existe (doble verificación)
    const existingOrder = await this.orderRepository.findOne({
      where: { orderNumber }
    });
    
    if (existingOrder) {
      // Si existe, incrementar secuencia
      return this.generateOrderNumber();
    }

    return orderNumber;
  }
}
