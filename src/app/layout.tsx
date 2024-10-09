import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Auth from "@/components/Auth";
import localFont from 'next/font/local'
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const circular = localFont({
  variable: '--font-circular',
  display: 'swap',
  src: [
    {
      path: './fonts/CircularStd-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CircularStd-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CircularStd-Book.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})


export const metadata = {
  title: "SocialPulse",
  description: "Filter and analyze content for creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(circular.variable, 'font-primary')}>
        <Providers>
          {/* <Auth /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
