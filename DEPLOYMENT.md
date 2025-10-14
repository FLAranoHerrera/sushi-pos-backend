# 🚀 Guía de Despliegue - Sushi POS Backend

## 📋 Configuración Completada

### ✅ **Desarrollo (Local)**
- **Base de Datos**: PostgreSQL local (pgAdmin4)
- **Archivo**: `.env.dev`
- **Estado**: ✅ Funcionando correctamente

### ✅ **Producción (Neon + Render)**
- **Base de Datos**: Neon PostgreSQL
- **Archivo**: `.env.prod`
- **Estado**: ✅ Conectado y funcionando

## 🔧 Variables de Entorno Configuradas

### **Desarrollo (.env.dev)**
```env
# Base de Datos Local
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=frank24
DB_NAME=sushi_pos

# JWT
JWT_SECRET=tu_jwt_secreto_super_seguro_aqui
JWT_EXPIRES=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=dxifqh6xt
CLOUDINARY_API_KEY=629533663712939
CLOUDINARY_API_SECRET=KA4UVtSo_s44AKeye1NG8LsYxek

# URLs
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

### **Producción (.env.prod)**
```env
# Base de Datos Neon
DATABASE_URL=postgresql://neondb_owner:npg_ZsFQVly60CIb@ep-steep-wind-adq9nyqz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# JWT
JWT_SECRET=tu_jwt_secreto_super_seguro_aqui_produccion
JWT_EXPIRES=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=dxifqh6xt
CLOUDINARY_API_KEY=629533663712939
CLOUDINARY_API_SECRET=KA4UVtSo_s44AKeye1NG8LsYxek

# URLs
FRONTEND_URL=https://sushi-pos.vercel.app
NODE_ENV=production
PORT=3000
```

## 🚀 Despliegue en Render.com

### **Paso 1: Conectar Repositorio**
1. Ve a [Render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Selecciona este repositorio

### **Paso 2: Configurar Servicio**
1. **Tipo**: Web Service
2. **Runtime**: Node.js 20
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm run start:prod`

### **Paso 3: Variables de Entorno**
Configura estas variables en el panel de Render:

```env
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_ZsFQVly60CIb@ep-steep-wind-adq9nyqz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=tu_jwt_secreto_super_seguro_aqui_produccion
JWT_EXPIRES=7d
CLOUDINARY_CLOUD_NAME=dxifqh6xt
CLOUDINARY_API_KEY=629533663712939
CLOUDINARY_API_SECRET=KA4UVtSo_s44AKeye1NG8LsYxek
STRIPE_SECRET_KEY=sk_live_tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
FRONTEND_URL=https://sushi-pos.vercel.app
PORT=3000
```

### **Paso 4: Health Check**
- **Path**: `/api/health`
- **Timeout**: 30 segundos

## 🧪 Comandos de Prueba

### **Desarrollo Local**
```bash
# Opción 1: Script automático
./start-dev.sh

# Opción 2: Manual
ENV_FILE=dev npm run start:dev

# Probar conexión
curl http://localhost:3000/api/health
```

### **Producción Local (con Neon)**
```bash
# Opción 1: Script automático
./start-prod.sh

# Opción 2: Manual
ENV_FILE=prod npm run start:dev

# Probar conexión
curl http://localhost:3000/api/health
```

### **Configuración de Archivos de Entorno**
```bash
# Para desarrollo
ENV_FILE=dev npm run start:dev

# Para producción
ENV_FILE=prod npm run start:dev

# Verificar configuración actual
cat .env.dev    # Desarrollo
cat .env.prod   # Producción
```

## 📊 Endpoints Disponibles

### **Desarrollo**
- **API**: `http://localhost:3000/api/`
- **Health**: `http://localhost:3000/api/health`
- **Swagger**: `http://localhost:3000/docs`

### **Producción**
- **API**: `https://tu-app.render.com/api/`
- **Health**: `https://tu-app.render.com/api/health`
- **Swagger**: `https://tu-app.render.com/docs`

## 🔍 Verificación de Despliegue

### **1. Health Check**
```bash
curl https://tu-app.render.com/api/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-14T18:30:15.000Z",
  "database": "connected"
}
```

### **2. Swagger Documentation**
Visita: `https://tu-app.render.com/docs`

### **3. Logs de Render**
- Ve al panel de Render
- Revisa los logs del servicio
- Verifica que no haya errores

## 🛠️ Troubleshooting

### **Error de Conexión a Base de Datos**
1. Verifica que `DATABASE_URL` esté configurado correctamente
2. Asegúrate de que la base de datos Neon esté activa
3. Revisa los logs de Render para errores específicos

### **Error de Variables de Entorno**
1. Verifica que todas las variables estén configuradas
2. Asegúrate de que no haya espacios extra
3. Revisa que los valores sean correctos

### **Error de Build**
1. Verifica que el código compile localmente
2. Revisa los logs de build en Render
3. Asegúrate de que todas las dependencias estén en package.json

## 📈 Monitoreo

### **Métricas Importantes**
- **Uptime**: Disponibilidad del servicio
- **Response Time**: Tiempo de respuesta de la API
- **Database Connections**: Conexiones activas a Neon
- **Memory Usage**: Uso de memoria del servicio

### **Logs a Monitorear**
- Errores de conexión a base de datos
- Errores de autenticación JWT
- Errores de Cloudinary
- Errores de Stripe

## 🔐 Seguridad

### **Variables Sensibles**
- `DATABASE_URL`: Contiene credenciales de Neon
- `JWT_SECRET`: Debe ser único y seguro
- `CLOUDINARY_API_SECRET`: Credenciales de Cloudinary
- `STRIPE_SECRET_KEY`: Clave secreta de Stripe

### **Buenas Prácticas**
- Nunca commitees archivos `.env`
- Usa diferentes secretos para desarrollo y producción
- Rota las credenciales regularmente
- Usa HTTPS en producción

## ✅ Estado Actual

- ✅ **Desarrollo**: Funcionando con PostgreSQL local
- ✅ **Producción**: Configurado con Neon DB
- ✅ **Conexión Neon**: Verificada y funcionando
- ✅ **Render Config**: Listo para despliegue
- ✅ **Variables**: Configuradas correctamente
- ✅ **Health Check**: Funcionando
- ✅ **Swagger**: Documentación disponible

**El proyecto está listo para despliegue en producción.**
