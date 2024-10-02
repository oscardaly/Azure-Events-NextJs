import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    cookies().set('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0 // This will cause the cookie to expire immediately
    })

    return NextResponse.json({ success: true })
}

export async function GET() {
    // This handles direct GET requests to /api/auth/signout
    cookies().set('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0
    })

    return NextResponse.redirect(new URL('/signin', process.env.NEXT_PUBLIC_BASE_URL))
}