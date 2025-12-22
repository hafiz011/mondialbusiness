// lib/api/investor.ts

import api from "@/lib/axios"
import type { InvestedIdea } from "@/types/invested-idea"

// Get all ideas the logged-in investor has invested in
export const getMyInvestments = async (): Promise<InvestedIdea[]> => {
  const res = await api.get<InvestedIdea[]>("/investor/my-investments")
  return res.data
}