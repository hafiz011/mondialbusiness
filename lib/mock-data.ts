// Mock data for the Creator Dashboard

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

export interface Milestone {
  id: string
  title: string
  description: string
  targetDate: string
  status: "Pending" | "Completed"
}

export interface InvestmentRound {
  id: string
  roundName: string
  targetAmount: number
  minInvestment: number
  maxInvestment: number
  openDate: string
  closeDate: string
  status: "Open" | "Closed"
  raised: number
}

export interface BusinessIdea {
  id: string
  title: string
  summary: string
  problem: string
  solution: string
  marketSize: string
  revenueModel: string
  fundingRequired: number
  equityOffered: number
  stage: "Idea" | "MVP" | "Growth"
  status: "Pending" | "Approved" | "Rejected"
  createdDate: string
  totalRaised: number
  milestones: Milestone[]
  investmentRounds: InvestmentRound[]
}

export interface Investment {
  id: string
  investorName: string
  investorImage: string
  ideaName: string
  roundName: string
  investedAmount: number
  equityPercentage: number
  investedDate: string
}

export interface Transaction {
  id: string
  type: "Investment" | "Profit" | "Withdrawal"
  amount: number
  status: "Pending" | "Completed" | "Failed"
  transactionDate: string
  description: string
}

export const mockCreator: Creator = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  city: "San Francisco",
  country: "United States",
  profileImage: "/professional-woman-diverse.png",
  bio: "Serial entrepreneur with 10+ years of experience in fintech and SaaS. Passionate about building products that solve real problems.",
  kycStatus: "Approved",
  walletBalance: 145000,
  lastLogin: "2025-01-15T10:30:00",
  accountCreated: "2024-03-15T08:00:00",
}

export const mockIdeas: BusinessIdea[] = [
  {
    id: "1",
    title: "AI-Powered Financial Assistant",
    summary: "A smart financial assistant that helps individuals manage their money using AI and machine learning.",
    problem: "Most people struggle with personal finance management and making informed investment decisions.",
    solution:
      "Our AI-powered platform provides personalized financial advice, automated budgeting, and smart investment recommendations.",
    marketSize: "$2.5B by 2028",
    revenueModel: "Subscription-based SaaS with premium features",
    fundingRequired: 500000,
    equityOffered: 15,
    stage: "MVP",
    status: "Approved",
    createdDate: "2024-06-15T09:00:00",
    totalRaised: 320000,
    milestones: [
      {
        id: "1",
        title: "MVP Development",
        description: "Build core features and launch beta version",
        targetDate: "2024-09-01",
        status: "Completed",
      },
      {
        id: "2",
        title: "User Acquisition",
        description: "Reach 1,000 active users",
        targetDate: "2024-12-01",
        status: "Completed",
      },
      {
        id: "3",
        title: "Revenue Milestone",
        description: "Achieve $10K MRR",
        targetDate: "2025-03-01",
        status: "Pending",
      },
    ],
    investmentRounds: [
      {
        id: "1",
        roundName: "Seed Round",
        targetAmount: 500000,
        minInvestment: 5000,
        maxInvestment: 100000,
        openDate: "2024-06-15",
        closeDate: "2024-09-15",
        status: "Closed",
        raised: 320000,
      },
      {
        id: "2",
        roundName: "Series A",
        targetAmount: 2000000,
        minInvestment: 25000,
        maxInvestment: 500000,
        openDate: "2025-01-01",
        closeDate: "2025-06-01",
        status: "Open",
        raised: 450000,
      },
    ],
  },
  {
    id: "2",
    title: "Sustainable Fashion Marketplace",
    summary: "An online marketplace connecting sustainable fashion brands with conscious consumers.",
    problem:
      "Consumers struggle to find authentic sustainable fashion brands, and small sustainable brands lack visibility.",
    solution:
      "A curated marketplace with verified sustainable brands, transparent supply chains, and carbon footprint tracking.",
    marketSize: "$8.25B by 2028",
    revenueModel: "Commission on sales + premium brand memberships",
    fundingRequired: 750000,
    equityOffered: 20,
    stage: "Growth",
    status: "Approved",
    createdDate: "2024-04-10T10:00:00",
    totalRaised: 650000,
    milestones: [
      {
        id: "4",
        title: "Platform Launch",
        description: "Launch marketplace with 50 brands",
        targetDate: "2024-08-01",
        status: "Completed",
      },
      {
        id: "5",
        title: "Market Expansion",
        description: "Expand to 5 countries",
        targetDate: "2025-02-01",
        status: "Pending",
      },
    ],
    investmentRounds: [
      {
        id: "3",
        roundName: "Seed Round",
        targetAmount: 750000,
        minInvestment: 10000,
        maxInvestment: 150000,
        openDate: "2024-04-10",
        closeDate: "2024-08-10",
        status: "Closed",
        raised: 650000,
      },
    ],
  },
  {
    id: "3",
    title: "HealthTech Remote Monitoring",
    summary: "IoT-enabled health monitoring system for elderly care and chronic disease management.",
    problem: "Healthcare costs are rising and many patients need continuous monitoring outside hospitals.",
    solution: "Wearable devices and AI analytics for real-time health monitoring with automated alerts.",
    marketSize: "$15.3B by 2030",
    revenueModel: "B2B SaaS for healthcare providers + device sales",
    fundingRequired: 1200000,
    equityOffered: 18,
    stage: "Idea",
    status: "Pending",
    createdDate: "2024-12-01T14:00:00",
    totalRaised: 0,
    milestones: [
      {
        id: "6",
        title: "Prototype Development",
        description: "Build functional prototype",
        targetDate: "2025-04-01",
        status: "Pending",
      },
    ],
    investmentRounds: [],
  },
]

