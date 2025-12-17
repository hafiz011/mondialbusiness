export interface Creator {
  id: string
  name: string
  email: string
  phone: string
  city: string
  country: string
  profileImage: string
  bio: string
  kycStatus: "Pending" | "Approved" | "Rejected"
  walletBalance: number
  lastLogin: string
  accountCreated: string
}
