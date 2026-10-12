import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const LOCALES = ['he', 'en', 'fr', 'ru'];

export async function POST(req: NextRequest) {
  const apiKey = process.env.PROPSTORY_API_KEY ?? '';
  const auth = req.headers.get('authorization');

  if (!apiKey || auth !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/blog`, 'layout');
  }
  return NextResponse.json({ revalidated: true, ts: Date.now() });
}
