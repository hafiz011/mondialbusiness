import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockCreator, mockTransactions } from "@/lib/mock-data"
import { Wallet, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react"
import { StatCard } from "@/components/creator/stat-card"

export default function WalletPage() {
  const totalIncome = mockTransactions
    .filter((t) => t.type !== "Withdrawal" && t.status === "Completed")
    .reduce((acc, t) => acc + t.amount, 0)

  const totalWithdrawals = mockTransactions
    .filter((t) => t.type === "Withdrawal" && t.status === "Completed")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0)

  const pendingAmount = mockTransactions
    .filter((t) => t.status === "Pending")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0)

  return (
    <div className="flex-1 overflow-y-auto">

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="md:col-span-2 p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm opacity-90 mb-1">Available Balance</p>
                <p className="text-4xl font-bold">${mockCreator.walletBalance.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-primary-foreground/20 p-3">
                <Wallet className="h-6 w-6" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1">
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Deposit
              </Button>
              <Button variant="secondary" className="flex-1">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </Card>

          <StatCard
            title="Total Income"
            value={`$${(totalIncome / 1000).toFixed(0)}K`}
            icon={ArrowDownRight}
            trend={{ value: "+12% this month", positive: true }}
          />
          <StatCard title="Pending" value={`$${(pendingAmount / 1000).toFixed(0)}K`} icon={DollarSign} />
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="ghost" size="sm">
                Investment
              </Button>
              <Button variant="ghost" size="sm">
                Profit
              </Button>
              <Button variant="ghost" size="sm">
                Withdrawal
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {mockTransactions.map((transaction) => {
              const isIncome = transaction.type !== "Withdrawal"
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isIncome ? "bg-accent/10" : "bg-muted"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowDownRight className="h-5 w-5 text-accent" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(transaction.transactionDate).toLocaleDateString()} at{" "}
                        {new Date(transaction.transactionDate).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${isIncome ? "text-emerald-500" : "text-foreground"}`}>
                      {isIncome ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "default"
                          : transaction.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
