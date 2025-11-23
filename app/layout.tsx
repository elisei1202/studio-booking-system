import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Studio Booking - Sistem de Rezervări',
  description: 'Sistem de rezervări pentru studio privat cu abonamente și credite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
