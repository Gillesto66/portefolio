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
    console.error('[SMTP Contact] ❌ Connexion échouée →', err.message);
  } else {
    console.log('[SMTP Contact] ✅ Connexion SMTP OK →', process.env.MAIL_HOST);
  }
});

export async function POST(req: NextRequest) {
  try {
    const { name, contact, message } = await req.json();
    console.log('[Contact] 📥 Requête reçue →', { name, contact });

    if (!name || !contact || !message) {
      console.warn('[Contact] ⚠️ Champs manquants');
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    // Insert in Supabase
    const { error: dbError } = await supabase.from('contact_messages').insert({
      sender_name: name,
      sender_contact: contact,
      message,
    });
    if (dbError) {
      console.error('[Contact] ❌ Supabase insert échoué →', dbError.message);
    } else {
      console.log('[Contact] ✅ Message inséré en base');
    }

    // Send email via SMTP
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_FROM,
      replyTo: contact,
      subject: `[Portfolio] Nouveau message de ${name}`,
      html: `
        <div style="font-family: monospace; background: #131313; color: #e5e2e1; padding: 32px;">
          <h2 style="color: #ff5722; text-transform: uppercase; letter-spacing: 0.2em;">Nouveau Message</h2>
          <p><strong style="color: #ffb5a0;">De :</strong> ${name}</p>
          <p><strong style="color: #ffb5a0;">Contact :</strong> ${contact}</p>
          <hr style="border-color: #5b4039; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });
    console.log('[Contact] ✅ Email envoyé → messageId:', info.messageId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact] ❌ Erreur inattendue →', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
