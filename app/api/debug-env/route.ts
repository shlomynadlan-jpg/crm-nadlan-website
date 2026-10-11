import { NextResponse } from 'next/server';

// v3
export async function GET() {
  const crmUrl = process.env.CRM_URL ?? 'https://crm-nadlan.vercel.app';
  const apiKey = process.env.PROPSTORY_API_KEY ?? '';

  let crmStatus = 'not tested';
  let crmArticleCount: number | null = null;
  try {
    const res = await fetch(`${crmUrl}/api/propstory/articles?limit=5`, {
      headers: { 'x-api-key': apiKey },
      cache: 'no-store',
    });
    if (res.status === 401) crmStatus = '401 UNAUTHORIZED — API key wrong or missing in CRM';
    else if (res.status === 404) crmStatus = '404 — route not found in CRM';
    else if (res.ok) {
      const data = await res.json();
      crmArticleCount = (data.articles ?? []).length;
      crmStatus = `OK — ${crmArticleCount} published articles`;
    } else {
      crmStatus = `${res.status} ${res.statusText}`;
    }
  } catch (e: unknown) {
    crmStatus = `fetch error: ${e instanceof Error ? e.message : String(e)}`;
  }

  return NextResponse.json({
    RESEND_API_KEY: process.env.RESEND_API_KEY ? `set (${process.env.RESEND_API_KEY.slice(0,8)}...)` : 'MISSING',
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'MISSING',
    SERVICE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'MISSING',
    CRM_URL: crmUrl,
    PROPSTORY_API_KEY: apiKey ? `set (${apiKey.slice(0,8)}...)` : 'MISSING',
    crm_connection: crmStatus,
    crm_article_count: crmArticleCount,
  });
}
