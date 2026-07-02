// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingIcons from './components/FloatingIcons'

export const metadata: Metadata = {
  title: 'VISTAAR ESTATE - Premium Real Estate',
  description: 'Luxury plots, farms, and flats for your dream lifestyle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingIcons />
      </body>
    </html>
  )
}