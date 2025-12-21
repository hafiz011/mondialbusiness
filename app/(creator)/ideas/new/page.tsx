"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
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
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { createIdea } from "@/lib/api/creator"
import type { CreateIdeaRequest } from "@/types/CreateIdeaRequest"

interface Milestone {
  title: string
  description: string
  targetDate: string
}

export default function NewIdeaPage() {
  const [loading, setLoading] = useState(false)

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

  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: "", description: "", targetDate: "" },
  ])

  /* ---------------- Handlers ---------------- */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: id.includes("funding") || id.includes("equity") ? Number(value) || 0 : value,
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

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload: CreateIdeaRequest = {
        ...form,
        fundingRequired: Number(form.fundingRequired),
        equityOffered: Number(form.equityOffered),
        milestones: milestones.filter(m => m.title.trim() !== ""), // optional: filter empty
      }

      const res = await createIdea(payload)
      alert(res.message || "Idea submitted successfully!")
      // Optionally reset form or redirect
    } catch (err: any) {
      console.error(err)
      alert(err.message || "Failed to submit idea. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- Render ---------------- */

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        <Link href="/ideas">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ideas
          </Button>
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Basic Information</h3>
            <div className="space-y-6">
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
                  placeholder="Brief overview of your idea (4-5 sentences)"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Stage <span className="text-destructive">*</span></Label>
                  <Select value={form.stage} onValueChange={handleStageChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current stage" />
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
            </div>
          </Card>

          {/* Problem & Solution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Problem & Solution</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="problem">Problem Statement <span className="text-destructive">*</span></Label>
                <Textarea
                  id="problem"
                  value={form.problem}
                  onChange={handleInputChange}
                  placeholder="What pain point or problem are you solving?"
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
                  placeholder="How does your product/service solve this problem?"
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
                  placeholder="How will your business generate revenue?"
                  rows={4}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Funding Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Funding Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fundingRequired">Funding Required ($) <span className="text-destructive">*</span></Label>
                <Input
                  id="fundingRequired"
                  type="number"
                  min="0"
                  value={form.fundingRequired || ""}
                  onChange={handleInputChange}
                  placeholder="500000"
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
                  placeholder="15"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Milestones */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Milestones</h3>
              <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="p-5 border border-border rounded-lg bg-muted/20 space-y-4 relative"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
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
                      <Label htmlFor={`milestone-title-${index}`}>Title</Label>
                      <Input
                        id={`milestone-title-${index}`}
                        value={milestone.title}
                        onChange={(e) =>
                          handleMilestoneChange(index, "title", e.target.value)
                        }
                        placeholder="e.g., Launch MVP"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`milestone-date-${index}`}>Target Date</Label>
                      <Input
                        id={`milestone-date-${index}`}
                        type="date"
                        value={milestone.targetDate}
                        onChange={(e) =>
                          handleMilestoneChange(index, "targetDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`milestone-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`milestone-desc-${index}`}
                      value={milestone.description}
                      onChange={(e) =>
                        handleMilestoneChange(index, "description", e.target.value)
                      }
                      placeholder="What will be achieved by this milestone?"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={loading} className="min-w-48">
              {loading ? "Submitting..." : "Submit for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}