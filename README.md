# UrbanPets

UrbanPets es una plataforma MVP para contratación de servicios de peluquería canina, hotel, guardería, spa y cuidado de mascotas en Cochabamba.

## Objetivo académico

Crear una aplicación web moderna con React, Vite, Material UI, Supabase y persistencia local para practicar arquitectura de frontend y despliegue en GitHub Pages.

## Tecnologías usadas

- React
- Vite
- JavaScript/JSX
- Material UI
- React Router DOM
- Supabase
- localStorage
- GitHub Pages

## Funcionalidades

- Listado de servicios desde Supabase
- Filtros por categoría
- Búsqueda en tiempo real
- Carrito de servicios
- Checkout con datos de cliente y mascota
- Inserción de pedidos en Supabase
- Modo claro/oscuro
- Formulario de contacto

## Estructura del proyecto

- `src/app` - Rutas y configuración de la app
- `src/providers` - Context y proveedores globales
- `src/components` - Componentes UI reutilizables
- `src/pages` - Páginas principales
- `src/utils` - Utilidades compartidas
- `src/lib` - Cliente de Supabase
- `src/theme` - Temas de Material UI

## Variables de entorno

Copiar `.env.example` a `.env.local` y pegar tus credenciales de Supabase:

```env
VITE_SUPABASE_URL="https://tu-proyecto.supabase.co"
VITE_SUPABASE_ANON_KEY="tu-anon-key"
```

## SQL necesario para Supabase

```sql
create table categorias (
  id uuid primary key default uuid_generate_v4(),
  nombre text not null,
  descripcion text,
  creado_en timestamp with time zone default now()
);

create table servicios (
  id uuid primary key default uuid_generate_v4(),
  categoria_id uuid references categorias(id),
  titulo text not null,
  descripcion text,
  precio numeric not null,
  duracion_minutos integer,
  imagen text,
  activo boolean default true,
  creado_en timestamp with time zone default now()
);

create table clientes (
  id uuid primary key default uuid_generate_v4(),
  nombre text not null,
  correo text not null,
  telefono text not null,
  creado_en timestamp with time zone default now()
);

create table mascotas (
  id uuid primary key default uuid_generate_v4(),
  cliente_id uuid references clientes(id),
  nombre text not null,
  raza text,
  edad text,
  peso text,
  notas text,
  creado_en timestamp with time zone default now()
);

create table pedidos (
  id uuid primary key default uuid_generate_v4(),
  cliente_id uuid references clientes(id),
  mascota_id uuid references mascotas(id),
  fecha_preferida date,
  hora_preferida text,
  mensaje text,
  total numeric,
  estado text default 'Pendiente',
  creado_en timestamp with time zone default now()
);

create table pedido_detalle (
  id uuid primary key default uuid_generate_v4(),
  pedido_id uuid references pedidos(id),
  servicio_id uuid references servicios(id),
  cantidad integer,
  precio_unitario numeric,
  subtotal numeric
);
```

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build
```

## Desplegar en GitHub Pages

```bash
npm run deploy
```

## Limitaciones

- No tiene login real.
- No tiene pagos reales.
- No tiene panel administrativo completo.
- No envía WhatsApp automático.
- No usa backend propio.

## Próximos pasos

- Agregar autenticación.
- Agregar panel admin.
- Agregar estados de citas.
- Agregar recordatorios por email/WhatsApp.
- Agregar reportes de pedidos.
  
# UrbanPets 
