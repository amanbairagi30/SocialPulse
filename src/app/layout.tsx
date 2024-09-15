import { Inter } from 'next/font/google'
import './globals.css'
import { AuthButton } from '@/components/AuthButton'
import { Providers } from './providers'


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
  <body className={`${inter.className} bg-gradient-to-b from-purple-100 to-white`}>
        <Providers>
      
        <header className="bg-purple-600 text-white shadow-lg">
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
       
              <span className="bg-clip-text text-2xl font-bold  from-yellow-300 to-white" style={{ textShadow: "2px 2px 0px #4C1D95" }}>
                SocialPulse
              </span>
       
            <AuthButton />
          </div>
        </header>
          <main className="container mx-auto py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
