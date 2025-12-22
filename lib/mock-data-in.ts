// lib/mock-data.ts (Dummy data for demo - place this in lib/mock-data.ts)

export const mockInvestor = {
  fullName: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  country: "United States",
  profileImage: "https://i.pravatar.cc/150?img=1",
  bio: "Experienced investor in fintech and sustainable startups. Looking for innovative ideas with high growth potential.",
  kycStatus: "Approved",
  walletBalance: 250000,
  totalInvested: 75000,
  totalEquity: 4.5,
  lastLogin: "2025-12-21",
  accountCreated: "2025-01-15"
}

export const mockIdeas = [
  {
    id: "1",
    title: "Eco-Friendly Packaging Solution",
    shortSummary: "Biodegradable packaging for e-commerce",
    stage: "MVP",
    marketSize: "$10B by 2030",
    revenueModel: "Subscription + B2B sales",
    fundingRequired: 500000,
    fundingRaised: 300000,
    equityOffered: 15,
    creatorName: "Jane Smith",
    status: "Approved",
    problem: "Traditional packaging contributes to environmental pollution...",
    solution: "Our plant-based materials decompose in 30 days...",
    milestones: [
      { id: "1", title: "Prototype Complete", status: "Completed", targetDate: "2025-06-01" },
      { id: "2", title: "Pilot Launch", status: "In Progress", targetDate: "2025-09-01" },
      { id: "3", title: "Full Production", status: "Pending", targetDate: "2026-01-01" }
    ],
    investmentRounds: [
      {
        id: "1",
        roundName: "Seed Round",
        openDate: "2025-03-01",
        closeDate: "2025-06-01",
        status: "Closed",
        targetAmount: 200000,
        raised: 200000,
        minInvestment: 5000,
        maxInvestment: 50000
      },
      {
        id: "2",
        roundName: "Series A",
        openDate: "2025-07-01",
        closeDate: "2025-12-31",
        status: "Open",
        targetAmount: 300000,
        raised: 100000,
        minInvestment: 10000,
        maxInvestment: 100000
      }
    ]
  },
  // Add more mock ideas as needed
  // ...
]

export const mockInvestments = [
  {
    id: "1",
    ideaId: "1",
    ideaName: "Eco-Friendly Packaging Solution",
    roundName: "Seed Round",
    investedAmount: 25000,
    equityPercentage: 2.5,
    investedDate: "2025-04-15"
  },
  // Add more mock investments
  // ...
]

export const mockTransactions = [
  {
    id: "1",
    type: "Investment",
    amount: -25000,
    status: "Completed",
    date: "2025-04-15"
  },
  {
    id: "2",
    type: "Deposit",
    amount: 100000,
    status: "Completed",
    date: "2025-03-01"
  },
  {
    id: "3",
    type: "Withdrawal",
    amount: -5000,
    status: "Pending",
    date: "2025-12-20"
  },
  // Add more
]