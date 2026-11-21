import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { validateLead, isRateLimited } from '@/lib/leads';

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
      signal: AbortSignal.timeout(5000), // a hung bridge must not block the lead response
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
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'יותר מדי פניות, נסו שוב מאוחר יותר' }, { status: 429 });
    }
    const check = validateLead(await req.json().catch(() => null));
    if (!check.ok) {
      // honeypot hit: pretend success so bots don't adapt
      return check.spam ? NextResponse.json({ ok: true }) : NextResponse.json({ error: check.error }, { status: check.status });
    }
    const { name, phone, message, property_id, property_city, property_type, marketing_consent } = check.lead;

    const consentDate = new Date().toISOString();
    const notes = [
      'ליד מאתר nadlannow.co.il',
      property_type && `סוג נכס: ${property_type}`,
      property_city && `עיר: ${property_city}`,
      property_id   && `מזהה נכס: ${property_id}`,
      message && `הודעה: ${message}`,
      `✔ אישר/ה מדיניות פרטיות (אתר, ${consentDate})`,
      `${marketing_consent ? '✔ הסכמה לדיוור שיווקי' : '✖ ללא הסכמה לדיוור שיווקי'} (אתר, ${consentDate})`,
    ].filter(Boolean).join('\n');

    const { error } = await supabase.from('clients').insert({
      full_name: name,
      phone,
      requirements: notes,
      property_type_req: property_type || '',
      required_city: property_city || '',
      deal_type_req: '',
      urgent: false,
    });

    if (error) throw error;

    const notifText = [
      `🔴 ליד חדש מהאתר!`,
      `👤 שם: ${name}`,
      `📞 טלפון: ${phone}`,
      property_city && `📍 עיר: ${property_city}`,
      property_type && `🏢 סוג נכס: ${property_type}`,
      message && `💬 הודעה: ${message}`,
    ].filter(Boolean).join('\n');

    const [, emailResult] = await Promise.all([
      sendWhatsApp(notifText),
      sendEmail(`🔴 ליד חדש מאתר nadlannow.co.il — ${name}`, notifText),
    ]);
    console.log('lead email:', emailResult);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('leads error:', err);
    return NextResponse.json({ error: 'שגיאה' }, { status: 500 });
  }
}
