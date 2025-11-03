import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Email Notice Generator',
  description: 'Create professional email notices and notifications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
