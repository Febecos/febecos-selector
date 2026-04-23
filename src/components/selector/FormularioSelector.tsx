'use client'
// src/components/selector/FormularioSelector.tsx
// Renderiza el formulario HTML e intercepta el envío para guardarlo en Supabase

import { useEffect } from 'react'

// Declarar tipo global para la config
declare global {
  interface Window {
    FEBECOS_CONFIG?: { WA: string; EMAIL: string; API_URL: string }
    // Funciones del formulario que necesitamos sobreescribir
    irAAcciones?: () => void
  }
}

export default function FormularioSelector() {
  useEffect(() => {
    // Sobreescribir irAAcciones para que también guarde en Supabase
    const original = window.irAAcciones

    window.irAAcciones = async function () {
      // Guardar lead en Supabase via API
      try {
        const D = (window as any).D || {}
        const config = window.FEBECOS_CONFIG || { API_URL: '/api/leads' }

        await fetch(config.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(D),
        })
      } catch (e) {
        console.warn('No se pudo guardar el lead:', e)
      }

      // Ejecutar el flujo original (abrir WA, email, etc.)
      if (original) original.call(window)
    }

    // Inyectar config de WA y email en el formulario
    const config = window.FEBECOS_CONFIG
    if (config) {
      // El formulario lee WA y EMAIL_TO del scope global
      ;(window as any).WA = config.WA
      ;(window as any).EMAIL_TO = config.EMAIL
    }
  }, [])

  // El formulario se carga desde el HTML estático via dangerouslySetInnerHTML
  // para mantener todo el JS del formulario funcionando
  return (
    <div
      id="febecos-form-container"
      dangerouslySetInnerHTML={{ __html: FORMULARIO_HTML }}
    />
  )
}

// El HTML del formulario completo (sin <html>/<head>/<body>)
// Se extrae del febecos-paso1.html — solo el contenido del <body> y <style>
const FORMULARIO_HTML = `
<!-- El contenido del formulario se inyecta en build time -->
<!-- Ver: scripts/inject-form.js -->
<div id="form-loading" style="text-align:center;padding:60px 20px;font-family:Rubik,sans-serif;color:#203b61">
  <p style="font-size:15px">Cargando formulario...</p>
</div>
`
