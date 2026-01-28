import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { defaultMetadata } from '@/lib/seo-metadata'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
