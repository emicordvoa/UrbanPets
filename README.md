# UrbanPets

UrbanPets es una plataforma web para servicios de mascotas: peluqueria, bano, spa, hotel, guarderia y extras. El proyecto usa React, Vite, Material UI, React Router, Supabase, localStorage y despliegue en GitHub Pages.

## Identidad visual

La interfaz fue refactorizada hacia una estetica premium con tonos lilas, morados suaves, beige y verde oliva:

- Delft Blue: `#41386B`
- Amethyst: `#7A70BA`
- French Gray: `#B1B4C8`
- Beige: `#EBEED5`
- Olivine: `#B0C49C`
- Fondo oscuro: `#231942`

## Funcionalidades

- Landing page moderna con hero visual, beneficios, servicios destacados, testimonios y CTA.
- Catalogo de servicios con busqueda, filtros, cards visuales y carrito.
- Carrito invitado persistente con `localStorage`.
- Checkout como invitado o cliente logueado.
- Insercion de clientes, mascotas, pedidos y detalle de pedido en Supabase.
- Supabase Auth con roles: `administrador`, `trabajador`, `cliente`.
- Panel administrador: dashboard, servicios, categorias, citas, publicaciones, usuarios, clientes y mascotas.
- Panel trabajador: citas, clientes y mascotas.
- Zona cliente: perfil, mascotas y reservas.

## Variables de entorno

Copiar `.env.example` a `.env.local` y configurar:

```env
VITE_SUPABASE_URL="https://tu-proyecto.supabase.co"
VITE_SUPABASE_ANON_KEY="tu-anon-key"
```

No uses `service_role` en frontend.

## SQL

1. Ejecuta la estructura base del proyecto si tu base aun no tiene las tablas principales.
2. Ejecuta `SUPABASE_SETUP_V2.sql` para agregar `perfiles`, roles y politicas RLS demo.

Tablas usadas:

- `categorias`
- `servicios`
- `clientes`
- `mascotas`
- `pedidos`
- `pedido_detalle`
- `publicaciones`
- `perfiles`

Las politicas incluidas en `SUPABASE_SETUP_V2.sql` son abiertas para demo academica. En produccion deben endurecerse con reglas por `auth.uid()` y rol.

## Usuarios demo

Supabase Auth no permite crear usuarios completos solo con SQL desde el editor normal. Crea manualmente estos usuarios en Supabase Auth:

- Administrador: `administrador@urbanpets.demo` / `UrbanPets123!`
- Trabajador: `trabajador@urbanpets.demo` / `UrbanPets123!`
- Cliente: `cliente@urbanpets.demo` / `UrbanPets123!`

Luego copia cada `auth.users.id` y crea los perfiles:

```sql
insert into perfiles (auth_user_id, nombre, correo, rol, activo)
values
('UUID_AUTH_ADMIN', 'Admin UrbanPets', 'administrador@urbanpets.demo', 'administrador', true),
('UUID_AUTH_TRABAJADOR', 'Trabajador UrbanPets', 'trabajador@urbanpets.demo', 'trabajador', true),
('UUID_AUTH_CLIENTE', 'Cliente Demo', 'cliente@urbanpets.demo', 'cliente', true);
```

## Rutas

Publicas:

- `/#/`
- `/#/servicios`
- `/#/carrito`
- `/#/contacto`
- `/#/login`
- `/#/registro`

Admin:

- `/#/admin`
- `/#/admin/servicios`
- `/#/admin/categorias`
- `/#/admin/citas`
- `/#/admin/publicaciones`
- `/#/admin/usuarios`
- `/#/admin/clientes`
- `/#/admin/mascotas`

Trabajador:

- `/#/trabajador`
- `/#/trabajador/citas`
- `/#/trabajador/clientes`
- `/#/trabajador/mascotas`

Cliente:

- `/#/cliente`
- `/#/cliente/perfil`
- `/#/cliente/mascotas`
- `/#/cliente/reservas`

## Ejecutar local

En Windows usa `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
```

## Validar

```bash
npm.cmd run lint
npm.cmd run build
```

## Deploy

No se despliega automaticamente desde Codex. Cuando este listo:

```bash
npm.cmd run deploy
```

`vite.config.js` usa:

```js
base: '/UrbanPets/'
```

`package.json` usa:

```json
"homepage": "https://emicordvoa.github.io/UrbanPets"
```

## Limitaciones

- No hay pagos reales.
- El panel cliente deja listas algunas vistas para conectar historial filtrado por usuario autenticado.
- Las politicas RLS son de demo academica y deben ajustarse antes de produccion.
