// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Selector de Bombeo Solar — Febecos',
  description: 'Evaluá si el bombeo solar aplica a tu campo. Ingeniería aplicada al agro.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
