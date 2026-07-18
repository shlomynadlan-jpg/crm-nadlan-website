import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function sendWhatsApp(message: string) {
  const bridgeUrl = process.env.WA_BRIDGE_URL;
  const myPhone = process.env.WA_MY_PHONE;
  if (!bridgeUrl || !myPhone) return;
  try {
    await fetch(`${bridgeUrl}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId: `${myPhone}@c.us`, message }),
    });
  } catch { /* non-critical */ }
}

async function sendEmail(subject: string, body: string): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || 'shlomynadlan@gmail.com';
  if (!apiKey) return 'no RESEND_API_KEY';
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: 'nadlannow <onboarding@resend.dev>',
      to,
      subject,
      text: body,
    });
    return JSON.stringify(result);
  } catch (e: any) {
    return `error: ${e.message}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message, property_id, property_city, property_type, privacy_consent, marketing_consent } = await req.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: 'שם וטלפון הם שדות חובה' }, { status: 400 });
    }

    const consentDate = new Date().toISOString();
    const notes = [
      'ליד מאתר nadlannow.co.il',
      property_type && `סוג נכס: ${property_type}`,
      property_city && `עיר: ${property_city}`,
      property_id   && `מזהה נכס: ${property_id}`,
      message?.trim() && `הודעה: ${message.trim()}`,
      privacy_consent && `✔ אישר/ה מדיניות פרטיות (אתר, ${consentDate})`,
      `${marketing_consent ? '✔ הסכמה לדיוור שיווקי' : '✖ ללא הסכמה לדיוור שיווקי'} (אתר, ${consentDate})`,
    ].filter(Boolean).join('\n');

    const { error } = await supabase.from('clients').insert({
      full_name: name.trim(),
      phone: phone.trim(),
      requirements: notes,
      property_type_req: property_type || '',
      required_city: property_city || '',
      deal_type_req: '',
      urgent: false,
    });

    if (error) throw error;

    const notifText = [
      `🔴 ליד חדש מהאתר!`,
      `👤 שם: ${name.trim()}`,
      `📞 טלפון: ${phone.trim()}`,
      property_city && `📍 עיר: ${property_city}`,
      property_type && `🏢 סוג נכס: ${property_type}`,
      message?.trim() && `💬 הודעה: ${message.trim()}`,
    ].filter(Boolean).join('\n');

    const [, emailResult] = await Promise.all([
      sendWhatsApp(notifText),
      sendEmail(`🔴 ליד חדש מאתר nadlannow.co.il — ${name.trim()}`, notifText),
    ]);

    return NextResponse.json({ ok: true, debug_email: emailResult });
  } catch (err: any) {
    console.error('leads error:', err);
    return NextResponse.json({ error: err.message || 'שגיאה' }, { status: 500 });
  }
}
