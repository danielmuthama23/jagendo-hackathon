import { SecureChat } from '@/components/SecureChat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageCircle, Users, Search } from 'lucide-react'

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-160px)]">
      <div className="flex w-80 flex-col border-r border-jagedo-surface/30">
        <div className="p-4">
          <Tabs defaultValue="chats">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chats">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chats
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Users className="mr-2 h-4 w-4" />
                Contacts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
            />
          </div>
          
          {/* Chat List */}
          <div className="space-y-2">
            {[].map(() => (
              <div className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-jagedo-surface/20">
                {/* Chat preview */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <SecureChat />
      </div>
    </div>
  )
}