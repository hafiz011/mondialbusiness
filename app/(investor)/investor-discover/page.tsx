// app/(investor)/discover/page.tsx (Discover Ideas)
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { mockIdeas } from "@/lib/mock-data-in"
import { Eye } from "lucide-react"
import { useState } from "react"

export default function DiscoverIdeas() {
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState("All")

  const filteredIdeas = mockIdeas.filter(idea => 
    idea.title.toLowerCase().includes(search.toLowerCase()) &&
    (stageFilter === "All" || idea.stage === stageFilter) &&
    idea.status === "Approved"
  )

  return (
    <div className="p-8 space-y-8">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search ideas..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Stages</SelectItem>
            <SelectItem value="Idea">Idea</SelectItem>
            <SelectItem value="MVP">MVP</SelectItem>
            <SelectItem value="Growth">Growth</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-12">No ideas match your search</p>
        ) : (
          filteredIdeas.map((idea) => (
            <Card key={idea.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{idea.title}</CardTitle>
                    <CardDescription className="mt-1">{idea.creatorName}</CardDescription>
                  </div>
                  <Badge variant="outline">{idea.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">{idea.shortSummary}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-medium">${idea.fundingRaised.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target</span>
                    <span className="font-medium">${idea.fundingRequired.toLocaleString()}</span>
                  </div>
                  <Progress value={(idea.fundingRaised / idea.fundingRequired) * 100} className="h-2" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Market Size</span>
                  <span>{idea.marketSize}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Equity Offered</span>
                  <span>{idea.equityOffered}%</span>
                </div>
                <Link href={`/ideas/${idea.id}`}>
                  <Button className="w-full mt-4">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}