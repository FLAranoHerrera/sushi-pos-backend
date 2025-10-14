import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  UseGuards,
  Query 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ProcessCashPaymentDto } from './dto/process-cash-payment.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payments')
@ApiBearerAuth('access-token')
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intent')
  @ApiOperation({ summary: 'Crear Payment Intent para pago con tarjeta' })
  @ApiResponse({ status: 201, description: 'Payment Intent creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    return this.paymentsService.createPaymentIntent(createPaymentIntentDto);
  }

  @Post('cash')
  @ApiOperation({ summary: 'Procesar pago en efectivo' })
  @ApiResponse({ status: 200, description: 'Pago en efectivo procesado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en el procesamiento del pago' })
  processCashPayment(@Body() processCashPaymentDto: ProcessCashPaymentDto) {
    return this.paymentsService.processCashPayment(processCashPaymentDto);
  }

  @Post('checkout-session')
  @ApiOperation({ summary: 'Crear sesión de checkout de Stripe' })
  @ApiResponse({ status: 201, description: 'Sesión de checkout creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    return this.paymentsService.createCheckoutSession(createCheckoutSessionDto);
  }

  @Post('terminal-intent')
  @ApiOperation({ summary: 'Crear Payment Intent para terminal físico' })
  @ApiResponse({ status: 201, description: 'Payment Intent para terminal creado exitosamente' })
  createTerminalPaymentIntent(
    @Body('amount') amount: number,
    @Body('currency') currency: string = 'mxn'
  ) {
    return this.paymentsService.createTerminalPaymentIntent(amount, currency);
  }

  @Get('status/:paymentIntentId')
  @ApiOperation({ summary: 'Obtener estado de un pago' })
  @ApiResponse({ status: 200, description: 'Estado del pago obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Payment Intent no encontrado' })
  getPaymentStatus(@Param('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.getPaymentStatus(paymentIntentId);
  }

  @Post('confirm/:paymentIntentId')
  @ApiOperation({ summary: 'Confirmar un pago' })
  @ApiResponse({ status: 200, description: 'Pago confirmado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al confirmar el pago' })
  confirmPayment(@Param('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.confirmPayment(paymentIntentId);
  }

  @Post('cancel/:paymentIntentId')
  @ApiOperation({ summary: 'Cancelar un pago' })
  @ApiResponse({ status: 200, description: 'Pago cancelado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al cancelar el pago' })
  cancelPayment(@Param('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.cancelPayment(paymentIntentId);
  }

  @Post('refund/:paymentIntentId')
  @ApiOperation({ summary: 'Crear reembolso' })
  @ApiResponse({ status: 200, description: 'Reembolso creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al crear el reembolso' })
  createRefund(
    @Param('paymentIntentId') paymentIntentId: string,
    @Body('amount') amount?: number
  ) {
    return this.paymentsService.createRefund(paymentIntentId, amount);
  }

  @Post('customer')
  @ApiOperation({ summary: 'Crear cliente en Stripe' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al crear el cliente' })
  createCustomer(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('metadata') metadata?: any
  ) {
    return this.paymentsService.createCustomer(email, name, metadata);
  }

  @Get('customer/:customerId/payment-methods')
  @ApiOperation({ summary: 'Obtener métodos de pago del cliente' })
  @ApiResponse({ status: 200, description: 'Métodos de pago obtenidos exitosamente' })
  getCustomerPaymentMethods(@Param('customerId') customerId: string) {
    return this.paymentsService.getCustomerPaymentMethods(customerId);
  }

  @Post('setup-intent')
  @ApiOperation({ summary: 'Crear Setup Intent para Apple Pay/Google Pay' })
  @ApiResponse({ status: 201, description: 'Setup Intent creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al crear el Setup Intent' })
  createSetupIntent(@Body('customerId') customerId: string) {
    return this.paymentsService.createSetupIntent(customerId);
  }
}
