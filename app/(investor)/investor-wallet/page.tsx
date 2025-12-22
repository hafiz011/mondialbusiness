// app/(investor)/wallet/page.tsx (Wallet & Transactions)

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { mockInvestor, mockTransactions } from "@/lib/mock-data-in"

export default function WalletPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Wallet & Transactions</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Wallet Balance
          </CardTitle>
          <CardDescription>Manage your funds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-4xl font-bold">${mockInvestor.walletBalance.toLocaleString()}</div>
          <div className="flex gap-4">
            <Button variant="default">
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
            <Button variant="outline">
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge variant={tx.type === "Investment" ? "destructive" : "default"}>
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={tx.amount < 0 ? "text-destructive" : "text-emerald-500"}>
                    {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tx.status === "Completed" ? "default" : "secondary"}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}