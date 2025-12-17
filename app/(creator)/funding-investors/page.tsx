import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockInvestments, mockIdeas } from "@/lib/mock-data"
import { TrendingUp, Users, PieChart } from "lucide-react"
import { StatCard } from "@/components/creator/stat-card"

export default function FundingPage() {
  const totalRaised = mockIdeas.reduce((acc, idea) => acc + idea.totalRaised, 0)
  const totalInvestors = new Set(mockInvestments.map((inv) => inv.investorName)).size
  const avgInvestment = totalRaised / mockInvestments.length

  const equityDistribution = mockIdeas.map((idea) => {
    const ideaInvestments = mockInvestments.filter((inv) => inv.ideaName === idea.title)
    const equitySold = ideaInvestments.reduce((acc, inv) => acc + inv.equityPercentage, 0)
    return {
      idea: idea.title,
      sold: equitySold,
      available: idea.equityOffered - equitySold,
    }
  })

  return (
    <div className="flex-1 overflow-y-auto">

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard title="Total Raised" value={`$${(totalRaised / 1000).toFixed(0)}K`} icon={TrendingUp} />
          <StatCard title="Total Investors" value={totalInvestors} icon={Users} />
          <StatCard title="Avg Investment" value={`$${(avgInvestment / 1000).toFixed(0)}K`} icon={PieChart} />
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">All Investors</h2>
          <div className="space-y-4">
            {mockInvestments.map((investment) => (
              <div
                key={investment.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{investment.investorName}</p>
                    <p className="text-sm text-muted-foreground truncate">{investment.ideaName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(investment.investedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{investment.roundName}</Badge>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      ${investment.investedAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{investment.equityPercentage}% equity</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Equity Distribution by Idea</h2>
          <div className="space-y-6">
            {equityDistribution.map((item) => (
              <div key={item.idea} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{item.idea}</h3>
                  <span className="text-sm text-muted-foreground">
                    {item.sold.toFixed(2)}% sold of {(item.sold + item.available).toFixed(2)}%
                  </span>
                </div>
                <div className="flex h-8 overflow-hidden rounded-lg">
                  <div
                    className="bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground"
                    style={{ width: `${(item.sold / (item.sold + item.available)) * 100}%` }}
                  >
                    {item.sold > 2 && `${item.sold.toFixed(1)}%`}
                  </div>
                  <div
                    className="bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground"
                    style={{ width: `${(item.available / (item.sold + item.available)) * 100}%` }}
                  >
                    {item.available > 2 && `${item.available.toFixed(1)}%`}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Sold to investors</span>
                  <span>Available</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
