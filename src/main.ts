import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import * as dotenv from 'dotenv';
import * as path from 'path';

async function bootstrap() {
  // Cargar archivo de entorno específico según el parámetro
  const envFile = process.env.ENV_FILE || 'dev';
  const envPath = path.resolve(process.cwd(), `.env.${envFile}`);
  
  console.log(`🔧 Cargando configuración desde: .env.${envFile}`);
  console.log(`🚀 Iniciando aplicación con prefijo /api - VERSIÓN FINAL`);
  console.log(`📡 Rutas disponibles: /api/auth/login, /api/auth/signup, /api/health`);
  console.log(`🔄 FORZANDO DESPLIEGUE LIMPIO - ${new Date().toISOString()}`);
  console.log(`🔥 ULTIMO INTENTO - ${Math.random().toString(36).substring(7)}`);
  
  // Cargar variables de entorno
  dotenv.config({ path: envPath });
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173', // Vite dev server
      'http://localhost:4200', // Angular dev server
      'https://sushi-pos-frontend.vercel.app', // Vercel production
      'https://sushi-pos-frontend-npbn.vercel.app', // Vercel production (alternativo)
      configService.get<string>('FRONTEND_URL') || 'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar prefijo global para API
  app.setGlobalPrefix('api');

  // Configurar filtros e interceptores globales
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Daruma/Sushi POS API')
    .setDescription('Backend del Punto de venta para Daruma/Sushi')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Introduce el token JWT con el prefijo Bearer',
        in: 'header',
      },
      'access-token',
    )
    .addServer('http://localhost:3000', 'Servidor de desarrollo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
