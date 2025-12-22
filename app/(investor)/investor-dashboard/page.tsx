// app/(investor)/dashboard/page.tsx (Home Dashboard)

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp, PieChart, Eye } from "lucide-react"
import Link from "next/link"
import { mockInvestments, mockInvestor } from "@/lib/mock-data-in"

export default function InvestorDashboard() {
  const performanceData = [
    { month: "Jan", return: 4 },
    { month: "Feb", return: 3 },
    { month: "Mar", return: 6 },
    { month: "Apr", return: 5 },
    { month: "May", return: 7 },
    { month: "Jun", return: 8 },
  ]

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0)
  const totalEquity = mockInvestments.reduce((sum, inv) => sum + inv.equityPercentage, 0)
  const averageReturn = 5.5 // dummy

  return (
    <div className="p-8 space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {mockInvestments.length} ideas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equity Owned</CardTitle>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEquity.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Portfolio ownership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Return</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">+{averageReturn}%</div>
            <p className="text-xs text-muted-foreground mt-1">Year to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Monthly returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Bar dataKey="return" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dummy activity - replace with real data */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New milestone completed in Eco Packaging</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            <Badge variant="secondary">Milestone</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dividend payout from AI Startup</p>
              <p className="text-sm text-muted-foreground">Yesterday</p>
            </div>
            <Badge variant="default">Payout</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New investment in Solar Tech</p>
              <p className="text-sm text-muted-foreground">3 days ago</p>
            </div>
            <Badge variant="secondary">Investment</Badge>
          </div>
          <div className="text-center pt-4">
            <Button variant="ghost">View All Activity</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


// // app/(investor)/dashboard/page.tsx

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { DollarSign, TrendingUp, PieChart, Eye } from "lucide-react"
// import Link from "next/link"
// import { getMyInvestments } from '@/lib/api/investor'
// import type { InvestedIdea } from "@/types/invested-idea"

// export default function InvestorDashboard() {
//   const [investments, setInvestments] = useState<InvestedIdea[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchInvestments = async () => {
//       try {
//         setLoading(true)
//         const data = await getMyInvestments()
//         setInvestments(data)
//       } catch (err) {
//         console.error("Failed to load investments:", err)
//         alert("Failed to load your investments")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchInvestments()
//   }, [])

//   const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0)
//   const totalEquity = investments.reduce((sum, inv) => sum + inv.equityPercentage, 0)
//   const totalIdeas = investments.length

//   if (loading) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
//           <p className="text-lg text-muted-foreground">Loading your portfolio...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex-1 overflow-y-auto bg-muted/5">
//       <div className="p-6 space-y-8 max-w-7xl mx-auto">
//         {/* Header */}
//         <div>
//           <h1 className="text-4xl font-bold text-foreground mb-2">My Investment Portfolio</h1>
//           <p className="text-xl text-muted-foreground">Track your investments and idea progress</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
//               <DollarSign className="h-5 w-5 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
//               <p className="text-xs text-muted-foreground mt-1">Across {totalIdeas} ideas</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
//               <PieChart className="h-5 w-5 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalEquity.toFixed(2)}%</div>
//               <p className="text-xs text-muted-foreground mt-1">Ownership stake</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Ideas</CardTitle>
//               <TrendingUp className="h-5 w-5 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalIdeas}</div>
//               <p className="text-xs text-muted-foreground mt-1">Ideas in portfolio</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Portfolio Status</CardTitle>
//               <Badge variant="outline" className="text-xs">Active</Badge>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-emerald-600">Growing</div>
//               <p className="text-xs text-muted-foreground mt-1">All investments active</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Investments List */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Your Investments</h2>

//           {investments.length === 0 ? (
//             <Card className="p-16 text-center">
//               <DollarSign className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
//               <h3 className="text-2xl font-semibold mb-3">No Investments Yet</h3>
//               <p className="text-muted-foreground mb-8 max-w-md mx-auto">
//                 Start exploring ideas and make your first investment to build your portfolio!
//               </p>
//               <Link href="/ideas">
//                 <Button size="lg">
//                   <Eye className="mr-2 h-5 w-5" />
//                   Browse Ideas
//                 </Button>
//               </Link>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {investments.map((investment) => {
//                 const progress = investment.fundingRequired > 0
//                   ? (investment.totalRaised / investment.fundingRequired) * 100
//                   : 0

//                 return (
//                   <Card key={investment.id} className="hover:shadow-lg transition-shadow">
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <CardTitle className="text-lg">{investment.title}</CardTitle>
//                           <CardDescription className="mt-1">{investment.summary}</CardDescription>
//                         </div>
//                         <Badge variant={investment.status === "Approved" ? "default" : "secondary"}>
//                           {investment.status}
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="space-y-3">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-muted-foreground">Your Investment</span>
//                           <span className="font-semibold">${investment.investedAmount.toLocaleString()}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-muted-foreground">Your Equity</span>
//                           <span className="font-semibold">{investment.equityPercentage}%</span>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-muted-foreground">Idea Progress</span>
//                           <span className="font-medium">{progress.toFixed(1)}%</span>
//                         </div>
//                         <Progress value={progress} className="h-2" />
//                         <div className="flex justify-between text-xs text-muted-foreground">
//                           <span>${investment.totalRaised.toLocaleString()} raised</span>
//                           <span>of ${investment.fundingRequired.toLocaleString()}</span>
//                         </div>
//                       </div>

//                       <Link href={`/ideas/${investment.id}`}>
//                         <Button className="w-full" variant="secondary">
//                           <Eye className="mr-2 h-4 w-4" />
//                           View Details
//                         </Button>
//                       </Link>
//                     </CardContent>
//                   </Card>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }