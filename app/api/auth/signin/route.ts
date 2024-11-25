import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function authenticateUser(email: string, password: string) {
    const validEmail = 'admin@example.com'
    const validPassword = 'password123'

    return email === validEmail && password === validPassword;

}

export async function POST(request: Request) {
    const { email, password } = await request.json()

    if (await authenticateUser(email, password)) {
        cookies().set('auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600
        })

        return NextResponse.json({ success: true })
    } else {
        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }
}