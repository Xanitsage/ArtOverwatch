import { FileText, Search, Filter, Plus } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContractsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-primary" style={{display: 'block'}} />
        <h1 className="text-2xl font-bold tracking-tight">Contracts Management</h1>
      </div>
      
      <p className="text-muted-foreground">
        Manage all contracts and agreements for The Grid Atelier collective.
      </p>
      
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" style={{display: 'block'}} />
          <Input type="search" placeholder="Search contracts..." className="pl-8" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" style={{display: 'block'}} />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" style={{display: 'block'}} />
            New Contract
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Gallery Exhibition Agreement", party: "Modern Art Gallery", expires: "Dec 15, 2023", type: "Exhibition" },
              { title: "IP Licensing Contract", party: "Creative Media Inc.", expires: "Mar 22, 2024", type: "Licensing" },
              { title: "Artist Collaboration Agreement", party: "René & Yuki", expires: "Jan 10, 2024", type: "Collaboration" },
              { title: "Non-Profit Partnership", party: "Arts Foundation", expires: "Nov 30, 2023", type: "Partnership" },
              { title: "Commercial Commission", party: "Urban Designs Co.", expires: "Feb 28, 2024", type: "Commission" },
            ].map((contract, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{contract.title}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">{contract.type}</span>
                  </div>
                  <CardDescription>With {contract.party}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{contract.expires}</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "New Gallery Partnership", party: "Contemporary Arts Space", status: "Awaiting Signature", type: "Partnership" },
              { title: "Public Art Commission", party: "City Council", status: "Under Review", type: "Commission" },
            ].map((contract, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{contract.title}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">{contract.type}</span>
                  </div>
                  <CardDescription>With {contract.party}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-amber-500">{contract.status}</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="text-xs mr-2">Review</Button>
                      <Button size="sm" className="text-xs">Sign</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="archived" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Previous Exhibition Contract", party: "National Gallery", ended: "Oct 15, 2022", type: "Exhibition" },
              { title: "Limited Edition Print Agreement", party: "Fine Art Prints Co.", ended: "Aug 30, 2022", type: "Licensing" },
              { title: "Workshop Facilitation Contract", party: "Community Arts Center", ended: "Dec 12, 2022", type: "Service" },
            ].map((contract, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{contract.title}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">{contract.type}</span>
                  </div>
                  <CardDescription>With {contract.party}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ended:</span>
                      <span>{contract.ended}</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="text-xs">View Archive</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}