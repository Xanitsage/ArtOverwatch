import { useQuery } from "@tanstack/react-query";
import { Plus, ArrowUpDown, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AccountCard from "@/components/AccountCard";
import MoneyAmount from "@/components/MoneyAmount";
import { type Account, type Entity } from "@shared/schema";

export default function TreasuryAccounts() {
  const { data: entities, isLoading: entitiesLoading } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  const { data: accounts, isLoading: accountsLoading } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  if (entitiesLoading || accountsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalBalance = accounts?.reduce((sum, account) => {
    return sum + parseFloat(account.balance || "0");
  }, 0) || 0;

  const activeAccounts = accounts?.filter(account => account.isActive) || [];
  const revenueStreams = activeAccounts.filter(account => account.type === "revenue_stream");
  const operatingAccounts = activeAccounts.filter(account => account.type === "operating_account");
  const savingsAccounts = activeAccounts.filter(account => account.type === "savings");

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-treasury">Treasury</h1>
          <p className="text-muted-foreground">Manage accounts and financial flows</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" data-testid="button-search-accounts">
            <Search className="w-4 h-4" />
          </Button>
          <Button data-testid="button-add-account">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search accounts, entities, transactions" 
          className="pl-9"
          data-testid="input-search-accounts"
        />
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-primary/10 via-chart-1/10 to-chart-2/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Total Balance</span>
            <Button variant="ghost" size="icon" data-testid="button-view-overview">
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </CardTitle>
          <CardDescription>All active accounts across entities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MoneyAmount amount={totalBalance} size="lg" className="text-2xl" />
            
            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button className="bg-chart-1 hover:bg-chart-1/90" data-testid="button-add-money">
                <Plus className="w-4 h-4 mr-2" />
                Add money
              </Button>
              <Button variant="outline" data-testid="button-transfer">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Categories */}
      <div className="space-y-6">
        {/* Revenue Streams */}
        {revenueStreams.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-chart-1">Revenue Streams</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {revenueStreams.map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account}
                  onClick={() => console.log("Navigate to account", account.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Operating Accounts */}
        {operatingAccounts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-chart-2">Operating Accounts</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {operatingAccounts.map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account}
                  onClick={() => console.log("Navigate to account", account.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Savings */}
        {savingsAccounts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-chart-3">Savings</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savingsAccounts.map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account}
                  onClick={() => console.log("Navigate to account", account.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {activeAccounts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No accounts yet</h3>
                <p className="text-muted-foreground">Create your first account to get started with treasury management</p>
              </div>
              <Button data-testid="button-create-first-account">
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Transfer Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Transfer</CardTitle>
          <CardDescription>Transfer between entities and accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              {entities?.slice(0, 4).map((entity, index) => (
                <Button
                  key={entity.id}
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: `${entity.color}20`, color: entity.color }}
                  data-testid={`button-entity-${index}`}
                >
                  {entity.name.charAt(0)}
                </Button>
              ))}
            </div>
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {entities?.slice(0, 4).map((entity, index) => (
                <Button
                  key={`to-${entity.id}`}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                  data-testid={`button-target-entity-${index}`}
                >
                  {entity.name.charAt(0)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}