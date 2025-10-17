<p align="center">
  <img src="./assets/banner-sushi-pos.png" alt="Sushi POS Backend Banner" width="800"/>
</p>

<div align="center">    

# 🍣 Sushi POS Backend  
**API Backend del Sistema de Punto de Venta**

_Construido con **NestJS + PostgreSQL + TypeORM + Stripe**, documentado con **Swagger**, y diseñado con arquitectura modular, limpia y escalable._

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF6C37?style=for-the-badge&logo=typeorm&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E5FF?style=for-the-badge&logo=neon&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://sushi-pos-backend.onrender.com)
[![Live API](https://img.shields.io/badge/Live%20API-Online-00C851?style=for-the-badge)](https://sushi-pos-backend.onrender.com/docs)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-00C851?style=for-the-badge)](https://sushi-pos-backend.onrender.com)

</div>

## 📋 Tabla de Contenidos

- [🚀 Características principales](#-características-principales)
- [🧩 Módulos incluidos](#-módulos-incluidos)
- [⚙️ Configuración del entorno](#️-configuración-del-entorno)
- [🚀 Instalación y ejecución](#-instalación-y-ejecución)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [🗃️ Base de datos](#️-base-de-datos)
- [📘 Endpoints principales](#-endpoints-principales)
- [🧪 Scripts útiles](#-scripts-útiles)
- [🖼️ Carga de Imágenes](#️-carga-de-imágenes)
- [⏰ Módulo de Asistencia](#-módulo-de-asistencia-attendance)
- [🚀 Despliegue en Render](#-despliegue-en-render)
- [🐳 Docker](#-docker)
- [🧪 Testing](#-testing)
- [🔒 Seguridad](#-seguridad)
- [🌱 Próximas mejoras](#-próximas-mejoras)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [👨‍💻 Autor](#-autor)
- [📄 Licencia](#-licencia)
- [🤝 Contribuciones](#-contribuciones)
- [📊 Estadísticas del Proyecto](#-estadísticas-del-proyecto)

---

## 🚀 Características principales

- ✅ Arquitectura modular basada en **NestJS**  
- ✅ Conexión con **PostgreSQL** usando **TypeORM**  
- ✅ Autenticación y autorización con **JWT + Roles**  
- ✅ CRUDs completos para productos, categorías, subcategorías y extras  
- ✅ Documentación automática con **Swagger**  
- ✅ Validación de datos con **class-validator**  
- ✅ **Desplegado en Render** con Docker y Node.js
- ✅ **Base de datos en Neon** PostgreSQL
- ✅ **CDN de imágenes** con Cloudinary  

---

## 🧩 Módulos incluidos

| Módulo | Descripción |
|--------|--------------|
| 🧑‍💻 **Auth** | Registro, login y manejo de tokens JWT |
| 👥 **Users** | Gestión de usuarios del sistema |
| 🧱 **Roles** | Control de permisos y roles |
| 🍣 **Products** | CRUD de productos con subcategorías y extras |
| 🗂️ **Categories / Subcategories** | Clasificación jerárquica de productos |
| ➕ **Extras** | Adiciones opcionales en los productos |
| 🧾 **Orders** | Creación y detalle de pedidos |
| 📁 **Files** | Carga y gestión de imágenes con Cloudinary |
| ⏰ **Attendance** | Sistema de control de asistencia de empleados |

---

## ⚙️ Configuración del entorno

El proyecto incluye archivos de configuración separados para desarrollo y producción:

### **Desarrollo Local**
```bash
# Opción 1: Script automático
./start-dev.sh

# Opción 2: Manual
ENV_FILE=dev npm run start:dev
```

### **Producción Local (con Neon)**
```bash
# Opción 1: Script automático
./start-prod.sh

# Opción 2: Manual
ENV_FILE=prod npm run start:dev
```

### **Archivos de Configuración**
- **`.env.dev`**: Configuración para desarrollo (PostgreSQL local)
- **`.env.prod`**: Configuración para producción (Neon DB)
- **Sin archivos temporales**: La aplicación lee directamente los archivos específicos

### **Variables de Entorno**
```env
# Base de Datos (desarrollo)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=sushi_pos

# Base de Datos (producción)
DATABASE_URL=postgresql://usuario:password@host:5432/database?sslmode=require

# JWT
JWT_SECRET=tu_jwt_secreto_super_seguro_aqui
JWT_EXPIRES=7d

# Cloudinary (para carga de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# URLs
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/FLAranoHerrera/sushi-pos-backend.git
cd sushi-pos-backend
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo
```bash
npm run start:dev
```

### 4️⃣ Acceder a la documentación Swagger
```
# Desarrollo local
http://localhost:3000/docs

# Producción (Render)
https://sushi-pos-backend.onrender.com/docs
```

### 🌐 **API en Producción**
- **URL Base**: `https://sushi-pos-backend.onrender.com/api`
- **Documentación**: `https://sushi-pos-backend.onrender.com/docs`
- **Health Check**: `https://sushi-pos-backend.onrender.com/api`

---

## 📂 Estructura del proyecto

```
sushi-pos-backend/
│
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── categories/
│   │   ├── subcategories/
│   │   ├── extras/
│   │   ├── products/
│   │   ├── orders/
│   │   └── attendance/
│   ├── common/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── filters/
│   │   ├── pipes/
│   │   ├── interceptors/
│   │   └── modules/
│   ├── config/
│   │   └── orm.config.ts
│   ├── main.ts
│   └── app.module.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗃️ Base de datos

La estructura relacional mantiene la coherencia entre módulos:

```
Category → Subcategory → Product → Extras
User → Order → OrderItem
```

🧩 Cada entidad está diseñada para mantener escalabilidad, coherencia y facilidad de integración con el frontend.

---

## 📘 Endpoints principales

| Método | Endpoint       | Descripción               |
| ------ | -------------- | ------------------------- |
| `POST` | `/auth/signup` | Crear cuenta              |
| `POST` | `/auth/login`  | Iniciar sesión            |
| `GET`  | `/products`    | Listar productos          |
| `POST` | `/products`    | Crear producto            |
| `GET`  | `/orders/:id`  | Obtener orden por ID      |
| `GET`  | `/extras`      | Listar extras disponibles |
| `POST` | `/products/:id/image` | Subir imagen a producto |
| `POST` | `/files/upload` | Subir imagen general |
| `POST` | `/attendance/check-in/:employeeId` | Registrar entrada |
| `POST` | `/attendance/check-out/:employeeId` | Registrar salida |
| `GET`  | `/attendance/employee/:employeeId` | Historial por empleado |
| `GET`  | `/attendance` | Todos los registros (ADMIN) |
| `GET`  | `/attendance/stats/overview` | Estadísticas (ADMIN) |

---

## 🧪 Scripts útiles

```bash
# Modo desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar app compilada
npm run start:prod

# Formatear código
npm run format
```


## 🖼️ Carga de Imágenes

El sistema incluye integración completa con **Cloudinary** para la gestión de imágenes:

- ✅ **Subida de imágenes** a productos específicos
- ✅ **Validación automática** de tipos y tamaños de archivo
- ✅ **Optimización automática** de imágenes
- ✅ **Gestión de carpetas** organizadas
- ✅ **Eliminación automática** de imágenes anteriores

### Endpoints de Imágenes:
- `POST /api/products/{id}/image` - Subir imagen a producto
- `POST /api/files/upload` - Subir imagen general

---

## ⏰ Módulo de Asistencia (Attendance)

El sistema incluye un módulo completo de control de asistencia para empleados:

### **Funcionalidades:**
- ✅ **Check-in/Check-out** automático de empleados
- ✅ **Cálculo automático** de horas trabajadas
- ✅ **Estados automáticos** (on_time, late, absent, extra_hours)
- ✅ **Historial completo** por empleado
- ✅ **Estadísticas generales** para administradores
- ✅ **Gestión completa** (solo ADMIN)

### **Endpoints de Asistencia:**
- `POST /api/attendance/check-in/:employeeId` - Registrar entrada
- `POST /api/attendance/check-out/:employeeId` - Registrar salida
- `GET /api/attendance/employee/:employeeId` - Historial por empleado
- `GET /api/attendance` - Todos los registros (solo ADMIN)
- `GET /api/attendance/stats/overview` - Estadísticas (solo ADMIN)
- `PUT /api/attendance/:id` - Actualizar registro (solo ADMIN)
- `DELETE /api/attendance/:id` - Eliminar registro (solo ADMIN)

### **Permisos por Rol:**
- **MESERO**: Puede hacer check-in/check-out y ver su propio historial
- **ADMIN**: Acceso completo a todas las funcionalidades

---

## 🚀 Despliegue en Render

El proyecto está **completamente desplegado** y funcionando en producción:

### **🌐 URLs de Producción**
- **API Backend**: `https://sushi-pos-backend.onrender.com`
- **Documentación Swagger**: `https://sushi-pos-backend.onrender.com/docs`
- **Health Check**: `https://sushi-pos-backend.onrender.com/api`

### **🏗️ Arquitectura de Producción**
- **Hosting**: Render.com (Plan Starter)
- **Runtime**: Node.js 20
- **Base de Datos**: Neon PostgreSQL
- **CDN**: Cloudinary para imágenes
- **Containerización**: Docker

### **⚙️ Configuración de Producción**
```yaml
# render.yaml
services:
  - type: web
    name: sushi-pos-backend
    env: node
    plan: starter
    runtime: node20
    buildCommand: npm ci && npm run build
    startCommand: npm run start:prod
    healthCheckPath: /docs
```

### **🔧 Variables de Entorno en Producción**
- `NODE_ENV=production`
- `DATABASE_URL` (Neon PostgreSQL)
- `JWT_SECRET` (Generado automáticamente)
- `CLOUDINARY_*` (Configurado)
- `STRIPE_*` (Para pagos)

---

## 🐳 Docker

El proyecto incluye configuración completa de Docker para desarrollo y producción:

### **Desarrollo con Docker**
```bash
# Construir y ejecutar en modo desarrollo
docker-compose up --build

# Ejecutar solo la base de datos
docker-compose up postgres

# Ejecutar seeders
docker-compose run --rm seeder
```

### **Producción con Docker**
```bash
# Construir para producción
docker-compose -f docker-compose.prod.yml up --build

# Variables de entorno requeridas
DATABASE_URL=postgresql://usuario:password@host:5432/database
JWT_SECRET=tu_jwt_secreto_super_seguro
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### **Servicios Docker**
- **PostgreSQL 15**: Base de datos principal
- **NestJS App**: Aplicación backend
- **Seeder**: Poblado inicial de datos

---

## 🧪 Testing

### **Ejecutar Tests**
```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e

# Tests en modo watch
npm run test:watch
```

### **Cobertura de Tests**
- **Objetivo**: >80% de cobertura
- **Frameworks**: Jest + Supertest
- **Configuración**: `jest.config.js`

---

## 🔒 Seguridad

### **Autenticación y Autorización**
- ✅ **JWT Tokens** con expiración configurable
- ✅ **Roles y permisos** (ADMIN, MESERO)
- ✅ **Guards personalizados** para protección de rutas
- ✅ **Validación de datos** con class-validator
- ✅ **Rate limiting** configurado (100 req/min)

### **Protección de Datos**
- ✅ **Encriptación de contraseñas** con bcrypt
- ✅ **Variables de entorno** seguras
- ✅ **CORS configurado** para dominios específicos
- ✅ **Sanitización de entrada** automática

### **Mejores Prácticas**
- 🔐 **Secrets en variables de entorno**
- 🛡️ **Validación de entrada estricta**
- 📝 **Logging de seguridad**
- 🔄 **Tokens con expiración**

---

## 🌱 Próximas mejoras

### ✅ **Completado**
- ~~Integración con Cloudinary para carga de imágenes~~ **COMPLETADO**
- ~~Módulo de Asistencia (Attendance)~~ **COMPLETADO**
- ~~Configuración de Docker Compose~~ **COMPLETADO**
- ~~Sistema de seeders automáticos~~ **COMPLETADO**
- ~~Despliegue en Render~~ **COMPLETADO**
- ~~Configuración de producción~~ **COMPLETADO**

### 🚧 **En Progreso**
- 🧪 **Testing completo** - Implementación de tests unitarios y e2e
- 📊 **Métricas y monitoreo** - Dashboard de rendimiento
- 🔒 **Auditoría de seguridad** - Revisión completa de seguridad

### 📋 **Próximas Funcionalidades**
- 🧾 **Generación de reportes** y dashboard de ventas
- 📊 **Sistema de inventario** en tiempo real
- 💳 **Integración avanzada** con sistemas de pago
- 🔔 **Notificaciones en tiempo real** con WebSockets
- 📱 **API móvil optimizada** para tablets
- 🌐 **Internacionalización** (i18n)
- 📈 **Analytics avanzados** de ventas
- 🔄 **Sincronización offline** para tablets

---

## 🛠️ Troubleshooting

### **Problemas Comunes**

#### **Error de conexión a la base de datos**
```bash
# Verificar que PostgreSQL esté ejecutándose
docker-compose ps

# Reiniciar servicios
docker-compose down && docker-compose up -d
```

#### **Error de variables de entorno**
```bash
# Verificar archivos .env
ls -la .env*

# Cargar variables correctamente
source .env.dev
```

#### **Problemas con Cloudinary**
```bash
# Verificar credenciales
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY
```

#### **Error de permisos en Docker**
```bash
# Cambiar permisos
sudo chown -R $USER:$USER .
```

### **Logs y Debugging**
```bash
# Ver logs de la aplicación
docker-compose logs -f app

# Ver logs de la base de datos
docker-compose logs -f postgres

# Modo debug
npm run start:debug
```

---

## 👨‍💻 Autor

**Francisco Leonardo Arano Herrera**

Desarrollador Fullstack especializado en Backend con NestJS y arquitecturas escalables.

### **Contacto**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francisco-leonardo-arano-herrera-540198169)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FLAranoHerrera)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:francisco.arano.herrera@gmail.com)

### **Stack Tecnológico**
- 🚀 **Backend**: Node.js, NestJS, TypeScript, PostgreSQL, TypeORM
- 🎨 **Frontend**: React, Next.js, HTML, CSS, JavaScript, TypeScript
- ☁️ **Cloud**: Cloudinary, Docker, GitHub Actions, Render, Neon
- 🛠️ **Tools**: VSCode, Postman, Xcode, Git, Docker
- 🔒 **Seguridad**: JWT, bcrypt, CORS, Rate Limiting
- 📊 **Testing**: Jest, Supertest, Coverage

### **Especialidades**
- 🏗️ **Arquitectura de Software** - Diseño de sistemas escalables
- 🔐 **Seguridad Backend** - Implementación de autenticación y autorización
- 🗄️ **Bases de Datos** - Diseño de esquemas relacionales optimizados
- 🐳 **DevOps** - Containerización y despliegue automatizado
- 📱 **APIs REST** - Diseño de APIs robustas y documentadas

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/FLAranoHerrera/sushi-pos-backend?style=social)
![GitHub forks](https://img.shields.io/github/forks/FLAranoHerrera/sushi-pos-backend?style=social)
![GitHub issues](https://img.shields.io/github/issues/FLAranoHerrera/sushi-pos-backend)
![GitHub pull requests](https://img.shields.io/github/issues-pr/FLAranoHerrera/sushi-pos-backend)

---

<div align="center">
  <p>Hecho con ❤️ por <strong>Francisco Leonardo Arano Herrera</strong></p>
  <p>⭐ Si te gusta este proyecto, ¡dale una estrella!</p>
</div>

