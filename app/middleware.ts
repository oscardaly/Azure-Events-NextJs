import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
    const authCookie = request.cookies.get('auth')?.value

    if (request.nextUrl.pathname.startsWith('/admin') && authCookie !== 'true') {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}