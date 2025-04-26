import type { Metadata } from 'next'
import { Providers } from './providers'
import '@/styles/globals.css'
import '@/styles/animations.css'

export const metadata: Metadata = {
  title: 'Jagedo Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}