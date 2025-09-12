import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowRight, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MoneyAmount from "@/components/MoneyAmount";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Transaction, type Account, type Entity, type InsertTransaction } from "@shared/schema";

export default function TreasuryTransfers() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const { data: entities } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  const createTransferMutation = useMutation({
    mutationFn: (transfer: InsertTransaction) => apiRequest("POST", "/api/transactions", transfer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
    },
  });

  if (transactionsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getAccountName = (accountId: string | null) => {
    if (!accountId) return "External";
    return accounts?.find(a => a.id === accountId)?.name || accountId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-1/20 text-chart-1";
      case "pending":
        return "bg-yellow-500/20 text-yellow-600";
      case "failed":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Filter transactions by period
  const filterTransactionsByPeriod = (transactions: Transaction[], period: string) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return transactions?.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt!);
      switch (period) {
        case "today":
          return transactionDate >= startOfToday;
        case "yesterday":
          const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
          return transactionDate >= startOfYesterday && transactionDate < startOfToday;
        case "week":
          const startOfWeek = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= startOfWeek;
        default:
          return true;
      }
    }) || [];
  };

  const filteredTransactions = filterTransactionsByPeriod(transactions || [], selectedPeriod);
  
  const totalSpent = filteredTransactions
    .filter(t => t.type === "transfer" || t.type === "payment")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-transfers">Transfers</h1>
          <p className="text-muted-foreground">Track money movements across entities</p>
        </div>
        <Button data-testid="button-new-transfer">
          <Plus className="w-4 h-4 mr-2" />
          New Transfer
        </Button>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2">
        {["today", "yesterday", "week"].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
            data-testid={`button-period-${period}`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      {/* Spending Overview */}
      <Card className="bg-gradient-to-r from-chart-2/5 to-chart-3/5">
        <CardHeader>
          <CardTitle>Spendings in {selectedPeriod === "today" ? "December" : selectedPeriod}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MoneyAmount amount={totalSpent} size="lg" className="text-2xl" />
            
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalSpent / 10000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold capitalize">{selectedPeriod}</h2>
        
        {filteredTransactions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No transfers {selectedPeriod}</h3>
                  <p className="text-muted-foreground">Transactions will appear here when you make transfers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <Card key={transaction.id} className="hover-elevate" data-testid={`transaction-${index}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{getAccountName(transaction.fromAccountId)}</h4>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <h4 className="font-medium">{getAccountName(transaction.toAccountId)}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.description || "Transfer"}
                        </p>
                        {transaction.reference && (
                          <p className="text-xs text-muted-foreground">
                            Ref: {transaction.reference}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <MoneyAmount 
                        amount={transaction.amount} 
                        showSign 
                        className="font-medium"
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getStatusColor(transaction.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(transaction.status)}
                            {transaction.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Historical Transfers by Date */}
      {selectedPeriod === "week" && (
        <Card>
          <CardHeader>
            <CardTitle>11 December</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Sample historical transaction */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-chart-1/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-chart-1" />
                </div>
                <div>
                  <h4 className="font-medium">John Levi</h4>
                  <p className="text-sm text-muted-foreground">12:45 PM</p>
                </div>
              </div>
              <MoneyAmount amount="2500" showSign className="text-chart-1" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}