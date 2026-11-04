import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'vi';
  const secret = searchParams.get('secret');

  // Verify secret token if configured in environment
  const expectedSecret = process.env.REVALIDATION_SECRET || 'viettri_secret_token_123';
  if (secret && secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
  }

  try {
    // Revalidate dictionary cache tag
    revalidateTag(`dictionary-${lang}`, 'max');
    revalidateTag('dictionary-vi', 'max');
    revalidateTag('dictionary-en', 'max');

    // Revalidate all pages layout
    revalidatePath('/', 'layout');
    revalidatePath('/[lang]', 'layout');

    return NextResponse.json({
      revalidated: true,
      lang,
      timestamp: Date.now(),
      message: `Successfully revalidated dictionary cache for ${lang}`,
    });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
