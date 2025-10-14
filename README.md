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

</div>

---

## 🚀 Características principales

- ✅ Arquitectura modular basada en **NestJS**  
- ✅ Conexión con **PostgreSQL** usando **TypeORM**  
- ✅ Autenticación y autorización con **JWT + Roles**  
- ✅ CRUDs completos para productos, categorías, subcategorías y extras  
- ✅ Documentación automática con **Swagger**  
- ✅ Validación de datos con **class-validator**  
- ✅ Listo para desplegar con **Docker (configuración futura)**  

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

---

## ⚙️ Configuración del entorno

El proyecto incluye archivos de configuración separados para desarrollo y producción:

### **Desarrollo Local**
```bash
# Usar configuración de desarrollo (PostgreSQL local)
cp .env.dev .env
npm run start:dev
```

### **Producción Local (con Neon)**
```bash
# Usar configuración de producción (Neon DB)
cp .env.prod .env
npm run start:dev
```

### **Archivos de Configuración**
- **`.env.dev`**: Configuración para desarrollo (PostgreSQL local)
- **`.env.prod`**: Configuración para producción (Neon DB)
- **`.env`**: Archivo temporal (se crea automáticamente)

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


🧠 Instalación y ejecución

# 1️⃣ Clonar el repositorio
git clone https://github.com/<tu_usuario>/sushi-pos-backend.git
cd sushi-pos-backend

# 2️⃣ Instalar dependencias
npm install

# 3️⃣ Ejecutar en modo desarrollo
npm run start:dev

# 4️⃣ Acceder a la documentación Swagger
http://localhost:3000/docs


📂 Estructura del proyecto

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
│   │   └── orders/
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


🗃️ Base de datos
La estructura relacional mantiene la coherencia entre módulos:

Category → Subcategory → Product → Extras
User → Order → OrderItem

🧩 Cada entidad está diseñada para mantener escalabilidad, coherencia y facilidad de integración con el frontend.


📘 Endpoints principales

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

🧪 Scripts útiles

# Modo desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar app compilada
npm run start:prod

# Formatear código
npm run format


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

## 🌱 Próximas mejoras
✅ ~~Integración con Cloudinary para carga de imágenes~~ **COMPLETADO**
🚧 Implementación de seeders automáticos (categorías, productos, roles)
🐳 Configuración de Docker Compose para entorno completo (API + DB)
🧾 Generación de reportes y dashboard de ventas
📊 Sistema de inventario en tiempo real
💳 Integración con sistemas de pago

---

## 👨‍💻 Autor

**Francisco Leonardo Arano Herrera**

Desarrollador Fullstack especializado en Backend con NestJS

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francisco-leonardo-arano-herrera-540198169)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FLAranoHerrera)

**Stack Tecnológico:**
- 🚀 **Backend**: Node.js, NestJS, TypeScript, PostgreSQL
- 🎨 **Frontend**: React, HTML, CSS, JavaScript
- ☁️ **Cloud**: Cloudinary, Docker, GitHub Actions
- 🛠️ **Tools**: VSCode, Postman, Xcode, Git

