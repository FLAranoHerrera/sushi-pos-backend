# 🚀 Deploy Manual en Render - Paso a Paso

## 📋 **Preparación Completada**

✅ **Repositorio actualizado** - Cambios subidos a GitHub  
✅ **Dockerfile optimizado** - `Dockerfile.render` listo  
✅ **Variables de entorno** - Configuradas en `render.yaml`  
✅ **Imagen probada** - Construcción exitosa localmente  

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
- **Environment**: `Docker`
- **Dockerfile Path**: `./Dockerfile.render`
- **Plan**: `Starter` ($7/mes)

#### **Configuración Avanzada:**
- **Health Check Path**: `/docs`
- **Auto-Deploy**: `Yes` (recomendado)

### **Paso 4: Variables de Entorno**

Configura las siguientes variables:

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
2. Render comenzará a construir la imagen
3. El proceso tomará 5-10 minutos
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

### **Paso 7: Verificar Deploy**

#### **URLs de Acceso:**
- **API**: `https://tu-servicio.onrender.com`
- **Swagger**: `https://tu-servicio.onrender.com/docs`
- **Health Check**: `https://tu-servicio.onrender.com/docs`

#### **Verificaciones:**
1. **Swagger funciona**: Abre `/docs` en el navegador
2. **API responde**: Prueba `/api/products`
3. **Base de datos**: Verifica que los seeders se ejecutaron

## 🔧 **Configuración Adicional**

### **Dominio Personalizado (Opcional)**
1. En Render Dashboard → Service → Settings
2. **Custom Domains** → **Add Domain**
3. Configura tu dominio personalizado

### **Monitoreo**
1. **Logs**: Service → Logs
2. **Métricas**: Service → Metrics
3. **Alertas**: Service → Alerts

## 🐛 **Solución de Problemas**

### **Error: Build Failed**
- Verificar que `Dockerfile.render` existe
- Revisar logs de build
- Verificar dependencias en `package.json`

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

## 📊 **Monitoreo Post-Deploy**

### **Métricas Importantes:**
- **CPU Usage**: Debe estar bajo 50%
- **Memory Usage**: Debe estar bajo 400MB
- **Response Time**: Debe estar bajo 2s
- **Error Rate**: Debe estar en 0%

### **Logs a Revisar:**
- **Application Logs**: Errores de la aplicación
- **Build Logs**: Errores de construcción
- **Deploy Logs**: Errores de despliegue

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
