'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function AuthButton() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "authenticated" && session?.user) {
        return (
            <>
              
                <Button onClick={() => signOut()}>Sign out</Button>
            </>
        )
    }

    return <Button onClick={() => signIn()}>Sign in</Button>
}