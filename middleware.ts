// import { NextRequest, NextResponse, userAgent } from 'next/server';

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const { device } = userAgent(request);
//   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
//   url.searchParams.set('viewport', viewport);

//   const requestHeaders = new Headers(request.headers);
//   const { pathname, href, origin } = request.nextUrl;

//   requestHeaders.set('x-url', `${origin}${pathname} ` || '');
//   requestHeaders.set('x-href', href || '');
//   requestHeaders.set('x-invoke-path', pathname || '');

//   return NextResponse.rewrite(url, {
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
    // 获取当前请求的URL对象
    const url = request.nextUrl;

    // 根据用户设备类型设置查询参数
    const { device } = userAgent(request);
    const viewport = device.type === 'mobile'? 'mobile' : 'desktop';
    url.searchParams.set('viewport', viewport);

    // 设置自定义请求头信息
    const requestHeaders = new Headers(request.headers);
    const { pathname, href, origin } = request.nextUrl;

    requestHeaders.set('x-url', `${origin}${pathname} ` || '');
    requestHeaders.set('x-href', href || '');
    requestHeaders.set('x-invoke-path', pathname || '');

    // 设置跨域相关的响应头
    const response = NextResponse.rewrite(url, {
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}