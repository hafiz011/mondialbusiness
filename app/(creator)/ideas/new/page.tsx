"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Milestone {
  title: string
  description: string
  targetDate: string
}

export default function NewIdeaPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([{ title: "", description: "", targetDate: "" }])

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", description: "", targetDate: "" }])
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        <Link href="/ideas">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ideas
          </Button>
        </Link>

        <form className="space-y-6">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Idea Title *</Label>
                  <Input id="title" placeholder="Enter your business idea title" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary *</Label>
                  <Textarea id="summary" placeholder="Brief summary of your business idea" rows={3} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stage">Stage *</Label>
                    <Select>
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Idea">Idea</SelectItem>
                        <SelectItem value="MVP">MVP</SelectItem>
                        <SelectItem value="Growth">Growth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketSize">Market Size *</Label>
                    <Input id="marketSize" placeholder="e.g., $2.5B by 2028" required />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Problem & Solution</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="problem">Problem Statement *</Label>
                  <Textarea id="problem" placeholder="What problem does your idea solve?" rows={4} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Your Solution *</Label>
                  <Textarea id="solution" placeholder="How does your idea solve this problem?" rows={4} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenueModel">Revenue Model *</Label>
                  <Textarea id="revenueModel" placeholder="How will you make money?" rows={3} required />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Funding Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fundingRequired">Funding Required ($) *</Label>
                  <Input id="fundingRequired" type="number" placeholder="500000" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equityOffered">Equity Offered (%) *</Label>
                  <Input id="equityOffered" type="number" placeholder="15" min="0" max="100" required />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Milestones</h3>
                <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">Milestone {index + 1}</h4>
                      {milestones.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeMilestone(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`milestone-title-${index}`}>Title</Label>
                        <Input id={`milestone-title-${index}`} placeholder="Milestone title" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`milestone-description-${index}`}>Description</Label>
                        <Textarea id={`milestone-description-${index}`} placeholder="Milestone description" rows={2} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`milestone-date-${index}`}>Target Date</Label>
                        <Input id={`milestone-date-${index}`} type="date" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1">
              Submit for Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
