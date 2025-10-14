import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ProcessCashPaymentDto } from './dto/process-cash-payment.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeService: StripeService) {}

  async createPaymentIntent(createPaymentIntentDto: CreatePaymentIntentDto) {
    const { amount, currency = 'mxn', orderNumber, metadata } = createPaymentIntentDto;

    const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency, {
      orderNumber,
      ...metadata,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100, // Convertir de centavos
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }

  async confirmPayment(paymentIntentId: string) {
    const paymentIntent = await this.stripeService.retrievePaymentIntent(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        paymentIntent,
        message: 'Pago confirmado exitosamente',
      };
    }

    return {
      success: false,
      paymentIntent,
      message: `Estado del pago: ${paymentIntent.status}`,
    };
  }

  async processCashPayment(processCashPaymentDto: ProcessCashPaymentDto) {
    const { amount, receivedAmount, change } = processCashPaymentDto;

    // Validar que el monto recibido sea suficiente
    if (receivedAmount < amount) {
      throw new BadRequestException('El monto recibido es menor al total a pagar');
    }

    // Calcular cambio si no se proporciona
    const calculatedChange = change !== undefined ? change : receivedAmount - amount;

    // Validar que el cambio sea correcto
    if (Math.abs(calculatedChange - (receivedAmount - amount)) > 0.01) {
      throw new BadRequestException('El cambio calculado no es correcto');
    }

    return {
      success: true,
      amount,
      receivedAmount,
      change: calculatedChange,
      message: 'Pago en efectivo procesado exitosamente',
    };
  }

  async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto) {
    const { lineItems, successUrl, cancelUrl, orderNumber, metadata } = createCheckoutSessionDto;

    // Convertir lineItems al formato de Stripe
    const stripeLineItems = lineItems.map(item => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convertir a centavos
      },
      quantity: item.quantity,
    }));

    const session = await this.stripeService.createCheckoutSession(
      stripeLineItems,
      successUrl,
      cancelUrl,
      {
        orderNumber,
        ...metadata,
      }
    );

    return {
      sessionId: session.id,
      url: session.url,
      message: 'Sesión de checkout creada exitosamente',
    };
  }

  async cancelPayment(paymentIntentId: string) {
    const paymentIntent = await this.stripeService.cancelPaymentIntent(paymentIntentId);

    return {
      success: true,
      paymentIntent,
      message: 'Pago cancelado exitosamente',
    };
  }

  async createRefund(paymentIntentId: string, amount?: number) {
    const refund = await this.stripeService.createRefund(paymentIntentId, amount);

    return {
      success: true,
      refund,
      message: 'Reembolso procesado exitosamente',
    };
  }

  async getPaymentStatus(paymentIntentId: string) {
    const paymentIntent = await this.stripeService.retrievePaymentIntent(paymentIntentId);

    return {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      created: new Date(paymentIntent.created * 1000),
      metadata: paymentIntent.metadata,
    };
  }

  // Método para pagos con terminal (lectores físicos)
  async createTerminalPaymentIntent(amount: number, currency: string = 'mxn') {
    const paymentIntent = await this.stripeService.createTerminalPaymentIntent(amount, currency);

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }

  // Método para Apple Pay / Google Pay
  async createSetupIntent(customerId: string) {
    const setupIntent = await this.stripeService.createSetupIntent(customerId);

    return {
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
      status: setupIntent.status,
    };
  }

  // Método para crear cliente
  async createCustomer(email: string, name: string, metadata?: any) {
    const customer = await this.stripeService.createCustomer(email, name, metadata);

    return {
      customerId: customer.id,
      email: customer.email,
      name: customer.name,
      metadata: customer.metadata,
    };
  }

  // Método para obtener métodos de pago del cliente
  async getCustomerPaymentMethods(customerId: string) {
    const paymentMethods = await this.stripeService.listPaymentMethods(customerId);

    return paymentMethods.map(pm => ({
      id: pm.id,
      type: pm.type,
      card: pm.card ? {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expMonth: pm.card.exp_month,
        expYear: pm.card.exp_year,
      } : null,
    }));
  }
}
