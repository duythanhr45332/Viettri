import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ignore internal Next.js requests and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect explicit /vi to /
  if (pathname === '/vi') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (pathname.startsWith('/vi/')) {
    const newPath = pathname.replace(/^\/vi/, '');
    return NextResponse.redirect(new URL(newPath === '' ? '/' : newPath, request.url));
  }

  // Redirect legacy /about to /gioi-thieu
  if (pathname === '/about') {
    return NextResponse.redirect(new URL('/gioi-thieu', request.url));
  }
  if (pathname === '/en/about') {
    return NextResponse.redirect(new URL('/en/gioi-thieu', request.url));
  }

  // Redirect legacy /the-villas and /the-vilass to /dong-san-pham
  if (pathname === '/the-villas' || pathname === '/the-vilass') {
    return NextResponse.redirect(new URL('/dong-san-pham', request.url));
  }
  if (pathname === '/en/the-villas' || pathname === '/en/the-vilass') {
    return NextResponse.redirect(new URL('/en/dong-san-pham', request.url));
  }

  // If we are at the root, rewrite to /vi
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/vi', request.url));
  }

  // If it's not /en (and hasn't been caught by above), rewrite to /vi/...
  if (!pathname.startsWith('/en')) {
    return NextResponse.rewrite(new URL(`/vi${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
