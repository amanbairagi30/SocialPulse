'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <Button onClick={() => signOut()}>Sign Out</Button>
    )
  }
  return (
    <Button onClick={() => signIn("google")}>Sign In with Google</Button>
  )
}