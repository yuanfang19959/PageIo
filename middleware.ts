import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  url.searchParams.set('viewport', viewport);

  const requestHeaders = new Headers(request.headers);
  const { pathname, href, origin } = request.nextUrl;

  requestHeaders.set('x-url', `${origin}${pathname} ` || '');
  requestHeaders.set('x-href', href || '');
  requestHeaders.set('x-invoke-path', pathname || '');

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}