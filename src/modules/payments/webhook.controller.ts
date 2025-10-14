import { 
  Controller, 
  Post, 
  Body, 
  Headers, 
  RawBody, 
  HttpCode, 
  HttpStatus,
  Logger 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { OrdersService } from '../orders/orders.service';
import Stripe from 'stripe';

@ApiTags('Payments Webhook')
@Controller('payments/webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Webhook de Stripe para procesar eventos' })
  @ApiResponse({ status: 200, description: 'Webhook procesado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en el webhook' })
  async handleWebhook(
    @RawBody() rawBody: Buffer,
    @Headers('stripe-signature') signature: string,
  ) {
    try {
      // Verificar la firma del webhook
      const event = this.stripeService.verifyWebhookSignature(rawBody, signature);
      
      this.logger.log(`Webhook recibido: ${event.type}`);

      // Procesar el evento según su tipo
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
          break;
        
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
          break;
        
        case 'payment_intent.canceled':
          await this.handlePaymentCanceled(event.data.object as Stripe.PaymentIntent);
          break;
        
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;
        
        default:
          this.logger.log(`Evento no manejado: ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      this.logger.error('Error procesando webhook:', error);
      throw error;
    }
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    this.logger.log(`Pago exitoso: ${paymentIntent.id}`);
    
    // Aquí puedes actualizar el estado de la orden en tu base de datos
    const orderNumber = paymentIntent.metadata?.orderNumber;
    if (orderNumber) {
      // Buscar la orden por número y actualizar su estado
      this.logger.log(`Actualizando orden: ${orderNumber}`);
      // TODO: Implementar lógica para actualizar la orden
    }
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    this.logger.log(`Pago fallido: ${paymentIntent.id}`);
    
    const orderNumber = paymentIntent.metadata?.orderNumber;
    if (orderNumber) {
      this.logger.log(`Marcando orden como fallida: ${orderNumber}`);
      // TODO: Implementar lógica para marcar la orden como fallida
    }
  }

  private async handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
    this.logger.log(`Pago cancelado: ${paymentIntent.id}`);
    
    const orderNumber = paymentIntent.metadata?.orderNumber;
    if (orderNumber) {
      this.logger.log(`Marcando orden como cancelada: ${orderNumber}`);
      // TODO: Implementar lógica para cancelar la orden
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    this.logger.log(`Checkout completado: ${session.id}`);
    
    const orderNumber = session.metadata?.orderNumber;
    if (orderNumber) {
      this.logger.log(`Procesando orden completada: ${orderNumber}`);
      // TODO: Implementar lógica para procesar la orden completada
    }
  }
}
