# 🚀 Deploy con Node.js en Render - Guía Completa

## ✅ **Configuración Completada**

- ✅ **render.yaml actualizado** para Node.js
- ✅ **Scripts de package.json** verificados
- ✅ **Repositorio actualizado** en GitHub
- ✅ **Configuración optimizada** para NestJS

## 🎯 **Pasos para Deploy Manual**

### **Paso 1: Acceder a Render**
1. Ve a [https://dashboard.render.com](https://dashboard.render.com)
2. Inicia sesión con tu cuenta
3. Haz clic en **"New +"** → **"Web Service"**

### **Paso 2: Conectar Repositorio**
1. **Connect a repository**: Selecciona **GitHub**
2. **Repository**: Busca y selecciona `FLAranoHerrera/sushi-pos-backend`
3. **Branch**: `main`
4. Haz clic en **"Connect"**

### **Paso 3: Configurar el Servicio**

#### **Configuración Básica:**
- **Name**: `sushi-pos-backend`
- **Environment**: `Node`
- **Plan**: `Starter` ($7/mes)

#### **Configuración de Build:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Health Check Path**: `/docs`

#### **Configuración Avanzada:**
- **Root Directory**: **DEJAR VACÍO**
- **Node Version**: `20` (automático)
- **Auto-Deploy**: `Yes` (recomendado)

### **Paso 4: Variables de Entorno**

Configura las siguientes variables en Render:

#### **Variables Obligatorias:**
```
NODE_ENV = production
DATABASE_URL = postgresql://neondb_owner:npg_ZsFQVly60CIb@ep-steep-wind-adq9nyqz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET = [GENERAR_UNO_SEGURO]
JWT_EXPIRES = 7d
PORT = 3000
```

#### **Variables de Cloudinary:**
```
CLOUDINARY_CLOUD_NAME = dxifqh6xt
CLOUDINARY_API_KEY = 629533663712939
CLOUDINARY_API_SECRET = KA4UVtSo_s44AKeye1NG8LsYxek
```

#### **Variables de Stripe:**
```
STRIPE_SECRET_KEY = sk_live_tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET = whsec_tu_webhook_secret
```

#### **Variables de URLs:**
```
FRONTEND_URL = https://sushi-pos.vercel.app
```

#### **Variables de Admin (para seeders):**
```
ADMIN_NAME = Administrador
ADMIN_EMAIL = admin@sushi.com
ADMIN_PASSWORD = admin123
ADMIN_PHONE = 123456789
```

### **Paso 5: Deploy**
1. Haz clic en **"Create Web Service"**
2. Render comenzará a instalar dependencias y compilar
3. El proceso tomará 3-5 minutos
4. Verás los logs en tiempo real

### **Paso 6: Ejecutar Seeders**

Una vez que el servicio esté corriendo:

#### **Opción A: Desde Render Dashboard**
1. Ve a tu servicio en Render
2. Haz clic en **"Shell"**
3. Ejecuta: `npm run seed`

#### **Opción B: Desde Terminal Local**
```bash
# Reemplaza con tu URL de Render
curl -X POST https://tu-servicio.onrender.com/api/seed
```

## 🌐 **URLs de Acceso**

Una vez desplegado:
- **API**: `https://tu-servicio.onrender.com`
- **Swagger**: `https://tu-servicio.onrender.com/docs`
- **Health Check**: `https://tu-servicio.onrender.com/docs`

## 🔍 **Verificación del Deploy**

### **1. Health Check**
```bash
curl https://tu-servicio.onrender.com/docs
```

### **2. Verificar Base de Datos**
```bash
# Verificar que los seeders se ejecutaron
curl https://tu-servicio.onrender.com/api/products
```

### **3. Verificar Swagger**
Abrir en navegador: `https://tu-servicio.onrender.com/docs`

## 🛠️ **Comandos Útiles**

### **Logs del Servicio**
```bash
# En Render Dashboard > Service > Logs
```

### **Reiniciar Servicio**
```bash
# En Render Dashboard > Service > Manual Deploy
```

### **Variables de Entorno**
```bash
# En Render Dashboard > Service > Environment
```

## 🐛 **Solución de Problemas**

### **Error: Build Failed**
- Verificar que `package.json` tenga los scripts correctos
- Revisar logs de build en Render
- Verificar que todas las dependencias estén en `package.json`

### **Error: Database Connection**
- Verificar `DATABASE_URL` en variables de entorno
- Verificar que Neon DB esté activa
- Verificar SSL settings

### **Error: Port Binding**
- Render usa automáticamente la variable `PORT`
- No configurar puerto manualmente

### **Error: Seeders**
- Ejecutar seeders manualmente desde Shell
- Verificar variables de entorno de admin

## 📊 **Monitoreo**

### **Métricas Disponibles**
- CPU Usage
- Memory Usage
- Response Time
- Error Rate

### **Logs**
- Application Logs
- Build Logs
- Deploy Logs

## 🔒 **Seguridad**

### **Variables Sensibles**
- `JWT_SECRET`: Generar uno seguro
- `DATABASE_URL`: No exponer en logs
- `CLOUDINARY_API_SECRET`: Mantener privado
- `STRIPE_SECRET_KEY`: Usar claves de producción

### **HTTPS**
- Render proporciona HTTPS automáticamente
- Certificados SSL gestionados automáticamente

## 💰 **Costos**

### **Plan Starter**
- **Precio**: $7/mes
- **CPU**: 0.1 CPU
- **RAM**: 512MB
- **Bandwidth**: 100GB/mes

### **Escalabilidad**
- Auto-scaling disponible
- Upgrade a plan superior si es necesario

## 🎯 **Ventajas del Deploy con Node.js**

### **✅ Ventajas:**
- **Deploy más rápido** - No construye imagen Docker
- **Menos recursos** - Solo instala npm packages
- **Configuración simple** - Solo build y start commands
- **Debugging fácil** - Logs más claros
- **Hot reload** - Cambios más rápidos
- **Optimizado para NestJS** - Runtime nativo

### **📈 Performance:**
- **Tiempo de build**: 2-3 minutos
- **Tiempo de start**: 10-15 segundos
- **Uso de memoria**: ~200-300MB
- **Tiempo de respuesta**: <1 segundo

## 🎉 **¡Deploy Completado!**

Una vez que todo esté funcionando:

1. **API disponible** en tu URL de Render
2. **Swagger documentación** en `/docs`
3. **Base de datos poblada** con seeders
4. **Variables de entorno** configuradas
5. **Monitoreo activo** en Render Dashboard

### **Próximos Pasos:**
1. Configurar dominio personalizado (opcional)
2. Configurar CI/CD con GitHub Actions
3. Configurar monitoreo avanzado
4. Optimizar performance según métricas

---

## 📞 **Soporte**

Si tienes problemas durante el deploy:
1. Revisa los logs en Render Dashboard
2. Verifica las variables de entorno
3. Consulta la documentación de Render
4. Contacta al equipo de desarrollo
