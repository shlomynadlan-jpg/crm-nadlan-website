import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    RESEND_API_KEY: process.env.RESEND_API_KEY ? `set (${process.env.RESEND_API_KEY.slice(0,8)}...)` : 'MISSING',
    WA_BRIDGE_URL: process.env.WA_BRIDGE_URL || 'MISSING',
    WA_MY_PHONE: process.env.WA_MY_PHONE || 'MISSING',
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'MISSING',
    SERVICE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'MISSING',
  });
}
