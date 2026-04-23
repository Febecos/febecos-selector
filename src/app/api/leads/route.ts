// src/app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const lead = {
      zona:        body.zona       || null,
      uso:         body.uso        || null,
      agua_hoy:    body.agua_hoy   || null,
      animales:    body.animales   || null,
      litros:      body.litros     || null,
      usar_perf:   body.usar_perf  || null,
      diametro:    body.diametro   || null,
      profundidad: body.profundidad|| null,
      inversion:   body.inversion  || null,
      timing:      body.timing     || null,
      whatsapp:    body.whatsapp   || null,
      email:       body.email      || null,
      origen:      'selector-web',
      estado:      'nuevo',
    }

    const db = supabaseAdmin()
    const { data, error } = await db.from('leads').insert(lead).select('id').single()

    if (error) {
      console.error('[leads]', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    console.log('[lead guardado]', data.id)
    return NextResponse.json({ ok: true, id: data.id })

  } catch (e) {
    console.error('[leads] excepción', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
