🍣 Sushi POS Backend





Backend para un sistema de punto de venta (POS) de restaurante japonés.
Construido con NestJS + PostgreSQL + TypeORM, documentado con Swagger, y diseñado con arquitectura modular limpia y escalable.
🚀 Características principales
✅ Arquitectura modular basada en NestJS
✅ Conexión con PostgreSQL usando TypeORM
✅ Autenticación y autorización con JWT + Roles
✅ CRUDs completos para productos, categorías, subcategorías y extras
✅ Documentación automática con Swagger
✅ Validación de datos con class-validator
✅ Listo para desplegar con Docker (configuración futura)
🧩 Módulos incluidos
Módulo	Descripción
🧑‍💻 Auth	Registro, login y manejo de tokens JWT
👥 Users	Gestión de usuarios del sistema
🧱 Roles	Control de permisos y roles
🍣 Products	CRUD de productos con subcategorías y extras
🗂️ Categories / Subcategories	Clasificación jerárquica de productos
➕ Extras	Adiciones opcionales en los productos
🧾 Orders	Creación y detalle de pedidos
⚙️ Configuración del entorno
Crea un archivo .env en la raíz del proyecto con las variables:
# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_password
DB_NAME=sushipos_db

# JWT
JWT_SECRET=supersecreto123
JWT_EXPIRES=1d
🧠 Instalación y ejecución
# 1️⃣ Clonar el repositorio
git clone https://github.com/<tu_usuario>/sushi-pos-backend.git
cd sushi-pos-backend

# 2️⃣ Instalar dependencias
npm install

# 3️⃣ Ejecutar en modo desarrollo
npm run start:dev

# 4️⃣ Acceder a la documentación Swagger
http://localhost:3000/api
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
El modelo sigue una estructura relacional clara:
Category → Subcategory → Product → Extras
User → Order → OrderItem
🧩 Cada entidad está diseñada para mantener coherencia, escalabilidad y facilitar futuras integraciones con el frontend.
📘 Endpoints principales
Método	Endpoint	Descripción
POST	/auth/signup	Crear cuenta
POST	/auth/login	Iniciar sesión
GET	/products	Listar productos
POST	/products	Crear producto
GET	/orders/:id	Obtener orden por ID
GET	/extras	Listar extras disponibles
Todos los endpoints están documentados en Swagger (/api).
🧪 Scripts útiles
# Modo desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar app compilada
npm run start:prod

# Formatear código
npm run format
🌱 Próximas mejoras
🚧 Implementación de seeders automáticos (categorías, subcategorías, productos y roles).
📦 Integración con Cloudinary para carga de imágenes.
🐳 Configuración de Docker Compose para entorno completo (API + DB).
🧾 Generación de reportes y dashboard de ventas.
👨‍💻 Autor
Francisco Leonardo Arano Herrera
💼 Fullstack Developer | NestJS • React • PostgreSQL
📍 Cancún, México
🌐 GitHub
💼 LinkedIn