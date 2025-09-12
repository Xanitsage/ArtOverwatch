import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, CreditCard, DollarSign, TrendingUp, Wallet, Download, Plus } from "lucide-react";
import { useState } from "react";

export default function TreasuryDashboard() {
  const [timeframe, setTimeframe] = useState("30d");

  //todo: remove mock functionality - this data should come from the backend
  const mockFinancials = {
    totalBalance: 2268950,
    monthlyRevenue: 692540,
    monthlyExpenses: 435890,
    netIncome: 256650,
    revenueGrowth: 12.5,
    expenseChange: -5.2
  };

  const mockTransactions = [
    { id: 1, type: "income", amount: 130150, description: "Mzansi Art Commission", date: "2024-03-15", client: "Sasol Corp" },
    { id: 2, type: "expense", amount: -18360, description: "Creative Software Suite", date: "2024-03-14", client: "Adobe SA" },
    { id: 3, type: "income", amount: 229500, description: "African Heritage NFT Sale", date: "2024-03-12", client: "OpenSea" },
    { id: 4, type: "expense", amount: -13005, description: "Digital Marketing ZA", date: "2024-03-10", client: "Google Ads SA" },
    { id: 5, type: "income", amount: 79560, description: "Licensing Fee - SABC", date: "2024-03-08", client: "SABC Creative" },
    { id: 6, type: "expense", amount: -36720, description: "Equipment Purchase", date: "2024-03-05", client: "Wacom SA" },
  ];

  const mockRevenueStreams = [
    { source: "Corporate Commissions", amount: 283250, percentage: 41, change: "+15%" },
    { source: "African Heritage NFTs", amount: 229500, percentage: 33, change: "+22%" },
    { source: "Licensing & IP", amount: 125460, percentage: 18, change: "+8%" },
    { source: "Non-Profit Funding", amount: 54024, percentage: 8, change: "+12%" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Treasury Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your creative business finances and revenue streams
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" data-testid="button-export-data">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button data-testid="button-add-transaction">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-balance">
              R{mockFinancials.totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Available funds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R{mockFinancials.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{mockFinancials.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R{mockFinancials.monthlyExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              {mockFinancials.expenseChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R{mockFinancials.netIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Streams and Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams</CardTitle>
            <CardDescription>
              Track income sources and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRevenueStreams.map((stream, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid={`card-revenue-stream-${index}`}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{stream.source}</h4>
                      <Badge variant="outline" className="text-green-600">
                        {stream.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">R{stream.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{stream.percentage}% of total revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest financial activity and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover-elevate" data-testid={`card-transaction-${transaction.id}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {transaction.type === 'income' ? 
                        <ArrowUpRight className="h-4 w-4" /> : 
                        <ArrowDownRight className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.client} • {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}R{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>
            Monthly revenue and expense tracking over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
            <div className="text-center text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-2" />
              <p>Financial charts and analytics will be displayed here</p>
              <p className="text-sm">Connect your accounting data to see detailed insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}