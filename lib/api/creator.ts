// lib/api/creator.ts

import api from "@/lib/axios"
import type { Idea } from "@/types/idea"
import type { CreatorDashboardResponse } from "@/types/creator-dashboard"
import type { CreateIdeaRequest } from "@/types/CreateIdeaRequest"

// Optional: common response shape if your backend nests data
interface ApiResponse<T = unknown> {
  success?: boolean
  message?: string
  data?: T
  error?: string
}
// Get all ideas created by the logged-in creator
export const getMyIdeas = async (): Promise<Idea[]> => {
  const res = await api.get<Idea[]>("/creators/my")
  return res.data
}

// Get a specific business idea by ID
export const getIdeaById = async (id: string): Promise<Idea> => {
  const res = await api.get<Idea>(`/creators/ideas/${id}`)
  return res.data
}
// export const getIdeaById = async (id: string): Promise<Idea> => {
//   const res = await api.get<ApiResponse<Idea>>("/creators/ideas/${id}")
//   if (!res.data.data) throw new Error("Idea not found")
//   return res.data.data
// }

// Update an existing business idea
export const updateIdea = async (id: string, data: CreateIdeaRequest): Promise<void> => {
  await api.put(`/ideas/${id}`, data)
}


// Delete a specific business idea by ID
export const deleteIdea = async (id: string): Promise<void> => {
  await api.delete(`/ideas/${id}`)
}

// Create a new business idea
export const createIdea = async (payload: CreateIdeaRequest) => {
  const res = await api.post("/creators/new-idea", payload)
  return res.data
}



// // Get creator dashboard data
export const getCreatorDashboard = async (): Promise<CreatorDashboardResponse> => {
  const res = await api.get("/creators/dashboard")
  return res.data
}


// import api from "@/lib/axios"
// import type { Idea } from "@/types/idea"
// import type { CreatorDashboardResponse } from "@/types/creator-dashboard"
// import type { CreateIdeaRequest } from "@/types/CreateIdeaRequest"


// // lib/api/creator.ts

// // Get all ideas created by the logged-in creator
// export const getMyIdeas = async (): Promise<Idea[]> => {
//   const res = await api.get("/ideas/my")
//   return res.data
// }

// // Delete a specific business idea by ID
// export const deleteIdea = async (id: string) => {
//   const res = await api.delete(`/ideas/${id}`)
//   return res.data
// }


// // Create a new business idea
// export const createIdea = async (payload: CreateIdeaRequest) => {
//   const res = await api.post("/creators/new-idea", payload)
//   return res.data
// }

// // Get a specific business idea by ID
// export const getIdeaById = async (id: string) => {
//   const res = await api.get(`/ideas/${id}`)
//   return res.data
// }

// // Update an existing business idea
// export const updateIdea = async (id: string, data: CreateIdeaRequest) => {
//   const res = await api.put(`/ideas/${id}`, data)
//   return res.data
// }

// // Get creator dashboard data
// export const getCreatorDashboard = async (): Promise<CreatorDashboardResponse> => {
//   const res = await api.get("/creators/dashboard")
//   return res.data
// }

