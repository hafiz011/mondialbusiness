export interface CreateIdeaRequest {
  title: string
  summary: string
  stage: "Idea" | "MVP" | "Growth"
  marketSize: string
  problem: string
  solution: string
  revenueModel: string
  fundingRequired: number
  equityOffered: number
  milestones: {
    title: string
    description: string
    targetDate: string
  }[]
}
