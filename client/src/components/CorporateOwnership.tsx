import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Building2, DollarSign, PieChart, Shield, Users, Briefcase, TrendingUp, Plus, Edit } from "lucide-react";

export default function CorporateOwnership() {
  //todo: remove mock functionality - this data should come from the backend
  const mockCorporateStructure = {
    companyName: "Mzansi Creative Corp (Pty) Ltd",
    registrationNumber: "CIPC-2024/123456/07",
    foundedDate: "2024-01-15",
    totalShares: 1000,
    totalValue: 4500000, // R4.5M valuation
  };

  const mockOwnership = [
    { 
      name: "Community Members", 
      type: "Collective", 
      shares: 600, 
      percentage: 60, 
      value: 2700000,
      votingRights: "Standard",
      icon: Users 
    },
    { 
      name: "Creative Label Investment", 
      type: "External Investor", 
      shares: 100, 
      percentage: 10, 
      value: 450000,
      investment: 150000, // R150K invested for 10%
      votingRights: "Limited",
      icon: Briefcase 
    },
    { 
      name: "Artist Corp Treasury", 
      type: "Corporate Reserve", 
      shares: 150, 
      percentage: 15, 
      value: 675000,
      votingRights: "None",
      icon: Building2 
    },
    { 
      name: "Founder Equity Pool", 
      type: "Founder Shares", 
      shares: 150, 
      percentage: 15, 
      value: 675000,
      votingRights: "Enhanced",
      icon: Shield 
    }
  ];

  const mockSubEntities = [
    { 
      name: "RENE Creative Division",
      type: "Visual Arts",
      revenue: 890500,
      ownership: "100% Artist Corp",
      status: "Active",
      projects: 8
    },
    { 
      name: "YUKI Digital Studio", 
      type: "Digital Media",
      revenue: 1245600,
      ownership: "100% Artist Corp",
      status: "Active", 
      projects: 12
    },
    { 
      name: "JAMES Commercial Hub",
      type: "Business Development", 
      revenue: 2156780,
      ownership: "100% Artist Corp",
      status: "Active",
      projects: 15
    },
    { 
      name: "Corporate Treasury",
      type: "Financial Management",
      revenue: 0, // Revenue goes through here but isn't generated here
      ownership: "100% Artist Corp", 
      status: "Active",
      projects: 0
    }
  ];

  const mockRevenueDistribution = [
    { source: "Commercial Revenue", amount: 3456780, percentage: 75, color: "bg-blue-500" },
    { source: "Non-Profit Funding", amount: 1154260, percentage: 25, color: "bg-green-500" }
  ];

  const mockInsuranceCoverage = [
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
              <h3 className="font-semibold mb-2" data-testid="text-company-name">{mockCorporateStructure.companyName}</h3>
              <p className="text-sm text-muted-foreground">Registration: {mockCorporateStructure.registrationNumber}</p>
              <p className="text-sm text-muted-foreground">Founded: {mockCorporateStructure.foundedDate}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Share Structure</h3>
              <p className="text-sm text-muted-foreground">Total Shares: {mockCorporateStructure.totalShares.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Par Value: R{(mockCorporateStructure.totalValue / mockCorporateStructure.totalShares).toFixed(0)} per share</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Valuation</h3>
              <p className="text-2xl font-bold text-green-600" data-testid="text-company-valuation">R{mockCorporateStructure.totalValue.toLocaleString()}</p>
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
              {mockOwnership.map((owner, index) => (
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
                  
                  {index < mockOwnership.length - 1 && <Separator className="mt-4" />}
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
              {mockRevenueDistribution.map((revenue, index) => (
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
                R{(mockRevenueDistribution.reduce((sum, rev) => sum + rev.amount, 0)).toLocaleString()}
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
            {mockSubEntities.map((entity, index) => (
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
            {mockInsuranceCoverage.map((insurance, index) => (
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