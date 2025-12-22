// @/types/invested-idea.ts

export interface InvestedIdea {
  id: string
  title: string
  summary: string
  stage: "Idea" | "MVP" | "Growth"
  marketSize: string
  fundingRequired: number
  totalRaised: number
  equityOffered: number
  status: "Pending" | "Approved" | "Rejected"
  investedAmount: number
  equityPercentage: number
}