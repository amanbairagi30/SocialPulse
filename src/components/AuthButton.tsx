'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export function AuthButton() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div className="text-white text-sm animate-pulse">Loading...</div>
    }

    const buttonVariants = {
        hover: { scale: 1.1, rotate: [0, -5, 5, -5, 0] },
        tap: { scale: 0.95 }
    }

    if (status === "authenticated" && session?.user) {
        return (
            <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                <Button 
                    onClick={() => signOut()} 
                    variant="outline"
                    className="bg-yellow-400 text-purple-800 border-2 border-white hover:bg-yellow-500 transition-colors font-bold rounded-full px-6 py-2"
                >
                    Sign out
                </Button>
            </motion.div>
        )
    }

    return (
        <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
        >
            <Button 
                onClick={() => signIn()} 
                variant="outline"
                className="bg-yellow-400 text-purple-800 border-2 border-white hover:bg-yellow-500 transition-colors font-bold rounded-full px-6 py-2"
            >
                Sign in
            </Button>
        </motion.div>
    )
}