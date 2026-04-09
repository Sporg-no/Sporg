import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  // Protect all routes under the (app) route group
  matcher: [
    '/dashboard/:path*',
    '/arrangementer/:path*',
    '/kalender/:path*',
    '/meldinger/:path*',
    '/profil/:path*',
  ],
}
