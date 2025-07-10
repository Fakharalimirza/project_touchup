import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.includes('/admin')) {
    const sessionCookie = request.cookies.get('session');

    if (pathname.startsWith('/en/admin/dashboard') || pathname.startsWith('/ar/admin/dashboard')) {
      if (!sessionCookie) {
        const locale = pathname.split('/')[1];
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
    }
    
    // Allow access to /admin login page regardless of session
    if (pathname === '/en/admin' || pathname === '/ar/admin') {
      return intlMiddleware(request);
    }
  }

  return intlMiddleware(request);
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
