import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ToasterClient from '@/components/ToasterClient'
import CopilotDrawer from '@/components/CopilotDrawer'
import Menu from '@/components/Menu'
import '@/styles/globals.css'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '里歐電影',
  description: '里歐電影 24H',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Menu />
        {children}
        <ToasterClient />
        <CopilotDrawer />
      </body>
    </html>
  )
}
