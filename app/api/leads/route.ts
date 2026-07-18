import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('leads error:', err);
    return NextResponse.json({ error: err.message || 'שגיאה' }, { status: 500 });
  }
}
