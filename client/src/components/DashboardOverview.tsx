import { BarChart3, DollarSign, FolderOpen, Shield, TrendingUp, Users, Play, Pause } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "./CircularProgress";
import CategoryPill from "./CategoryPill";
import sampleArt from "@assets/base_img/artwork-thumb.png";
import { useEntity } from "@/contexts/EntityContext";
import { useNavigate } from "react-router-dom";

export default function DashboardOverview() {
  const { selectedEntity } = useEntity();
  const navigate = useNavigate();
  const categories = [
    { label: "Creative", active: true },
    { label: "Business", active: false },
    { label: "Treasury", active: false, variant: "accent" as const },
  ];

  const projectData = [
    {
      name: "Gallery Exhibition",
      subtitle: "Artist Corp",
      progress: 84,
      color: "hsl(var(--chart-1))",
      isPlaying: false
    },
    {
      name: "Commercial Revenue",
      subtitle: "Treasury",
      progress: 6,
      color: "hsl(var(--chart-2))",
      isPlaying: true
    }
  ];

  const controlItems = [
    { label: "Artworks", color: "hsl(var(--chart-1))" },
    { label: "Exhibitions", color: "hsl(var(--chart-1))" },
    { label: "IP Rights", color: "hsl(var(--chart-1))" },
    { label: "Branding", color: "hsl(var(--chart-1))" },
  ];

  const treasuryItems = [
    { label: "Revenue", color: "hsl(var(--chart-2))" },
    { label: "Investments", color: "hsl(var(--chart-2))" },
    { label: "Funding", color: "hsl(var(--chart-2))" },
    { label: "Insurance", color: "hsl(var(--chart-2))" },
  ];

  return (
    <div className="space-y-6 p-6 min-h-screen pt-safe pb-safe pl-safe pr-safe">
      {/* Entity Info */}
      {selectedEntity && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Currently viewing dashboard for: <span className="font-medium" style={{ color: selectedEntity.color }}>{selectedEntity.displayName}</span></p>
        </div>
      )}
      
      {/* Status Bar Style Header */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <span className="font-medium">00:01:26</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-chart-1 rounded-sm"></div>
          <div className="w-4 h-2 bg-chart-1 rounded-sm"></div>
          <div className="w-4 h-2 bg-chart-1 rounded-sm"></div>
          <div className="w-6 h-3 bg-chart-1 rounded-sm"></div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 mb-8">
        {categories.map((category, index) => (
          <CategoryPill 
            key={index} 
            active={category.active}
            variant={category.variant}
          >
            {category.label}
          </CategoryPill>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Project Circles */}
        <div className="space-y-8">
          {projectData.map((project, index) => (
            <Card key={index} className="p-6" data-testid={`card-project-${index}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    {project.subtitle}
                    <span className="text-primary">→</span>
                  </p>
                </div>
                <div className="text-4xl font-bold text-muted-foreground">
                  {project.progress}
                </div>
              </div>
              
              <CircularProgress
                percentage={project.progress}
                size={160}
                strokeWidth={12}
                color={project.color}
                className="mx-auto"
              >
                <div className="text-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-12 h-12 rounded-full bg-muted/50 hover:bg-muted"
                  >
                    {project.isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>
                </div>
              </CircularProgress>
            </Card>
          ))}
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-6">
          {/* CREATIVE Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-muted-foreground tracking-wide">CREATIVE</h4>
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-chart-1 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-1/50 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-1/30 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Button 
                size="icon" 
                variant="ghost" 
                className="w-10 h-10 rounded-full bg-chart-1/20 hover:bg-chart-1/30" 
                data-testid="button-creative-view"
                onClick={() => navigate("/creative")}
              >
                <FolderOpen className="w-5 h-5 text-chart-1" />
              </Button>
              <span className="text-sm font-medium">View</span>
            </div>
            
            <div className="space-y-2">
              {controlItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-chart-1/20">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    </Button>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="w-1 h-12 bg-chart-1 rounded-full"></div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* TREASURY Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-muted-foreground tracking-wide">TREASURY</h4>
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-chart-2 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-2/50 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-2/30 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Button 
                size="icon" 
                variant="ghost" 
                className="w-10 h-10 rounded-full bg-chart-2/20 hover:bg-chart-2/30" 
                data-testid="button-treasury-view"
                onClick={() => navigate("/treasury")}
              >
                <DollarSign className="w-5 h-5 text-chart-2" />
              </Button>
              <span className="text-sm font-medium">View</span>
            </div>
            
            <div className="space-y-2">
              {treasuryItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-chart-2/20">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    </Button>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="w-1 h-12 bg-chart-2 rounded-full"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation - iOS Style */}
      <div className="flex items-center justify-center gap-12 py-6 border-t border-border/50 backdrop-blur-md">
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex flex-col gap-1.5 h-auto py-2 rounded-full transition-all duration-200" 
          data-testid="button-nav-home"
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-6 h-6 rounded-full bg-primary/20 shadow-sm"></div>
          <span className="text-xs font-medium text-muted-foreground">HOME</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex flex-col gap-1.5 h-auto py-2 rounded-full transition-all duration-200" 
          data-testid="button-nav-projects"
          onClick={() => navigate("/projects")}
        >
          <div className="w-6 h-6 rounded-full bg-foreground/20 shadow-sm"></div>
          <span className="text-xs font-medium text-muted-foreground">PROJECTS</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex flex-col gap-1.5 h-auto py-2 rounded-full transition-all duration-200" 
          data-testid="button-nav-members"
          onClick={() => navigate("/members")}
        >
          <div className="w-6 h-6 rounded-full bg-foreground/20 shadow-sm"></div>
          <span className="text-xs font-medium text-muted-foreground">MEMBERS</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex flex-col gap-1.5 h-auto py-2 rounded-full transition-all duration-200" 
          data-testid="button-nav-help"
          onClick={() => navigate("/help")}
        >
          <div className="w-6 h-6 rounded-full bg-foreground/20 shadow-sm"></div>
          <span className="text-xs font-medium text-muted-foreground">HELP</span>
        </Button>
      </div>
    </div>
  );
}