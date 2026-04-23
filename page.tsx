// src/app/page.tsx
// Redirige al formulario HTML estático que vive en /public/formulario.html
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/formulario.html')
}
