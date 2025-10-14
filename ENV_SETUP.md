# Configuración de Variables de Entorno

## Estructura de Archivos

Este proyecto utiliza una configuración simplificada con solo 2 archivos de variables de entorno:

- **`.env`** - Para desarrollo local (PostgreSQL local)
- **`.env.prod`** - Para producción (Neon Database)

## Uso

### Desarrollo Local

```bash
# Iniciar aplicación en desarrollo
npm run dev
# o
./start-dev.sh

# Ejecutar seeders en desarrollo
npm run seed:dev
# o
./seed-dev.sh
```

### Producción

```bash
# Iniciar aplicación en producción
npm run prod
# o
./start-prod.sh

# Ejecutar seeders en producción
npm run seed:prod
# o
./seed-prod.sh
```

## Configuración de Base de Datos

### Desarrollo Local (.env)
```env
# Base de Datos Local
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=sushi_pos
```

### Producción (.env.prod)
```env
# Base de Datos Neon
DATABASE_URL=postgresql://usuario:password@host:puerto/database?sslmode=require
```

## Solución de Problemas

### Error de Conexión a Neon
1. Verifica que la `DATABASE_URL` en `.env.prod` sea correcta
2. Asegúrate de que la base de datos Neon esté activa
3. Verifica que el SSL esté configurado correctamente

### Error de Seeders
1. Ejecuta `npm run seed:dev` para desarrollo local
2. Ejecuta `npm run seed:prod` para producción
3. Verifica que las variables de entorno estén cargadas correctamente

## Scripts Disponibles

- `npm run dev` - Inicia en modo desarrollo
- `npm run prod` - Inicia en modo producción
- `npm run seed:dev` - Ejecuta seeders en desarrollo
- `npm run seed:prod` - Ejecuta seeders en producción
