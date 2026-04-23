// src/app/page.tsx
// Inyecta las variables de entorno en el HTML del formulario
// para que el cliente tenga el número de WA y el email configurados

export default function Home() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '549XXXXXXXXXX'
  const emailFebecos = process.env.NEXT_PUBLIC_EMAIL_FEBECOS || 'ventas@febecos.com'

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.FEBECOS_CONFIG = {
              WA: '${waNumber}',
              EMAIL: '${emailFebecos}',
              API_URL: '/api/leads'
            };
          `,
        }}
      />
      <SelectorPage />
    </>
  )
}

function SelectorPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <FormularioSelector />
    </main>
  )
}

// El componente carga el HTML del formulario como client component
import FormularioSelector from '@/components/selector/FormularioSelector'
