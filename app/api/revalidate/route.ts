import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const apiKey = process.env.PROPSTORY_API_KEY ?? '';
  const auth = req.headers.get('authorization');

  if (!apiKey || auth !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag('cms-articles');
  return NextResponse.json({ revalidated: true, ts: Date.now() });
}
