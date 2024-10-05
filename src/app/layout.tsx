import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Auth from "@/components/Auth";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Providers>
          <Auth />
          {children}
        </Providers>
      </body>
    </html>
  );
}
