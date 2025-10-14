#!/bin/bash

# ===========================================
# SUSHI POS - CONFIGURAR BASE DE DATOS NEON
# ===========================================

set -e

echo "🗄️  Configurando base de datos Neon..."

# Verificar que el archivo .env existe
if [ ! -f ".env" ]; then
    echo "❌ Archivo .env no encontrado."
    echo "📝 Copiando desde env.production..."
    cp env.production .env
    echo "⚠️  Por favor edita el archivo .env con tus datos de Neon antes de continuar."
    exit 1
fi

# Cargar variables de entorno
source .env

# Verificar variables de Neon
if [ -z "$DB_HOST" ] || [ "$DB_HOST" = "tu_host_de_neon" ]; then
    echo "❌ DB_HOST no está configurado correctamente en .env"
    exit 1
fi

if [ -z "$DB_USER" ] || [ "$DB_USER" = "tu_usuario_de_neon" ]; then
    echo "❌ DB_USER no está configurado correctamente en .env"
    exit 1
fi

if [ -z "$DB_PASS" ] || [ "$DB_PASS" = "tu_password_de_neon" ]; then
    echo "❌ DB_PASS no está configurado correctamente en .env"
    exit 1
fi

if [ -z "$DB_NAME" ] || [ "$DB_NAME" = "tu_database_de_neon" ]; then
    echo "❌ DB_NAME no está configurado correctamente en .env"
    exit 1
fi

echo "✅ Variables de Neon verificadas"

# Verificar conexión a la base de datos
echo "🔍 Verificando conexión a Neon..."
if ! npm run migration:run; then
    echo "❌ No se pudo conectar a la base de datos Neon"
    echo "💡 Verifica que las variables de conexión sean correctas"
    exit 1
fi

echo "✅ Conexión a Neon verificada"

# Ejecutar seeds
echo "🌱 Ejecutando seeds..."
npm run seed:run

echo "✅ Base de datos Neon configurada correctamente!"
echo ""
echo "📊 Información de conexión:"
echo "   - Host: $DB_HOST"
echo "   - Database: $DB_NAME"
echo "   - User: $DB_USER"
echo ""
echo "🚀 Ahora puedes desplegar en Render con estas variables"
