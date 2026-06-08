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
- Login academico simulado con tabla publica `usuarios` y roles: `administrador`, `trabajador`, `cliente`.
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
2. Ejecuta `SUPABASE_USUARIOS_SIMPLE.sql` para recrear `usuarios`, roles, politicas RLS demo y usuarios de prueba.

Tablas usadas:

- `categorias`
- `servicios`
- `clientes`
- `mascotas`
- `pedidos`
- `pedido_detalle`
- `publicaciones`
- `usuarios`

Las politicas incluidas en `SUPABASE_USUARIOS_SIMPLE.sql` son abiertas para demo academica. En produccion se debe usar Supabase Auth, contrasenas con hash y politicas seguras por usuario/rol.

## Login academico y usuarios demo

Este proyecto usa un login simulado para fines academicos. El login consulta directamente la tabla publica `usuarios` y guarda la sesion en `localStorage` con la clave `urbanpets_user`.

Usuarios de prueba incluidos en `SUPABASE_USUARIOS_SIMPLE.sql`:

- Administrador: `admin@urbanpets.com` / `Admin123456`
- Trabajador: `trabajador@urbanpets.com` / `Trabajador123456`
- Cliente: `cliente@urbanpets.com` / `Cliente123456`

En produccion no se debe guardar `contrasena` en texto plano ni autenticar desde una tabla publica; se recomienda volver a Supabase Auth.

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
