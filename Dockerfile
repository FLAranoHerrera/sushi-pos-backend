# ===========================================
# SUSHI POS BACKEND - DOCKERFILE PARA RENDER
# ===========================================

# Usar imagen base de Node.js
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Limpiar dependencias de desarrollo
RUN npm ci --only=production && npm cache clean --force

# Cambiar propietario de archivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["node", "dist/main.js"]
