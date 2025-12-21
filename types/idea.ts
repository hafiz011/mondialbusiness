// export interface Idea {
//   id: string
//   title: string
//   summary: string
//   stage: "Idea" | "MVP" | "Growth"
//   marketSize: string
//   fundingRequired: number
//   totalRaised: number
//   equityOffered: number
//   status: "Pending" | "Approved" | "Rejected"
// }

// @/types/Idea.ts

import { CreateIdeaRequest } from "./CreateIdeaRequest"

export interface Idea extends CreateIdeaRequest {
  id: string
  status: "Pending" | "Approved" | "Rejected"
  totalRaised: number
}