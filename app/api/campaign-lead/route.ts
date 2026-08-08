// Proxy to CRM — so the landing page can call /api/campaign-lead on the same domain
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm-nadlan.vercel.app';
  try {
    const body = await req.json();
    const res = await fetch(`${CRM_URL}/api/campaign-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
