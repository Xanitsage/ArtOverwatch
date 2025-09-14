import { BarChart3, TrendingUp, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 pt-safe pb-safe pl-safe pr-safe">
      <div className="flex items-center space-x-2">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
      </div>
      
      <p className="text-muted-foreground">
        Track performance metrics and insights for your Artist Corporation.
      </p>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Member Engagement</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Monthly performance metrics for your Artist Corporation</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 opacity-50" />
                  <p className="mt-2">Analytics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue sources and distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <PieChart className="mx-auto h-16 w-16 opacity-50" />
                  <p className="mt-2">Revenue breakdown chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span>Commercial Revenue</span>
                    <span className="font-medium">$24,500</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>IP Licensing</span>
                    <span className="font-medium">$12,300</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Gallery Sales</span>
                    <span className="font-medium">$8,400</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Non-Profit Funding</span>
                    <span className="font-medium">$5,200</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-60">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <LineChart className="mx-auto h-12 w-12 opacity-50" />
                    <p className="mt-2">Growth trend chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Engagement</CardTitle>
              <CardDescription>Activity and participation metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 opacity-50" />
                  <p className="mt-2">Engagement metrics chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>Metrics for active and completed projects</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 opacity-50" />
                  <p className="mt-2">Project performance chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}