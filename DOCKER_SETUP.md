# 🐳 Docker Setup - Sushi POS Backend

## Configuración de Docker para Desarrollo y Producción

### 📋 **Requisitos**
- Docker Desktop instalado y funcionando
- Cuenta de Docker Hub (opcional, para push de imágenes)

### 🚀 **Comandos Rápidos**

#### **Desarrollo Local**
```bash
# Opción 1: Script automático
npm run docker:dev
# o
./docker-dev.sh

# Opción 2: Comandos manuales
docker-compose up --build
```

#### **Producción**
```bash
# Opción 1: Script automático
npm run docker:prod
# o
./docker-prod.sh

# Opción 2: Comandos manuales
docker-compose -f docker-compose.prod.yml up --build
```

### 📁 **Archivos de Configuración**

| Archivo | Descripción |
|---------|-------------|
| `Dockerfile` | Imagen multi-stage para NestJS |
| `docker-compose.yml` | Desarrollo con PostgreSQL local |
| `docker-compose.prod.yml` | Producción con Neon DB |
| `.dockerignore` | Archivos a excluir de la imagen |
| `.env.docker` | Variables para Docker |

### 🔧 **Servicios Incluidos**

#### **Desarrollo (`docker-compose.yml`)**
- **postgres**: PostgreSQL 15 con datos persistentes
- **app**: Aplicación NestJS
- **seeder**: Ejecuta seeders automáticamente

#### **Producción (`docker-compose.prod.yml`)**
- **app**: Aplicación NestJS con Neon DB
- **seeder**: Ejecuta seeders en producción

### 📊 **Puertos Expuestos**

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| API | 3000 | Aplicación NestJS |
| PostgreSQL | 5432 | Base de datos (solo desarrollo) |

### 🌱 **Seeders Automáticos**

Los seeders se ejecutan automáticamente al iniciar los contenedores:

```bash
# Ejecutar seeders manualmente
docker-compose --profile seeder run --rm seeder

# Para producción
docker-compose -f docker-compose.prod.yml --profile seeder run --rm seeder
```

### 📋 **Comandos Útiles**

```bash
# Ver logs en tiempo real
npm run docker:logs
# o
docker-compose logs -f

# Parar todos los servicios
npm run docker:down
# o
docker-compose down

# Reconstruir imágenes
npm run docker:build
# o
docker-compose build

# Acceder al contenedor
docker exec -it sushi-pos-app sh

# Ver contenedores corriendo
docker ps

# Limpiar volúmenes (CUIDADO: borra datos)
docker-compose down -v
```

### 🔍 **Verificación**

Después de iniciar los servicios:

1. **API**: http://localhost:3000
2. **Swagger**: http://localhost:3000/docs
3. **Health Check**: http://localhost:3000/health
4. **Base de datos**: localhost:5432 (solo desarrollo)

### 🐛 **Solución de Problemas**

#### **Error: Puerto ya en uso**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
lsof -i :5432

# Parar servicios
docker-compose down
```

#### **Error: Base de datos no conecta**
```bash
# Verificar que PostgreSQL esté corriendo
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart
```

#### **Error: Imagen no se construye**
```bash
# Limpiar caché de Docker
docker system prune -a

# Reconstruir sin caché
docker-compose build --no-cache
```

### 📦 **Push a Docker Hub**

```bash
# Construir imagen
docker build -t tu-usuario/sushi-pos-backend:latest .

# Hacer push
docker push tu-usuario/sushi-pos-backend:latest
```

### 🔒 **Seguridad**

- ✅ Usuario no-root en contenedor
- ✅ Variables de entorno para secretos
- ✅ Red aislada entre servicios
- ✅ Volúmenes persistentes para datos
