// app/(creator)/ideas/[id]/page.tsx

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getIdeaById, getIdeaInvestments } from "@/lib/api/creator"
import type { Idea } from "@/types/idea"
import type { Investment } from "@/types/investment"

export default function IdeaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const ideaId = params.id as string

  const [idea, setIdea] = useState<Idea | null>(null)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIdea = async () => {
      if (!ideaId) return

     try {
        setLoading(true)

        // Parallel API calls for better performance
        const [ideaData, investmentData] = await Promise.all([
          getIdeaById(ideaId),
          getIdeaInvestments(ideaId).catch(() => [] as Investment[]) // fallback to empty array if no investments
        ])

        setIdea(ideaData)
        setInvestments(investmentData)
      } catch (err) {
        console.error("Failed to load idea details:", err)
        alert("Failed to load idea details")
        router.push("/ideas")
      } finally {
        setLoading(false)
      }
    }

    fetchIdea()
  }, [ideaId, router])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-lg text-muted-foreground">Loading idea details...</p>
        </div>
      </div>
    )
  }

  if (!idea) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Idea not found</p>
      </div>
    )
  }

  const progress = idea.fundingRequired > 0 
    ? (idea.totalRaised / idea.fundingRequired) * 100 
    : 0

// Calculate total equity sold from real investments
  const totalEquitySold = investments.reduce((sum, inv) => sum + inv.equityPercentage, 0)
  const equityAvailable = idea.equityOffered - totalEquitySold

  // Group investments by round
  const rounds = Array.from(new Set(investments.map(inv => inv.roundName)))

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/ideas">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ideas
            </Button>
          </Link>
          <Badge variant={idea.status === "Approved" ? "default" : "secondary"}>
            {idea.status}
          </Badge>
          <Badge variant="outline">{idea.stage}</Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="rounds">Investment Rounds</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
          </TabsList>

          {/* Overview */}
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
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Total Raised</span>
                      <span className="font-semibold text-emerald-500">
                        ${idea.totalRaised.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Target Amount</span>
                      <span className="font-semibold text-foreground">
                        ${idea.fundingRequired.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      {progress.toFixed(1)}% funded
                    </p>
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
                      <span className="text-sm font-semibold text-foreground">{totalEquitySold.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <span className="text-sm font-semibold text-foreground">
                        {equityAvailable.toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={(totalEquitySold / idea.equityOffered) * 100 || 0} className="h-2" />
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

          {/* Milestones */}
          <TabsContent value="milestones" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Project Milestones</h3>
              <div className="space-y-8">
                {idea.milestones.length > 0 ? (
                  idea.milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Calendar className="h-5 w-5" />
                        </div>
                        {index < idea.milestones.length - 1 && (
                          <div className="h-full w-0.5 bg-border my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Target: {milestone.targetDate}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No milestones defined yet</p>
                )}
              </div>
            </Card>
          </TabsContent>

         {/* Investment Rounds Tab */}
          <TabsContent value="rounds" className="space-y-6">
            {rounds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rounds.map((roundName) => {
                  const roundInvestments = investments.filter(inv => inv.roundName === roundName)
                  const roundRaised = roundInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0)
                  const roundTarget = idea.fundingRequired // simple assumption, can be improved
                  const roundProgress = roundTarget > 0 ? (roundRaised / roundTarget) * 100 : 0

                  return (
                    <Card key={roundName} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold">{roundName}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {roundInvestments.length} investment{roundInvestments.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Raised</p>
                            <p className="text-xl font-bold text-emerald-600">
                              ${roundRaised.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Target</p>
                            <p className="text-xl font-bold">${roundTarget.toLocaleString()}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{roundProgress.toFixed(1)}%</span>
                          </div>
                          <Progress value={roundProgress} className="h-3" />
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="p-16 text-center border-dashed border-2">
                <DollarSign className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
                <h3 className="text-2xl font-semibold mb-3">No Investment Rounds Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  When investors start committing, investment rounds will appear here with progress tracking.
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Investors Tab */}
          <TabsContent value="investors" className="space-y-6">
            {investments.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Investors ({investments.length})
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Total invested: ${investments.reduce((sum, inv) => sum + inv.investedAmount, 0).toLocaleString()} • 
                    Equity sold: {totalEquitySold.toFixed(2)}%
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investments.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-5 border rounded-lg hover:bg-muted/50 transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xl">
                            {inv.investorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{inv.investorName}</p>
                            <p className="text-sm text-muted-foreground">{inv.roundName}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-emerald-600">
                            ${inv.investedAmount.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">{inv.equityPercentage}% equity</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                            <Calendar className="h-3 w-3" />
                            {inv.investedDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-16 text-center border-dashed border-2">
                <Users className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
                <h3 className="text-2xl font-semibold mb-3">No Investors Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  When investors commit to your idea, they will appear here with their investment details and equity stake.
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}