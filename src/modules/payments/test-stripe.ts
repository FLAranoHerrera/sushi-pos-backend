import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { StripeService } from './stripe.service';

async function testStripeConnection() {
  console.log('🧪 Probando conexión con Stripe...\n');

  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const stripeService = app.get(StripeService);

    // Test 1: Crear un Payment Intent
    console.log('1️⃣ Creando Payment Intent de prueba...');
    const paymentIntent = await stripeService.createPaymentIntent(100, 'mxn', {
      test: true,
      orderNumber: 'TEST-001'
    });
    console.log('✅ Payment Intent creado:', paymentIntent.id);
    console.log('   Client Secret:', paymentIntent.client_secret?.substring(0, 20) + '...');

    // Test 2: Crear una sesión de checkout
    console.log('\n2️⃣ Creando sesión de checkout de prueba...');
    const checkoutSession = await stripeService.createCheckoutSession(
      [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'Sushi de Prueba',
            },
            unit_amount: 10000, // $100.00 MXN
          },
          quantity: 1,
        }
      ],
      'https://example.com/success',
      'https://example.com/cancel',
      { test: true, orderNumber: 'TEST-002' }
    );
    console.log('✅ Checkout Session creada:', checkoutSession.id);
    console.log('   URL:', checkoutSession.url);

    // Test 3: Crear un cliente
    console.log('\n3️⃣ Creando cliente de prueba...');
    const customer = await stripeService.createCustomer(
      'test@example.com',
      'Cliente de Prueba',
      { test: true }
    );
    console.log('✅ Cliente creado:', customer.id);
    console.log('   Email:', customer.email);

    console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   • Payment Intent: ${paymentIntent.id}`);
    console.log(`   • Checkout Session: ${checkoutSession.id}`);
    console.log(`   • Customer: ${customer.id}`);

    await app.close();
  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.log('\n🔧 Verifica que:');
    console.log('   • Las claves de Stripe estén configuradas en .env');
    console.log('   • Las claves sean válidas y no estén expiradas');
    console.log('   • Tengas conexión a internet');
  }
}

// Ejecutar las pruebas
testStripeConnection();
