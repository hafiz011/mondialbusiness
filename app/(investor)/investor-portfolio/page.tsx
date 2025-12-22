// app/(investor)/investments/page.tsx (My Investments)

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockInvestor } from "@/lib/mock-data-in"
import React from "react"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Percent, Calendar } from "lucide-react"
import Link from "next/link"
import { mockInvestments } from "@/lib/mock-data-in"

export default function MyInvestments() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">My Investments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
          <CardDescription>Overview of your active investments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Idea</TableHead>
                <TableHead>Round</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Equity</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvestments.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.ideaName}</TableCell>
                  <TableCell>{inv.roundName}</TableCell>
                  <TableCell>${inv.investedAmount.toLocaleString()}</TableCell>
                  <TableCell>{inv.equityPercentage}%</TableCell>
                  <TableCell>
                    {/* <Badge variant="default">{inv.status}</Badge> */}
                  </TableCell>
                  <TableCell>{inv.investedDate}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/investor/ideas/${inv.ideaId}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
              <p className="text-3xl font-bold">${mockInvestor.totalInvested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Equity</p>
              <p className="text-3xl font-bold">{mockInvestor.totalEquity}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated ROI</p>
              <p className="text-3xl font-bold text-emerald-500">+12.5%</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Portfolio Growth</span>
              <span className="font-medium text-emerald-500">+8.2%</span>
            </div>
            <Progress value={8.2} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}