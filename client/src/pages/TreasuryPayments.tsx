import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Search, CreditCard, Building, Phone, Heart, FileText, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MoneyAmount from "@/components/MoneyAmount";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Invoice, type Stakeholder, type InsertInvoice } from "@shared/schema";

export default function TreasuryPayments() {
  const [selectedTab, setSelectedTab] = useState<"favorites" | "transfer" | "payment">("favorites");

  const { data: invoices, isLoading: invoicesLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  const { data: stakeholders } = useQuery<Stakeholder[]>({
    queryKey: ["/api/stakeholders"],
  });

  const createInvoiceMutation = useMutation({
    mutationFn: (invoice: InsertInvoice) => apiRequest("POST", "/api/invoices", invoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
    },
  });

  if (invoicesLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-chart-1/20 text-chart-1";
      case "sent":
        return "bg-blue-500/20 text-blue-600";
      case "overdue":
        return "bg-destructive/20 text-destructive";
      case "draft":
        return "bg-muted/20 text-muted-foreground";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const favoritePayees = [
    { icon: Plus, label: "Add", color: "text-chart-1" },
    { icon: CreditCard, label: "Games", color: "text-muted-foreground" },
    { icon: FileText, label: "Bills", color: "text-muted-foreground" },
    { icon: Phone, label: "Phone", color: "text-muted-foreground" },
    { icon: Heart, label: "Charity", color: "text-muted-foreground" },
  ];

  const transferOptions = [
    { icon: CreditCard, label: "Card to card", color: "bg-chart-1/10 text-chart-1" },
    { icon: Building, label: "To account", color: "bg-chart-2/10 text-chart-2" },
    { icon: Building, label: "Bank transfer", color: "bg-chart-3/10 text-chart-3" },
  ];

  const paymentOptions = [
    { icon: Building, label: "Transport", color: "bg-chart-1/10 text-chart-1" },
    { icon: CreditCard, label: "Internet & TV", color: "bg-chart-2/10 text-chart-2" },
    { icon: Phone, label: "Phone", color: "bg-chart-3/10 text-chart-3" },
    { icon: DollarSign, label: "Game", color: "bg-chart-4/10 text-chart-4" },
  ];

  const recentTransfers = stakeholders?.slice(0, 5) || [];

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-payments">Payments</h1>
          <p className="text-muted-foreground">Manage invoices and client payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" data-testid="button-search-payments">
            <Search className="w-4 h-4" />
          </Button>
          <Button data-testid="button-create-invoice">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search ATMs, payments, fines" 
          className="pl-9"
          data-testid="input-search-payments"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {[
          { id: "favorites", label: "Favorites" },
          { id: "transfer", label: "Transfer options" },
          { id: "payment", label: "Payment options" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab(tab.id as any)}
            data-testid={`tab-${tab.id}`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content based on selected tab */}
      {selectedTab === "favorites" && (
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            {favoritePayees.map((item, index) => (
              <Card key={index} className="text-center hover-elevate cursor-pointer" data-testid={`favorite-${index}`}>
                <CardContent className="p-4">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "transfer" && (
        <div className="grid gap-4 md:grid-cols-3">
          {transferOptions.map((option, index) => (
            <Card key={index} className="hover-elevate cursor-pointer" data-testid={`transfer-option-${index}`}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full ${option.color} mb-4 flex items-center justify-center`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{option.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {option.label === "Card to card" && "Transfer between entity cards"}
                  {option.label === "To account" && "Transfer to another account"}
                  {option.label === "Bank transfer" && "External bank transfer"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "payment" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {paymentOptions.map((option, index) => (
            <Card key={index} className="hover-elevate cursor-pointer" data-testid={`payment-option-${index}`}>
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${option.color} mx-auto mb-3 flex items-center justify-center`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">{option.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Transfers */}
      <Card>
        <CardHeader>
          <CardTitle>Recent transfers</CardTitle>
          <CardDescription>Recent payments and transfers to stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {recentTransfers.map((stakeholder, index) => (
              <div 
                key={stakeholder.id} 
                className="text-center space-y-2 hover-elevate p-3 rounded-lg cursor-pointer"
                data-testid={`recent-transfer-${index}`}
              >
                <Avatar className="mx-auto">
                  <AvatarImage src={stakeholder.avatar || undefined} />
                  <AvatarFallback>{stakeholder.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{stakeholder.name.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Client invoices and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices && invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices.slice(0, 5).map((invoice, index) => (
                <div 
                  key={invoice.id} 
                  className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                  data-testid={`invoice-${index}`}
                >
                  <div>
                    <h4 className="font-medium">{invoice.clientName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {invoice.description}
                    </p>
                    {invoice.dueDate && (
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <MoneyAmount amount={invoice.amount} size="sm" />
                    <div className="mt-1">
                      <Badge variant="outline" className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No invoices yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first invoice to start tracking client payments
              </p>
              <Button size="sm" data-testid="button-create-first-invoice">
                Create Invoice
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}