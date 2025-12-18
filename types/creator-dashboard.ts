export interface DashboardIdea {
  id: string
  title: string
  status: "Pending" | "Approved" | "Rejected"
  stage: "Idea" | "MVP" | "Growth"
  fundingRequired: number
  equityOffered: number
  totalRaised: number
}

export interface CreatorDashboardResponse {
  totalIdeas: number
  totalFundRaised: number
  activeInvestors: number
  walletBalance: number
  ideas: DashboardIdea[]
}
