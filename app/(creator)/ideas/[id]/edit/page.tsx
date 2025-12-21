// app/(creator)/ideas/[id]/edit/page.tsx

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getIdeaById, updateIdea } from "@/lib/api/creator"
import type { CreateIdeaRequest } from "@/types/CreateIdeaRequest"

interface Milestone {
  title: string
  description: string
  targetDate: string
}

type Idea = CreateIdeaRequest & { id: string }

export default function EditIdeaPage() {
  const params = useParams()
  const router = useRouter()
  const ideaId = params.id as string

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [ideaTitle, setIdeaTitle] = useState("Loading...")

  const [form, setForm] = useState<Omit<CreateIdeaRequest, "milestones">>({
    title: "",
    summary: "",
    stage: "Idea",
    marketSize: "",
    problem: "",
    solution: "",
    revenueModel: "",
    fundingRequired: 0,
    equityOffered: 0,
  })

  const [milestones, setMilestones] = useState<Milestone[]>([])

  // Fetch idea data from API
  useEffect(() => {
    const fetchIdea = async () => {
      if (!ideaId) return

      try {
        setLoading(true)
        const idea: Idea = await getIdeaById(ideaId)

        setIdeaTitle(idea.title || "Untitled Idea")

        setForm({
          title: idea.title || "",
          summary: idea.summary || "",
          stage: idea.stage || "Idea",
          marketSize: idea.marketSize || "",
          problem: idea.problem || "",
          solution: idea.solution || "",
          revenueModel: idea.revenueModel || "",
          fundingRequired: idea.fundingRequired || 0,
          equityOffered: idea.equityOffered || 0,
        })

        setMilestones(
          idea.milestones && idea.milestones.length > 0
            ? idea.milestones
            : [{ title: "", description: "", targetDate: "" }]
        )
      } catch (err) {
        console.error("Failed to load idea:", err)
        alert("Failed to load idea. Redirecting to ideas list.")
        router.push("/ideas")
      } finally {
        setLoading(false)
      }
    }

    fetchIdea()
  }, [ideaId, router])

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setForm((prev) => ({
      ...prev,
      [id]:
        id.includes("funding") || id.includes("equity")
          ? Number(value) || 0
          : value,
    }))
  }

  const handleStageChange = (value: string) => {
    setForm((prev) => ({ ...prev, stage: value as "Idea" | "MVP" | "Growth" }))
  }

  const handleMilestoneChange = (
    index: number,
    field: keyof Milestone,
    value: string
  ) => {
    const updated = [...milestones]
    updated[index][field] = value
    setMilestones(updated)
  }

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", description: "", targetDate: "" }])
  }

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index))
    }
  }

  // Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const payload: CreateIdeaRequest = {
        ...form,
        fundingRequired: Number(form.fundingRequired),
        equityOffered: Number(form.equityOffered),
        milestones: milestones
          .filter((m) => m.title.trim() !== "")
          .map((m) => ({
            title: m.title.trim(),
            description: m.description.trim(),
            targetDate: m.targetDate,
          })),
      }

      await updateIdea(ideaId, payload)
      alert("Idea updated successfully!")
      router.push("/ideas")
    } catch (err: any) {
      console.error("Update failed:", err)
      alert(err.message || "Failed to update idea. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">Loading idea details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-6 space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/ideas">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ideas
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Idea: {ideaTitle}</h1>
          <div className="w-32" /> {/* spacer */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Idea Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Enter a clear and compelling title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary <span className="text-destructive">*</span></Label>
                <Textarea
                  id="summary"
                  value={form.summary}
                  onChange={handleInputChange}
                  placeholder="Brief overview of your idea"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Stage <span className="text-destructive">*</span></Label>
                  <Select value={form.stage} onValueChange={handleStageChange} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idea">Idea</SelectItem>
                      <SelectItem value="MVP">MVP</SelectItem>
                      <SelectItem value="Growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketSize">Market Size <span className="text-destructive">*</span></Label>
                  <Input
                    id="marketSize"
                    value={form.marketSize}
                    onChange={handleInputChange}
                    placeholder="e.g., $2.5B by 2028"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem & Solution */}
          <Card>
            <CardHeader>
              <CardTitle>Problem & Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="problem">Problem Statement <span className="text-destructive">*</span></Label>
                <Textarea
                  id="problem"
                  value={form.problem}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Your Solution <span className="text-destructive">*</span></Label>
                <Textarea
                  id="solution"
                  value={form.solution}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenueModel">Revenue Model <span className="text-destructive">*</span></Label>
                <Textarea
                  id="revenueModel"
                  value={form.revenueModel}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Funding Details */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fundingRequired">Funding Required ($) <span className="text-destructive">*</span></Label>
                  <Input
                    id="fundingRequired"
                    type="number"
                    min="0"
                    value={form.fundingRequired || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equityOffered">Equity Offered (%) <span className="text-destructive">*</span></Label>
                  <Input
                    id="equityOffered"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={form.equityOffered || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Milestones</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg bg-card space-y-4 relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Milestone {index + 1}</h4>
                      {milestones.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMilestone(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={milestone.title}
                          onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                          placeholder="e.g., Complete MVP"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Target Date</Label>
                        <Input
                          type="date"
                          value={milestone.targetDate}
                          onChange={(e) => handleMilestoneChange(index, "targetDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                        rows={3}
                        placeholder="What will be achieved by this milestone?"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-8">
            <Link href="/ideas">
              <Button type="button" variant="outline" disabled={submitting}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}