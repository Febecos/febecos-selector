# Febecos Selector — Sistema de Bombeo Solar

Selector interactivo de equipos de bombeo solar para el campo argentino.

## Stack
- **Next.js 14** — framework
- **Supabase** — base de datos de leads
- **Vercel** — hosting y deploy automático
- **GitHub** — repositorio: `github.com/Febecos/febecos-selector`

## Setup inicial

### 1. Clonar y instalar
```bash
git clone https://github.com/Febecos/febecos-selector.git
cd febecos-selector
npm install
```

### 2. Variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con los valores reales
```

Variables necesarias:
| Variable | Dónde conseguirla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (secreta) |
| `NEXT_PUBLIC_WA_NUMBER` | Número de WhatsApp sin + (ej: 5491127399430) |
| `NEXT_PUBLIC_EMAIL_FEBECOS` | Email interno (ventas@febecos.com) |

### 3. Base de datos
Ejecutar el SQL en Supabase SQL Editor:
```
febecos-leads.sql
```

### 4. Desarrollo local
```bash
npm run dev
# http://localhost:3000
```

## Deploy en Vercel

1. Ir a [vercel.com](https://vercel.com) → Add New Project
2. Importar `github.com/Febecos/febecos-selector`
3. Cargar todas las variables de entorno
4. Deploy → URL lista en 2 minutos

## Embeber en Tienda Nube / febecos.com

```html
<iframe
  src="https://febecos-selector.vercel.app"
  width="100%"
  height="900"
  frameborder="0"
  style="border-radius:12px"
></iframe>
```

## Actualizar el formulario

El formulario vive en `febecos-paso1.html` (archivo standalone).
Para actualizar: editar ese archivo y hacer `git push` → Vercel redeploya automáticamente.

## Base de datos de leads

Cada vez que un usuario completa el formulario y confirma, se guarda en Supabase:
- Tabla: `leads`
- Vista de resumen: `leads_resumen`
- Estados: `nuevo` → `contactado` → `cotizado` → `cerrado`

## Notas para el futuro

### Portal de revendedores (v2)
- Activar RLS en Supabase
- Cada revendedor ve solo sus propios leads
- Acceso a la base de equipos de Febecos para cotizar a sus clientes
- Login con Supabase Auth
