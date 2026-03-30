import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Vérification SMTP au démarrage
transporter.verify((err) => {
  if (err) {
    console.error('[SMTP Service] ❌ Connexion échouée →', err.message);
  } else {
    console.log('[SMTP Service] ✅ Connexion SMTP OK →', process.env.MAIL_HOST);
  }
});

export async function GET() {
  console.log('[Service] 📥 GET /api/service — chargement des services');
  const { data, error } = await supabase.from('services').select('*').order('label');
  if (error) {
    console.error('[Service] ❌ Supabase GET échoué →', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log('[Service] ✅ Services chargés →', data?.length, 'entrées');
  return NextResponse.json({ services: data });
}

export async function POST(req: NextRequest) {
  try {
    const { client_name, client_contact, service_id, project_description } = await req.json();
    console.log('[Service] 📥 Requête reçue →', { client_name, client_contact, service_id });

    if (!client_name || !client_contact || !service_id) {
      console.warn('[Service] ⚠️ Champs manquants');
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    // Get service label
    const { data: serviceData, error: serviceError } = await supabase
      .from('services').select('label').eq('id', service_id).single();
    if (serviceError) {
      console.warn('[Service] ⚠️ Service introuvable →', serviceError.message);
    }
    const serviceLabel = serviceData?.label ?? 'Service inconnu';
    console.log('[Service] 🔍 Service résolu →', serviceLabel);

    // Insert in Supabase
    const { error: dbError } = await supabase.from('service_requests').insert({
      client_name,
      client_contact,
      service_id,
      project_description,
    });
    if (dbError) {
      console.error('[Service] ❌ Supabase insert échoué →', dbError.message);
    } else {
      console.log('[Service] ✅ Demande insérée en base');
    }

    // Send email via SMTP
    const info = await transporter.sendMail({
      from: `"Portfolio Services" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_FROM,
      replyTo: client_contact.includes('@') ? client_contact : undefined,
      subject: `[Portfolio] Demande de service — ${serviceLabel}`,
      html: `
        <div style="font-family: monospace; background: #131313; color: #e5e2e1; padding: 32px;">
          <h2 style="color: #ff5722; text-transform: uppercase; letter-spacing: 0.2em;">Nouvelle Demande de Service</h2>
          <p><strong style="color: #ffb5a0;">Client :</strong> ${client_name}</p>
          <p><strong style="color: #ffb5a0;">Contact :</strong> ${client_contact}</p>
          <p><strong style="color: #ffb5a0;">Service :</strong> ${serviceLabel}</p>
          <hr style="border-color: #5b4039; margin: 16px 0;" />
          <p><strong style="color: #ffb5a0;">Description :</strong></p>
          <p style="white-space: pre-wrap;">${project_description ?? 'Non renseigné'}</p>
        </div>
      `,
    });
    console.log('[Service] ✅ Email envoyé → messageId:', info.messageId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Service] ❌ Erreur inattendue →', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
