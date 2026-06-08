-- UrbanPets V2 - Auth, perfiles y politicas demo
-- Ejecutar despues de la estructura base existente.
-- Demo academica: algunas politicas son abiertas para facilitar pruebas con anon/authenticated.

create extension if not exists "uuid-ossp";

create table if not exists perfiles (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  nombre text not null,
  correo text not null,
  rol text not null default 'cliente' check (rol in ('administrador', 'trabajador', 'cliente')),
  activo boolean default true,
  creado_en timestamp with time zone default now()
);

create index if not exists idx_perfiles_auth_user_id on perfiles(auth_user_id);
create index if not exists idx_perfiles_rol on perfiles(rol);

alter table perfiles enable row level security;

drop policy if exists "Perfiles demo select" on perfiles;
drop policy if exists "Perfiles demo insert" on perfiles;
drop policy if exists "Perfiles demo update" on perfiles;

create policy "Perfiles demo select" on perfiles
  for select
  using (true);

create policy "Perfiles demo insert" on perfiles
  for insert
  with check (true);

create policy "Perfiles demo update" on perfiles
  for update
  using (true)
  with check (true);

-- Politicas demo para tablas operativas.
-- En produccion, reemplazar por reglas basadas en auth.uid() y rol del perfil.
alter table categorias enable row level security;
alter table servicios enable row level security;
alter table clientes enable row level security;
alter table mascotas enable row level security;
alter table pedidos enable row level security;
alter table pedido_detalle enable row level security;

drop policy if exists "Categorias demo all" on categorias;
drop policy if exists "Servicios demo all" on servicios;
drop policy if exists "Clientes demo all" on clientes;
drop policy if exists "Mascotas demo all" on mascotas;
drop policy if exists "Pedidos demo all" on pedidos;
drop policy if exists "Pedido detalle demo all" on pedido_detalle;

create policy "Categorias demo all" on categorias for all using (true) with check (true);
create policy "Servicios demo all" on servicios for all using (true) with check (true);
create policy "Clientes demo all" on clientes for all using (true) with check (true);
create policy "Mascotas demo all" on mascotas for all using (true) with check (true);
create policy "Pedidos demo all" on pedidos for all using (true) with check (true);
create policy "Pedido detalle demo all" on pedido_detalle for all using (true) with check (true);

-- Usuarios demo sugeridos para crear manualmente en Supabase Auth:
-- administrador@urbanpets.demo / UrbanPets123!
-- trabajador@urbanpets.demo / UrbanPets123!
-- cliente@urbanpets.demo / UrbanPets123!
--
-- Luego copiar los auth.users.id generados y crear perfiles:
-- insert into perfiles (auth_user_id, nombre, correo, rol, activo)
-- values
-- ('UUID_AUTH_ADMIN', 'Admin UrbanPets', 'administrador@urbanpets.demo', 'administrador', true),
-- ('UUID_AUTH_TRABAJADOR', 'Trabajador UrbanPets', 'trabajador@urbanpets.demo', 'trabajador', true),
-- ('UUID_AUTH_CLIENTE', 'Cliente Demo', 'cliente@urbanpets.demo', 'cliente', true);
