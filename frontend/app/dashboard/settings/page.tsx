import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Web3ConnectButton } from '@/components/Web3ConnectButton'

export default function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="wallet">Wallet</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="border-jagedo-surface/30 bg-jagedo-surface/20">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input placeholder="Username" />
              <Input placeholder="Email" type="email" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card className="border-jagedo-surface/30 bg-jagedo-surface/20">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Input placeholder="Current Password" type="password" />
              <Input placeholder="New Password" type="password" />
              <Input placeholder="Confirm New Password" type="password" />
              <Button>Change Password</Button>
            </div>
            
            <div className="border-t border-jagedo-surface/30 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="wallet">
        <Card className="border-jagedo-surface/30 bg-jagedo-surface/20">
          <CardHeader>
            <CardTitle>Wallet Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Connected Wallets</h4>
              <div className="rounded-lg border border-jagedo-surface/30 p-4">
                {/* Wallet List */}
                <Web3ConnectButton variant="outline" className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}