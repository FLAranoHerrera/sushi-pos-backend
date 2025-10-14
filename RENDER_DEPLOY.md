# 🚀 Deploy en Render - Sushi POS Backend

## Configuración para Deploy en Render

### 📋 **Requisitos Previos**
- Cuenta en [Render.com](https://render.com)
- Repositorio en GitHub
- Base de datos Neon configurada
- Variables de entorno configuradas

### 🔧 **Configuración Actual**

#### **Dockerfile Optimizado**
- `Dockerfile.render` - Optimizado para Render
- Imagen base: `node:20-alpine`
- Usuario no-root para seguridad
- Solo dependencias de producción

#### **Render.yaml**
- Configurado para usar Docker
- Variables de entorno predefinidas
- Health check en `/docs`
- Plan starter

### 🚀 **Pasos para Deploy**

#### **1. Preparar el Repositorio**
```bash
# Ejecutar script de preparación
./deploy-render.sh

# Hacer commit y push
git add .
git commit -m "feat: configurar deploy en Render con Docker"
git push origin main
```

#### **2. Crear Servicio en Render**

1. **Ir a [Render Dashboard](https://dashboard.render.com)**
2. **Crear nuevo Web Service**
3. **Conectar repositorio GitHub**
4. **Configurar servicio:**
   - **Name**: `sushi-pos-backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile.render`
   - **Plan**: `Starter`

#### **3. Configurar Variables de Entorno**

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Entorno de producción |
| `DATABASE_URL` | `postgresql://...` | Connection string de Neon |
| `JWT_SECRET` | `generar_uno_seguro` | Secreto para JWT |
| `JWT_EXPIRES` | `7d` | Expiración de tokens |
| `CLOUDINARY_CLOUD_NAME` | `dxifqh6xt` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | `629533663712939` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `KA4UVtSo_s44AKeye1NG8LsYxek` | Cloudinary secret |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook secret |
| `FRONTEND_URL` | `https://sushi-pos.vercel.app` | URL del frontend |
| `ADMIN_NAME` | `Administrador` | Nombre del admin |
| `ADMIN_EMAIL` | `admin@sushi.com` | Email del admin |
| `ADMIN_PASSWORD` | `admin123` | Password del admin |
| `ADMIN_PHONE` | `123456789` | Teléfono del admin |

#### **4. Ejecutar Seeders**

Una vez desplegado, ejecutar los seeders:

```bash
# Opción 1: Desde Render Dashboard
# Ir a "Shell" y ejecutar:
npm run seed

# Opción 2: Desde local (si tienes acceso)
curl -X POST https://tu-servicio.onrender.com/api/seed
```

### 🌐 **URLs de Acceso**

Una vez desplegado:
- **API**: `https://tu-servicio.onrender.com`
- **Swagger**: `https://tu-servicio.onrender.com/docs`
- **Health Check**: `https://tu-servicio.onrender.com/docs`

### 🔍 **Verificación del Deploy**

#### **1. Health Check**
```bash
curl https://tu-servicio.onrender.com/docs
```

#### **2. Verificar Base de Datos**
```bash
# Verificar que los seeders se ejecutaron
curl https://tu-servicio.onrender.com/api/products
```

#### **3. Verificar Swagger**
Abrir en navegador: `https://tu-servicio.onrender.com/docs`

### 🛠️ **Comandos Útiles**

#### **Logs del Servicio**
```bash
# En Render Dashboard > Service > Logs
```

#### **Reiniciar Servicio**
```bash
# En Render Dashboard > Service > Manual Deploy
```

#### **Variables de Entorno**
```bash
# En Render Dashboard > Service > Environment
```

### 🐛 **Solución de Problemas**

#### **Error: Build Failed**
- Verificar que `Dockerfile.render` existe
- Verificar que todas las dependencias estén en `package.json`
- Revisar logs de build en Render

#### **Error: Database Connection**
- Verificar `DATABASE_URL` en variables de entorno
- Verificar que Neon DB esté activa
- Verificar SSL settings

#### **Error: Port Binding**
- Render usa automáticamente la variable `PORT`
- No configurar puerto manualmente

#### **Error: Seeders**
- Ejecutar seeders manualmente desde Shell
- Verificar variables de entorno de admin

### 📊 **Monitoreo**

#### **Métricas Disponibles**
- CPU Usage
- Memory Usage
- Response Time
- Error Rate

#### **Logs**
- Application Logs
- Build Logs
- Deploy Logs

### 🔒 **Seguridad**

#### **Variables Sensibles**
- `JWT_SECRET`: Generar uno seguro
- `DATABASE_URL`: No exponer en logs
- `CLOUDINARY_API_SECRET`: Mantener privado
- `STRIPE_SECRET_KEY`: Usar claves de producción

#### **HTTPS**
- Render proporciona HTTPS automáticamente
- Certificados SSL gestionados automáticamente

### 💰 **Costos**

#### **Plan Starter**
- **Precio**: $7/mes
- **CPU**: 0.1 CPU
- **RAM**: 512MB
- **Bandwidth**: 100GB/mes

#### **Escalabilidad**
- Auto-scaling disponible
- Upgrade a plan superior si es necesario

### 🎯 **Próximos Pasos**

1. **Configurar dominio personalizado** (opcional)
2. **Configurar CI/CD** con GitHub Actions
3. **Configurar monitoreo** con servicios externos
4. **Optimizar performance** según métricas
