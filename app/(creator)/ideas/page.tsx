// app/(creator)/ideas/page.tsx

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { getMyIdeas } from "@/lib/api/creator"
import type { Idea } from "@/types/idea"

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true)
        const data = await getMyIdeas()
        setIdeas(data)
      } catch (err) {
        console.error("Failed to fetch ideas:", err)
        alert("Failed to load your ideas. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [])

  const approvedCount = ideas.filter((i) => i.status === "Approved").length

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading your ideas...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">All Business Ideas</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {ideas.length} ideas • {approvedCount} approved
            </p>
          </div>
          <Link href="/ideas/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Idea
            </Button>
          </Link>
        </div>

        {ideas.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-6xl">💡</div>
              <h3 className="text-xl font-semibold">No ideas yet</h3>
              <p className="text-muted-foreground">Start by submitting your first business idea</p>
              <Link href="/ideas/new">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Idea
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {ideas.map((idea) => {
              const progress = idea.fundingRequired > 0
                ? (idea.totalRaised / idea.fundingRequired) * 100
                : 0

              return (
                <Card key={idea.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{idea.title}</h3>
                            <Badge
                              variant={
                                idea.status === "Approved"
                                  ? "default"
                                  : idea.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {idea.status}
                            </Badge>
                            <Badge variant="outline">{idea.stage}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.summary}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Funding Required</p>
                          <p className="text-sm font-semibold text-foreground">
                            ${idea.fundingRequired.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Total Raised</p>
                          <p className="text-sm font-semibold text-emerald-500">
                            ${idea.totalRaised.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Equity Offered</p>
                          <p className="text-sm font-semibold text-foreground">{idea.equityOffered}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Market Size</p>
                          <p className="text-sm font-semibold text-foreground">{idea.marketSize}</p>
                        </div>
                      </div>

                      {idea.totalRaised > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="font-medium text-foreground">{progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Link href={`/ideas/${idea.id}`} className="flex-1 lg:flex-none">
                        <Button variant="outline" className="w-full bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/ideas/${idea.id}/edit`} className="flex-1 lg:flex-none">
                        <Button variant="outline" className="w-full bg-transparent">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}