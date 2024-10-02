'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {FC} from "react";

export const SignOutButton: FC = () => {
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                router.push('/signin')
            } else {
                console.error('Sign out failed')
            }
        } catch (error) {
            console.error('An error occurred during sign out:', error)
        }
    }

    return (
        <Button onClick={handleSignOut} variant="outline">
            Sign Out
        </Button>
    )
}