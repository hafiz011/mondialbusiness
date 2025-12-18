import api from "@/lib/axios"
import type { BusinessIdea } from "@/types/idea"
import type { Investment } from "@/types/investment"
import type { CreatorDashboardResponse } from "@/types/creator-dashboard"

// export const getCreatorIdeas = async (): Promise<BusinessIdea[]> => {
//   const res = await api.get("/creator/ideas")
//   return res.data
// }

// export const getCreatorInvestments = async (): Promise<Investment[]> => {
//   const res = await api.get("/creator/investments")
//   return res.data
// }

export const getCreatorDashboard = async (): Promise<CreatorDashboardResponse> => {
  const res = await api.get("/creators/dashboard")
  return res.data
}