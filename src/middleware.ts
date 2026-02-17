import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  // Minimal middleware - just pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - logo.png, logo-white.svg (favicon/logo files)
     */
    '/((?!api|_next/static|_next/image|logo\.png|logo-white\.svg).*)',
  ],
}
