-- ========== PUBLICACIONES TABLE ==========
-- Tabla para gestionar contenido editable de la plataforma

CREATE TABLE IF NOT EXISTS publicaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  imagen TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('hero', 'beneficio', 'testimonio', 'promocion')),
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_publicaciones_tipo ON publicaciones(tipo);
CREATE INDEX IF NOT EXISTS idx_publicaciones_activo ON publicaciones(activo);

-- ========== ROW LEVEL SECURITY (RLS) ==========
-- Activar RLS en la tabla
ALTER TABLE publicaciones ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública de publicaciones activas (sin autenticación)
CREATE POLICY "Publicaciones activas: SELECT para todos" ON publicaciones
  FOR SELECT
  USING (activo = true);

-- Política para administración completa (SOLO PARA DEMOSTRACIÓN ACADÉMICA)
-- En producción, reemplazar con roles y autenticación real
CREATE POLICY "Publicaciones: INSERT para anon (DEMO)" ON publicaciones
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Publicaciones: UPDATE para anon (DEMO)" ON publicaciones
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Publicaciones: DELETE para anon (DEMO)" ON publicaciones
  FOR DELETE
  USING (true);

-- ========== NOTAS IMPORTANTES ==========
-- ⚠️ ADVERTENCIA: Las políticas anteriores permiten acceso anónimo completo.
-- Esto es SOLO para propósitos académicos y de demostración.
-- 
-- EN PRODUCCIÓN:
-- 1. Implementar Supabase Auth (signup/login)
-- 2. Crear roles (admin, usuario)
-- 3. Limitar permisos según roles:
--    - Usuario anónimo: solo lectura de publicaciones activas
--    - Usuario autenticado: lectura de publicaciones activas
--    - Admin: acceso completo
-- 4. Usar JWT tokens para autenticación
-- 5. Auditoría de cambios (created_by, updated_by)
--
-- REFERENCIAS:
-- - Supabase Auth: https://supabase.com/docs/guides/auth
-- - RLS Policies: https://supabase.com/docs/guides/auth/row-level-security
-- - PostgreSQL Security: https://www.postgresql.org/docs/current/sql-grant.html