export const mockInvestments: Investment[] = [
  {
    id: "1",
    investorName: "Michael Chen",
    investorImage: "/diverse-businessman.png",
    ideaName: "AI-Powered Financial Assistant",
    roundName: "Seed Round",
    investedAmount: 50000,
    equityPercentage: 1.5,
    investedDate: "2024-07-15T10:00:00",
  },
  {
    id: "2",
    investorName: "Emma Williams",
    investorImage: "/confident-businesswoman.png",
    ideaName: "AI-Powered Financial Assistant",
    roundName: "Seed Round",
    investedAmount: 75000,
    equityPercentage: 2.25,
    investedDate: "2024-08-01T14:30:00",
  },
  {
    id: "3",
    investorName: "David Park",
    investorImage: "/investor-meeting.png",
    ideaName: "AI-Powered Financial Assistant",
    roundName: "Series A",
    investedAmount: 150000,
    equityPercentage: 3.75,
    investedDate: "2025-01-10T09:15:00",
  },
  {
    id: "4",
    investorName: "Sophia Rodriguez",
    investorImage: "/diverse-executive-team.png",
    ideaName: "Sustainable Fashion Marketplace",
    roundName: "Seed Round",
    investedAmount: 100000,
    equityPercentage: 2.67,
    investedDate: "2024-05-20T11:00:00",
  },
  {
    id: "5",
    investorName: "James Anderson",
    investorImage: "/venture-capitalist.jpg",
    ideaName: "Sustainable Fashion Marketplace",
    roundName: "Seed Round",
    investedAmount: 200000,
    equityPercentage: 5.33,
    investedDate: "2024-06-15T16:45:00",
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "Investment",
    amount: 150000,
    status: "Completed",
    transactionDate: "2025-01-10T09:15:00",
    description: "Investment from David Park - Series A",
  },
  {
    id: "2",
    type: "Investment",
    amount: 75000,
    status: "Completed",
    transactionDate: "2024-08-01T14:30:00",
    description: "Investment from Emma Williams - Seed Round",
  },
  {
    id: "3",
    type: "Profit",
    amount: 12500,
    status: "Completed",
    transactionDate: "2024-12-31T23:59:00",
    description: "Q4 2024 Profit Distribution",
  },
  {
    id: "4",
    type: "Withdrawal",
    amount: -50000,
    status: "Completed",
    transactionDate: "2024-11-15T10:00:00",
    description: "Operational expenses withdrawal",
  },
  {
    id: "5",
    type: "Investment",
    amount: 50000,
    status: "Completed",
    transactionDate: "2024-07-15T10:00:00",
    description: "Investment from Michael Chen - Seed Round",
  },
  {
    id: "6",
    type: "Withdrawal",
    amount: -25000,
    status: "Pending",
    transactionDate: "2025-01-14T15:30:00",
    description: "Marketing budget withdrawal",
  },
]









