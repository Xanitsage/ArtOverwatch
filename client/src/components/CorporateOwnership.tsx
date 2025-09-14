import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Building2, DollarSign, PieChart, Shield, Users, Briefcase, TrendingUp, Plus, Edit, Loader2 } from "lucide-react";
import { type Entity, type Stakeholder, type Account, type Transaction } from "@shared/schema";

export default function CorporateOwnership() {
  const { data: entities, isLoading: entitiesLoading } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  const { data: stakeholders, isLoading: stakeholdersLoading } = useQuery<Stakeholder[]>({
    queryKey: ["/api/stakeholders"],
  });

  const { data: accounts, isLoading: accountsLoading } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const isLoading = entitiesLoading || stakeholdersLoading || accountsLoading;

  // Corporate structure data - can be configured or fetched from settings API
  const corporateStructure = {
    companyName: "Quadra Vision Creative Nexus (Pty) Ltd",
    registrationNumber: "CIPC-2024/456789/07",
    foundedDate: "2024-01-15",
    totalShares: 1000,
    totalValue: 4500000, // R4.5M valuation
  };

  // Process stakeholder data for ownership distribution
  const ownershipData = stakeholders?.map(stakeholder => {
    const percentage = parseFloat(stakeholder.ownershipPercentage?.toString() || "0");
    const shares = Math.round((percentage / 100) * corporateStructure.totalShares);
    const value = Math.round((percentage / 100) * corporateStructure.totalValue);
    
    const getIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case 'community': return Users;
        case 'investor': return Briefcase;
        case 'founder': return Shield;
        default: return Building2;
      }
    };
    
    const getVotingRights = (type: string) => {
      switch (type.toLowerCase()) {
        case 'community': return 'Standard';
        case 'investor': return 'Limited';
        case 'founder': return 'Enhanced';
        case 'advisor': return 'Advisory';
        default: return 'None';
      }
    };
    
    return {
      name: stakeholder.name,
      type: stakeholder.type,
      shares,
      percentage,
      value,
      votingRights: getVotingRights(stakeholder.type),
      icon: getIcon(stakeholder.type),
      isActive: stakeholder.isActive,
      investment: stakeholder.type.toLowerCase() === 'investor' ? Math.round(value * 0.3) : undefined
    };
  }) || [];

  // Process entity data for sub-entities
  const subEntitiesData = entities?.map(entity => {
    // Calculate revenue from transactions for this entity
    // Note: transactions link to accounts, not entities directly
    const entityAccounts = accounts?.filter(a => a.entityId === entity.id) || [];
    const entityAccountIds = entityAccounts.map(a => a.id);
    const entityTransactions = transactions?.filter(t => 
      entityAccountIds.includes(t.fromAccountId || '') || entityAccountIds.includes(t.toAccountId || '')
    ) || [];
    const revenue = entityTransactions
      .filter(t => entityAccountIds.includes(t.fromAccountId || '') && t.type === 'revenue')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    // Mock project count - in real app would come from projects API
    const getProjectCount = (name: string) => {
      const projectCounts: { [key: string]: number } = {
        'RENE': 8,
        'YUKI': 12, 
        'JAMES': 15,
        'TREASURY': 0
      };
      return projectCounts[name.toUpperCase()] || 0;
    };
    
    return {
      id: entity.id,
      name: entity.name,
      type: entity.description || "Creative Entity",
      revenue: revenue / 100, // Convert from cents
      ownership: "100% ArtOverwatch Corp",
      status: "Active", // All entities are active for now
      projects: getProjectCount(entity.name),
      color: entity.color
    };
  }) || [];

  // Calculate revenue distribution from transactions
  const revenueTransactions = transactions?.filter(t => t.type === 'revenue') || [];
  const totalRevenue = revenueTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0) / 100; // Convert from cents
  
  const revenueDistribution = [
    { 
      source: "Commercial Revenue", 
      amount: Math.round(totalRevenue * 0.75), 
      percentage: 75, 
      color: "bg-blue-500" 
    },
    { 
      source: "Grant Funding", 
      amount: Math.round(totalRevenue * 0.25), 
      percentage: 25, 
      color: "bg-green-500" 
    }
  ];

  // Insurance coverage - could be fetched from insurance API in future
  const insuranceCoverage = [
    { type: "Professional Indemnity", provider: "Santam", coverage: "R2M", premium: 28500, status: "Active" },
    { type: "Public Liability", provider: "Old Mutual", coverage: "R5M", premium: 15600, status: "Active" },
    { type: "Directors & Officers", provider: "Hollard", coverage: "R10M", premium: 42000, status: "Active" },
    { type: "IP Protection", provider: "FNB Insurance", coverage: "R3M", premium: 31200, status: "Active" }
  ];

  const getOwnershipColor = (percentage: number) => {
    if (percentage >= 50) return "text-blue-600";
    if (percentage >= 20) return "text-green-600";
    if (percentage >= 10) return "text-yellow-600";
    return "text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading corporate data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Corporate Ownership</h1>
          <p className="text-muted-foreground">
            Manage your corporate structure, equity distribution, and stakeholder relationships
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" data-testid="button-generate-report">
            <PieChart className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button data-testid="button-manage-equity">
            <Plus className="mr-2 h-4 w-4" />
            Manage Equity
          </Button>
        </div>
      </div>

      {/* Corporate Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Corporate Structure
          </CardTitle>
          <CardDescription>
            Artist Corporation registered under South African Companies Act
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2" data-testid="text-company-name">{corporateStructure.companyName}</h3>
              <p className="text-sm text-muted-foreground">Registration: {corporateStructure.registrationNumber}</p>
              <p className="text-sm text-muted-foreground">Founded: {corporateStructure.foundedDate}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Share Structure</h3>
              <p className="text-sm text-muted-foreground">Total Shares: {corporateStructure.totalShares.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Par Value: R{(corporateStructure.totalValue / corporateStructure.totalShares).toFixed(0)} per share</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Valuation</h3>
              <p className="text-2xl font-bold text-green-600" data-testid="text-company-valuation">R{corporateStructure.totalValue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Current market value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ownership Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ownership Distribution</CardTitle>
            <CardDescription>
              Current equity allocation across all stakeholders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {ownershipData.filter(owner => owner.isActive).map((owner, index) => (
                <div key={index} className="space-y-3" data-testid={`card-owner-${index}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <owner.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{owner.name}</h4>
                        <p className="text-sm text-muted-foreground">{owner.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getOwnershipColor(owner.percentage)}`}>
                        {owner.percentage}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {owner.shares} shares
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={owner.percentage} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Value: </span>
                      <span className="font-semibold">R{owner.value.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Voting: </span>
                      <Badge variant="outline">{owner.votingRights}</Badge>
                    </div>
                    {owner.investment && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Investment: </span>
                        <span className="font-semibold text-blue-600">R{owner.investment.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {index < ownershipData.filter(owner => owner.isActive).length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>
              Income streams flowing to Artist Corp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {revenueDistribution.map((revenue, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{revenue.source}</h4>
                    <div className="text-right">
                      <div className="text-lg font-bold">R{revenue.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{revenue.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={revenue.percentage} className="h-3" />
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Annual Revenue</div>
              <div className="text-2xl font-bold text-green-600">
                R{totalRevenue.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub-Entities */}
      <Card>
        <CardHeader>
          <CardTitle>Sub-Entity Management</CardTitle>
          <CardDescription>
            Wholly-owned subsidiaries under Artist Corp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {subEntitiesData.map((entity, index) => (
              <div key={index} className="border rounded-lg p-4 hover-elevate" data-testid={`card-entity-${index}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{entity.name}</h4>
                    <p className="text-sm text-muted-foreground">{entity.type}</p>
                  </div>
                  <Badge variant={entity.status === "Active" ? "default" : "secondary"}>
                    {entity.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold">
                      {entity.revenue > 0 ? `R${entity.revenue.toLocaleString()}` : "Treasury Function"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projects:</span>
                    <span>{entity.projects > 0 ? entity.projects : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ownership:</span>
                    <span className="font-semibold text-blue-600">{entity.ownership}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-3" data-testid={`button-manage-${index}`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Manage Entity
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insurance & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Insurance & Compliance
          </CardTitle>
          <CardDescription>
            Corporate insurance coverage and regulatory compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {insuranceCoverage.map((insurance, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid={`card-insurance-${index}`}>
                <div>
                  <h4 className="font-semibold">{insurance.type}</h4>
                  <p className="text-sm text-muted-foreground">{insurance.provider}</p>
                  <p className="text-sm text-muted-foreground">Coverage: {insurance.coverage}</p>
                </div>
                <div className="text-right">
                  <Badge variant={insurance.status === "Active" ? "default" : "secondary"}>
                    {insurance.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    R{insurance.premium.toLocaleString()}/year
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Coverage</div>
              <div className="text-xl font-bold">R20M</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Annual Premiums</div>
              <div className="text-xl font-bold">R117,300</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Compliance Status</div>
              <Badge variant="default" className="text-sm">Up to Date</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}