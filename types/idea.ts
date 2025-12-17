export interface BusinessIdea {
  id: string
  title: string
  fundingRequired: number
  totalRaised: number
  equityOffered: number
  status: "Pending" | "Approved" | "Rejected"
}
