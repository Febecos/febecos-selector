// src/app/api/email/route.ts
// Envía notificación a cotiza@febecos.com cuando llega un lead
// Usa el servidor SMTP de Neolo — sin popup, silencioso

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // SSL en puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const consumo = body.uso === 'Ganado'
      ? `Animales: ${body.animales}`
      : `Litros/día: ${body.litros}`

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#203b61">

  <div style="background:#003d72;padding:20px 24px;border-radius:8px 8px 0 0">
    <h1 style="color:#fff;margin:0;font-size:20px">🌱 Nuevo lead — Selector de Bombeo</h1>
    <p style="color:rgba(255,255,255,.7);margin:4px 0 0;font-size:13px">
      ${new Date().toLocaleString('es-AR', {timeZone:'America/Argentina/Buenos_Aires'})}
    </p>
  </div>

  <div style="background:#f7f9fc;border:1px solid #dce6f0;border-top:none;border-radius:0 0 8px 8px;padding:24px">

    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a;width:40%">Zona</td>
        <td style="padding:10px 8px;font-weight:600">${body.zona || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Uso del agua</td>
        <td style="padding:10px 8px;font-weight:600">${body.uso || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Agua hoy</td>
        <td style="padding:10px 8px;font-weight:600">${body.agua_hoy || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Consumo</td>
        <td style="padding:10px 8px;font-weight:600">${consumo}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Perforación</td>
        <td style="padding:10px 8px;font-weight:600">${body.usar_perf || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Diámetro</td>
        <td style="padding:10px 8px;font-weight:600">${body.diametro || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Profundidad</td>
        <td style="padding:10px 8px;font-weight:600">${body.profundidad || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Inversión</td>
        <td style="padding:10px 8px;font-weight:600">${body.inversion || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">Plazo</td>
        <td style="padding:10px 8px;font-weight:600">${body.timing || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #dce6f0">
        <td style="padding:10px 8px;color:#5a6a7a">WhatsApp</td>
        <td style="padding:10px 8px;font-weight:600">
          <a href="https://wa.me/549${body.whatsapp}" style="color:#25d366">
            ${body.whatsapp || '—'}
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 8px;color:#5a6a7a">Email</td>
        <td style="padding:10px 8px;font-weight:600">
          <a href="mailto:${body.email}" style="color:#003d72">${body.email || '—'}</a>
        </td>
      </tr>
    </table>

    <div style="margin-top:20px;padding:14px;background:#f0fff5;border:1px solid #b7e8c7;border-radius:8px">
      <p style="margin:0;font-size:13px;color:#1a6b35">
        💬 <strong>Responder por WhatsApp:</strong>
        <a href="https://wa.me/549${body.whatsapp}?text=${encodeURIComponent(`Hola! Te contacto desde Febecos por tu consulta de bombeo solar en ${body.zona}.`)}"
           style="color:#25d366;font-weight:700">
          Abrir chat
        </a>
      </p>
    </div>

  </div>

  <p style="text-align:center;font-size:11px;color:#b0bec5;margin-top:16px">
    Febecos — selector.febecos.com
  </p>

</body>
</html>`

    await transporter.sendMail({
      from: `"Febecos Selector" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `🌱 Nuevo lead: ${body.zona} — ${body.uso} — ${body.timing}`,
      html,
    })

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('[email]', error)
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
