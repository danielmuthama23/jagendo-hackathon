import { Sidebar } from '@/components/navigation/Sidebar'
import { MobileNav } from '@/components/navigation/MobileNav'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Web3Provider } from '@/lib/web3/providers'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Web3Provider>
      <AuthGuard>
        <div className="flex min-h-screen flex-col bg-jagedo-surface">
          <MobileNav />
          
          <div className="flex flex-1">
            <Sidebar className="hidden w-64 border-r border-jagedo-surface/30 lg:block" />
            
            <main className="flex-1 overflow-hidden p-6 lg:p-8">
              <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-xl border border-jagedo-surface/30 bg-gradient-to-br from-jagedo-surface/50 to-transparent p-6 backdrop-blur-lg">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </AuthGuard>
    </Web3Provider>
  )
}