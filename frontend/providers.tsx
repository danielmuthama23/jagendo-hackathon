'use client'

import { ThemeProvider } from 'next-themes'
import { Web3Provider } from '@/lib/web3/providers'
import { AuthProvider } from '@/lib/auth/provider'
import { AIProvider } from '@/lib/ai/context'
import { SocketProvider } from '@/lib/socket/context'
import { AnimatePresence } from 'framer-motion'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Web3Provider>
        <AuthProvider>
          <AIProvider>
            <SocketProvider>
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </SocketProvider>
          </AIProvider>
        </AuthProvider>
      </Web3Provider>
    </ThemeProvider>
  )
}