-- UrbanPets - Usuarios publicos y roles
-- Supabase Auth maneja correo, contrasena, login y sesion.
-- Esta tabla publica maneja datos de perfil, rol y estado.

create extension if not exists "uuid-ossp";

create table if not exists public.usuarios (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  nombre text not null,
  correo text not null unique,
  telefono text,
  rol text not null default 'cliente' check (rol in ('administrador', 'trabajador', 'cliente')),
  activo boolean not null default true,
  creado_en timestamp with time zone not null default now()
);

create index if not exists idx_usuarios_auth_user_id on public.usuarios(auth_user_id);
create index if not exists idx_usuarios_correo on public.usuarios(correo);
create index if not exists idx_usuarios_rol on public.usuarios(rol);

alter table public.usuarios enable row level security;

drop policy if exists "Usuarios demo select" on public.usuarios;
drop policy if exists "Usuarios demo insert" on public.usuarios;
drop policy if exists "Usuarios demo update" on public.usuarios;
drop policy if exists "Usuarios demo delete" on public.usuarios;

-- Politicas abiertas para demo academica.
-- En produccion, restringir por auth.uid() y rol administrador.
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

-- Usuarios demo:
-- Primero crea estos usuarios en Supabase Authentication:
-- admin@urbanpets.com
-- trabajador@urbanpets.com
-- cliente@urbanpets.com
--
-- Luego ejecuta este insert. Vincula por correo desde auth.users.

insert into public.usuarios (auth_user_id, nombre, correo, telefono, rol, activo)
select id, 'Administrador UrbanPets', email, '', 'administrador', true
from auth.users
where email = 'admin@urbanpets.com'
on conflict (correo) do update set
  auth_user_id = excluded.auth_user_id,
  nombre = excluded.nombre,
  rol = excluded.rol,
  activo = excluded.activo;

insert into public.usuarios (auth_user_id, nombre, correo, telefono, rol, activo)
select id, 'Trabajador UrbanPets', email, '', 'trabajador', true
from auth.users
where email = 'trabajador@urbanpets.com'
on conflict (correo) do update set
  auth_user_id = excluded.auth_user_id,
  nombre = excluded.nombre,
  rol = excluded.rol,
  activo = excluded.activo;

insert into public.usuarios (auth_user_id, nombre, correo, telefono, rol, activo)
select id, 'Cliente Demo', email, '', 'cliente', true
from auth.users
where email = 'cliente@urbanpets.com'
on conflict (correo) do update set
  auth_user_id = excluded.auth_user_id,
  nombre = excluded.nombre,
  rol = excluded.rol,
  activo = excluded.activo;
