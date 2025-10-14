-- ===========================================
-- SUSHI POS BACKEND - INITIALIZATION SQL
-- ===========================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS sushi_pos;

-- Usar la base de datos
\c sushi_pos;

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Configurar timezone
SET timezone = 'UTC';
