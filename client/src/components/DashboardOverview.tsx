import { BarChart3, DollarSign, FolderOpen, Shield, TrendingUp, Users } from "lucide-react";
import MetricsCard from "./MetricsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Artist_workspace_hero_image_c69ecf2d.png";
import sampleArt from "@assets/generated_images/Sample_artwork_thumbnail_ebf97e2a.png";

export default function DashboardOverview() {
  //todo: remove mock functionality - this data should come from the backend
  const mockMetrics = [
    { title: "Total Revenue", value: "$45,231", change: "+20.1% from last month", changeType: "positive" as const, icon: DollarSign },
    { title: "Active Projects", value: "12", change: "+2 this week", changeType: "positive" as const, icon: FolderOpen },
    { title: "IP Assets", value: "67", change: "3 pending registration", changeType: "neutral" as const, icon: Shield },
    { title: "Community Members", value: "1,284", change: "+5.4% growth", changeType: "positive" as const, icon: Users },
  ];

  const mockProjects = [
    { name: "Digital Art Collection", status: "In Progress", revenue: "$12,400", completion: 75 },
    { name: "Brand Identity Package", status: "Review", revenue: "$8,900", completion: 90 },
    { name: "NFT Series Launch", status: "Planning", revenue: "$0", completion: 25 },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white p-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" data-testid="text-hero-title">
              Welcome back to your creative enterprise
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Your IP portfolio has grown 20% this month
            </p>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30" data-testid="button-explore-projects">
              Explore Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {/* Recent Projects */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Recent Projects
            </CardTitle>
            <CardDescription>
              Track your active creative projects and their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover-elevate" data-testid={`card-project-${index}`}>
                  <div className="space-y-1">
                    <h4 className="font-semibold">{project.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={project.status === "In Progress" ? "default" : project.status === "Review" ? "secondary" : "outline"}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.completion}% complete</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{project.revenue}</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your creative business efficiently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" data-testid="button-register-ip">
              <Shield className="mr-2 h-4 w-4" />
              Register New IP
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-create-project">
              <FolderOpen className="mr-2 h-4 w-4" />
              Create Project
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-view-analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-manage-revenue">
              <TrendingUp className="mr-2 h-4 w-4" />
              Manage Revenue
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Artwork */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Artwork</CardTitle>
          <CardDescription>
            Showcase your latest creative works
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative aspect-video rounded-lg overflow-hidden hover-elevate" data-testid={`image-artwork-${i}`}>
                <img 
                  src={sampleArt} 
                  alt={`Artwork ${i}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}