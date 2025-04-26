import { Card, Button } from '@/components/ui'
import { AuthForm } from '@/components/auth/AuthForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-jagedo-surface to-gray-900">
      <div className="container relative flex h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md space-y-6 border-jagedo-surface bg-opacity-50 backdrop-blur-lg">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-display text-3xl font-bold text-primary">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Securely access your Jagedo account
            </p>
          </div>
          
          <AuthForm />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-jagedo-surface" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Web3 Login Options
              </span>
            </div>
          </div>
          
          <Web3ConnectButton />
        </Card>
      </div>
    </div>
  )
}