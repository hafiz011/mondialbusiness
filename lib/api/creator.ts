import api from "@/lib/axios"
import type { BusinessIdea } from "@/types/idea"
import type { Investment } from "@/types/investment"

export const getCreatorIdeas = async (): Promise<BusinessIdea[]> => {
  const res = await api.get("/creator/ideas")
  return res.data
}

export const getCreatorInvestments = async (): Promise<Investment[]> => {
  const res = await api.get("/creator/investments")
  return res.data
}

