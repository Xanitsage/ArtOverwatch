import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, FileText, Plus, Search, Shield, AlertCircle, CheckCircle, Eye } from "lucide-react";
import { useState } from "react";

export default function IPManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //todo: remove mock functionality - this data should come from the backend
  const mockIPAssets = [
    {
      id: 1,
      title: "Abstract Harmony Series",
      type: "Artwork",
      status: "Registered",
      registrationDate: "2024-01-15",
      expiryDate: "2034-01-15",
      registrationNumber: "VA0002345678",
      description: "Collection of 12 abstract digital paintings",
      value: "$25,000"
    },
    {
      id: 2,
      title: "ArtFlow Brand Identity",
      type: "Trademark",
      status: "Pending",
      registrationDate: "2024-02-20",
      expiryDate: "2034-02-20",
      registrationNumber: "TM0009876543",
      description: "Logo, wordmark, and brand guidelines",
      value: "$15,000"
    },
    {
      id: 3,
      title: "Creative Process Documentation",
      type: "Copyright",
      status: "Draft",
      registrationDate: "2024-03-10",
      expiryDate: "2094-03-10",
      registrationNumber: "CR0001234567",
      description: "Video series documenting artistic process",
      value: "$8,500"
    },
    {
      id: 4,
      title: "Digital Art Toolkit",
      type: "Software",
      status: "Registered",
      registrationDate: "2024-01-05",
      expiryDate: "2029-01-05",
      registrationNumber: "SW0004567890",
      description: "Custom brushes and digital art tools",
      value: "$12,000"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Registered": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Draft": return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registered": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Draft": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAssets = mockIPAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || asset.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">IP Management</h1>
          <p className="text-muted-foreground">
            Protect and manage your intellectual property assets
          </p>
        </div>
        <Button data-testid="button-register-new-ip">
          <Plus className="mr-2 h-4 w-4" />
          Register New IP
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IP Assets</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-ip-assets">67</div>
            <p className="text-xs text-muted-foreground">
              +3 this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">52</div>
            <p className="text-xs text-muted-foreground">
              Fully protected
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <p className="text-xs text-muted-foreground">
              In review process
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284K</div>
            <p className="text-xs text-muted-foreground">
              Estimated total value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>IP Asset Registry</CardTitle>
          <CardDescription>
            View and manage all your intellectual property registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search IP assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-ip"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48" data-testid="select-filter-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* IP Assets List */}
          <div className="space-y-4">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="hover-elevate" data-testid={`card-ip-asset-${asset.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(asset.status)}
                        <h3 className="font-semibold text-lg">{asset.title}</h3>
                        <Badge className={getStatusColor(asset.status)}>
                          {asset.status}
                        </Badge>
                        <Badge variant="outline">{asset.type}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{asset.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Registration #</div>
                          <div className="font-mono">{asset.registrationNumber}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Registered</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {asset.registrationDate}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Expires</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {asset.expiryDate}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Estimated Value</div>
                          <div className="font-semibold text-green-600">{asset.value}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" data-testid={`button-view-${asset.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" data-testid={`button-edit-${asset.id}`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}