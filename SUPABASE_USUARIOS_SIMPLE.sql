-- UrbanPets - Login academico simple con tabla publica usuarios
-- Este archivo NO usa Supabase Authentication.
-- Las contrasenas se guardan en texto plano solo para demo academica.

drop table if exists public.usuarios cascade;

create table public.usuarios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text not null unique,
  telefono text,
  contrasena text not null,
  rol text not null check (rol in ('administrador', 'trabajador', 'cliente')),
  activo boolean not null default true,
  creado_en timestamp with time zone not null default now()
);

create index idx_usuarios_correo on public.usuarios(correo);
create index idx_usuarios_rol on public.usuarios(rol);
create index idx_usuarios_activo on public.usuarios(activo);

alter table public.usuarios enable row level security;

drop policy if exists "Usuarios demo select" on public.usuarios;
drop policy if exists "Usuarios demo insert" on public.usuarios;
drop policy if exists "Usuarios demo update" on public.usuarios;
drop policy if exists "Usuarios demo delete" on public.usuarios;

-- Politicas abiertas para demo academica.
-- En produccion se debe usar Supabase Auth, hashes de contrasena y politicas por rol.
create policy "Usuarios demo select" on public.usuarios
  for select
  using (true);

create policy "Usuarios demo insert" on public.usuarios
  for insert
  with check (true);

create policy "Usuarios demo update" on public.usuarios
  for update
  using (true)
  with check (true);

create policy "Usuarios demo delete" on public.usuarios
  for delete
  using (true);

insert into public.usuarios (nombre, correo, telefono, contrasena, rol, activo)
values
  ('Administrador UrbanPets', 'admin@urbanpets.com', '70000001', 'Admin123456', 'administrador', true),
  ('Trabajador UrbanPets', 'trabajador@urbanpets.com', '70000002', 'Trabajador123456', 'trabajador', true),
  ('Cliente UrbanPets', 'cliente@urbanpets.com', '70000003', 'Cliente123456', 'cliente', true);
