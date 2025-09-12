import { BarChart3, DollarSign, FolderOpen, Shield, TrendingUp, Users, Play, Pause } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "./CircularProgress";
import CategoryPill from "./CategoryPill";
import sampleArt from "@assets/generated_images/Sample_artwork_thumbnail_ebf97e2a.png";

export default function DashboardOverview() {
  const categories = [
    { label: "Creative", active: true },
    { label: "Business", active: false },
    { label: "180 BPM", active: false, variant: "accent" as const },
  ];

  const projectData = [
    {
      name: "Shuddam Ga",
      subtitle: "Yaman",
      progress: 84,
      color: "hsl(var(--chart-1))",
      isPlaying: false
    },
    {
      name: "16 Beats",
      subtitle: "Teentaal",
      progress: 6,
      color: "hsl(var(--chart-2))",
      isPlaying: true
    }
  ];

  const controlItems = [
    { label: "Tanpura", color: "hsl(var(--chart-1))" },
    { label: "Surpeti", color: "hsl(var(--chart-1))" },
    { label: "Swarmandal", color: "hsl(var(--chart-1))" },
    { label: "Fills", color: "hsl(var(--chart-1))" },
  ];

  const rhythmItems = [
    { label: "Tabla", color: "hsl(var(--chart-2))" },
    { label: "Manjira", color: "hsl(var(--chart-2))" },
    { label: "Ghungroo", color: "hsl(var(--chart-2))" },
    { label: "Fills", color: "hsl(var(--chart-2))" },
  ];

  return (
    <div className="space-y-6 p-6 min-h-screen">
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
          {/* MELODY Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-muted-foreground tracking-wide">MELODY</h4>
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-chart-1 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-1/50 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-1/30 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-chart-1/20 hover:bg-chart-1/30" data-testid="button-melody-play">
                <Pause className="w-5 h-5 text-chart-1" />
              </Button>
              <span className="text-sm font-medium">Play</span>
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
          
          {/* RHYTHM Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-muted-foreground tracking-wide">RHYTHM</h4>
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-chart-2 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-2/50 rounded-full"></div>
                <div className="w-1 h-6 bg-chart-2/30 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-chart-2/20 hover:bg-chart-2/30" data-testid="button-rhythm-play">
                <Pause className="w-5 h-5 text-chart-2" />
              </Button>
              <span className="text-sm font-medium">Play</span>
            </div>
            
            <div className="space-y-2">
              {rhythmItems.map((item, index) => (
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

      {/* Bottom Navigation */}
      <div className="flex items-center justify-center gap-12 py-6 border-t border-border/50">
        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2" data-testid="button-nav-home">
          <div className="w-6 h-6 rounded bg-foreground/20"></div>
          <span className="text-xs text-muted-foreground">HOME</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2" data-testid="button-nav-mixes">
          <div className="w-6 h-6 rounded bg-foreground/20"></div>
          <span className="text-xs text-muted-foreground">MIXES</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2" data-testid="button-nav-keys">
          <div className="w-6 h-6 rounded bg-foreground/20"></div>
          <span className="text-xs text-muted-foreground">KEYS</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2" data-testid="button-nav-help">
          <div className="w-6 h-6 rounded bg-foreground/20"></div>
          <span className="text-xs text-muted-foreground">HELP</span>
        </Button>
      </div>
    </div>
  );
}