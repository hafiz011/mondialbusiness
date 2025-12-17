
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockIdeas, mockInvestments } from "@/lib/mock-data"
import { ArrowLeft, CheckCircle2, Clock, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const idea = mockIdeas.find((i) => i.id === id)

  if (!idea) {
    notFound()
  }

  const ideaInvestments = mockInvestments.filter((inv) => inv.ideaName === idea.title)
  const progress = (idea.totalRaised / idea.fundingRequired) * 100
  const equitySold = ideaInvestments.reduce((acc, inv) => acc + inv.equityPercentage, 0)

  return (
    <div className="flex-1 overflow-y-auto">

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/ideas">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ideas
            </Button>
          </Link>
          <Badge variant={idea.status === "Approved" ? "default" : "secondary"}>{idea.status}</Badge>
          <Badge variant="outline">{idea.stage}</Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="rounds">Investment Rounds</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Problem</h3>
                  <p className="text-muted-foreground leading-relaxed">{idea.problem}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">{idea.solution}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Revenue Model</h3>
                  <p className="text-muted-foreground leading-relaxed">{idea.revenueModel}</p>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Funding Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Total Raised</span>
                        <span className="font-semibold text-accent">${idea.totalRaised.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Target Amount</span>
                        <span className="font-semibold text-foreground">${idea.fundingRequired.toLocaleString()}</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-2 text-center">{progress.toFixed(1)}% funded</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Equity Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Offered</span>
                      <span className="text-sm font-semibold text-foreground">{idea.equityOffered}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sold</span>
                      <span className="text-sm font-semibold text-accent">{equitySold.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <span className="text-sm font-semibold text-foreground">
                        {(idea.equityOffered - equitySold).toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={(equitySold / idea.equityOffered) * 100} className="h-2" />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Market Info</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Market Size</p>
                      <p className="text-sm font-semibold text-foreground">{idea.marketSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Stage</p>
                      <p className="text-sm font-semibold text-foreground">{idea.stage}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Project Milestones</h3>
              <div className="space-y-4">
                {idea.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          milestone.status === "Completed"
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {milestone.status === "Completed" ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      {index < idea.milestones.length - 1 && <div className="h-full w-0.5 bg-border my-2" />}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                        <Badge variant={milestone.status === "Completed" ? "default" : "secondary"}>
                          {milestone.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Target: {new Date(milestone.targetDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rounds" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {idea.investmentRounds.map((round) => {
                const roundProgress = (round.raised / round.targetAmount) * 100
                return (
                  <Card key={round.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{round.roundName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(round.openDate).toLocaleDateString()} -{" "}
                          {new Date(round.closeDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={round.status === "Open" ? "default" : "secondary"}>{round.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Target Amount</p>
                        <p className="text-sm font-semibold text-foreground">${round.targetAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Raised</p>
                        <p className="text-sm font-semibold text-accent">${round.raised.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                        <p className="text-sm font-semibold text-foreground">${round.minInvestment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Max Investment</p>
                        <p className="text-sm font-semibold text-foreground">${round.maxInvestment.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{roundProgress.toFixed(1)}%</span>
                      </div>
                      <Progress value={roundProgress} className="h-2" />
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="investors" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Investors</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ideaInvestments.length} investors • $
                    {ideaInvestments.reduce((acc, inv) => acc + inv.investedAmount, 0).toLocaleString()} total
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {ideaInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{investment.investorName}</p>
                        <p className="text-sm text-muted-foreground">{investment.roundName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${investment.investedAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{investment.equityPercentage}% equity</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(investment.investedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
