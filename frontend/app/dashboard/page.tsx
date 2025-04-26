import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Wallet, Briefcase, Star } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { title: 'Active Jobs', value: '12', icon: <Activity className="h-6 w-6" /> },
    { title: 'Completed Jobs', value: '89', icon: <Briefcase className="h-6 w-6" /> },
    { title: 'Total Earnings', value: 'KES 254,300', icon: <Wallet className="h-6 w-6" /> },
    { title: 'Average Rating', value: '4.8/5', icon: <Star className="h-6 w-6" /> },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-jagedo-surface/30 bg-jagedo-surface/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="text-primary">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-jagedo-surface/30 bg-jagedo-surface/20">
          <CardHeader>
            <CardTitle className="text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>{/* Activity Timeline Component */}</CardContent>
        </Card>

        <Card className="border-jagedo-surface/30 bg-jagedo-surface/20">
          <CardHeader>
            <CardTitle className="text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Briefcase className="h-6 w-6" />
              Post New Job
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Wallet className="h-6 w-6" />
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}