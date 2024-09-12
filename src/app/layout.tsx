import { Inter } from 'next/font/google'
import './globals.css'
import AuthButton from '@/components/AuthButton'
import { Providers } from './providers'
import styles from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SocialPulse',
  description: 'Filter and analyze content for creators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="container mx-auto py-4 flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${styles.animatedTitle}`}>SocialPulse</h1>
            <AuthButton />
          </header>
          <main className="container mx-auto py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
