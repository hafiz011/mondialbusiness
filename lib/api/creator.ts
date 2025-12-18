import api from "@/lib/axios"
import type { BusinessIdea } from "@/types/idea"
import type { Investment } from "@/types/investment"
import type { CreatorDashboardResponse } from "@/types/creator-dashboard"
import type { CreateIdeaRequest } from "@/types/CreateIdeaRequest"

// export const getCreatorIdeas = async (): Promise<BusinessIdea[]> => {
//   const res = await api.get("/creator/ideas")
//   return res.data
// }

// export const getCreatorInvestments = async (): Promise<Investment[]> => {
//   const res = await api.get("/creator/investments")
//   return res.data
// }

// Create a new business idea
export const createIdea = async (payload: CreateIdeaRequest) => {
  const res = await api.post("/creators/new-idea", payload)
  return res.data
}

// Get creator dashboard data
export const getCreatorDashboard = async (): Promise<CreatorDashboardResponse> => {
  const res = await api.get("/creators/dashboard")
  return res.data
}

