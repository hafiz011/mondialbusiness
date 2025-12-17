"use client";
import { StatCard } from "@/components/creator/stat-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockIdeas, mockInvestments } from "@/lib/mock-data"
import { Lightbulb, TrendingUp, Users, Wallet, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const totalIdeas = mockIdeas.length
  const totalFundRaised = mockIdeas.reduce((acc, idea) => acc + idea.totalRaised, 0)
  const activeInvestors = new Set(mockInvestments.map((inv) => inv.investorName)).size
  const walletBalance = 145000

  const recentActivities = [
    { id: "1", text: "David Park invested $150,000 in AI-Powered Financial Assistant", time: "2 hours ago" },
    { id: "2", text: "Series A round opened for AI-Powered Financial Assistant", time: "5 days ago" },
    { id: "3", text: 'Milestone "User Acquisition" completed', time: "1 week ago" },
    { id: "4", text: "New business idea submitted for review", time: "2 weeks ago" },
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Ideas"
            value={totalIdeas}
            icon={Lightbulb}
            trend={{ value: "+1 this month", positive: true }}
          />
          <StatCard
            title="Total Fund Raised"
            value={`$${(totalFundRaised / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend={{ value: "+32% from last month", positive: true }}
          />
          <StatCard
            title="Active Investors"
            value={activeInvestors}
            icon={Users}
            trend={{ value: "+3 this week", positive: true }}
          />
          <StatCard title="Wallet Balance" value={`$${(walletBalance / 1000).toFixed(0)}K`} icon={Wallet} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Funding Progress */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Funding Progress</h2>
              <Link href="/ideas">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              {mockIdeas.slice(0, 2).map((idea) => {
                const progress = (idea.totalRaised / idea.fundingRequired) * 100
                return (
                  <div key={idea.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{idea.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${idea.totalRaised.toLocaleString()} raised of ${idea.fundingRequired.toLocaleString()} goal
                        </p>
                      </div>
                      <Badge variant={idea.status === "Approved" ? "default" : "secondary"}>{idea.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{progress.toFixed(1)}% funded</span>
                        <span>{idea.equityOffered}% equity offered</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions & Recent Investors */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/ideas/new">
                <Button className="w-full bg-transparent" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  New Idea
                </Button>
              </Link>
              <Link href="/wallet">
                <Button className="w-full bg-transparent" variant="outline">
                  <Wallet className="mr-2 h-4 w-4" />
                  Withdraw Funds
                </Button>
              </Link>
            </div>
          </Card>

          {/* Top Investors */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Top Investors</h2>
            <div className="space-y-4">
              {mockInvestments.slice(0, 3).map((investment) => (
                <div key={investment.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{investment.investorName}</p>
                      <p className="text-xs text-muted-foreground">{investment.ideaName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      ${investment.investedAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{investment.equityPercentage}% equity</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
