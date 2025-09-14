import { useEntity } from "@/contexts/EntityContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Palette, Cpu, Briefcase, Banknote, Users, Calendar, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function EntityOverview() {
  const { selectedEntity } = useEntity();

  if (!selectedEntity) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No entity selected</p>
      </div>
    );
  }

  const getEntityIcon = (name: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'RENE': Palette,
      'YUKI': Cpu, 
      'JAMES': Briefcase,
      'TREASURY': Banknote
    };
    return iconMap[name.toUpperCase()] || Building2;
  };

  const getEntityDescription = (name: string) => {
    const descMap: { [key: string]: string } = {
      'RENE': 'Visual Arts & Creative Division',
      'YUKI': 'Digital Media & Technology',
      'JAMES': 'Business Development & Strategy',
      'TREASURY': 'Financial Management & Operations'
    };
    return descMap[name.toUpperCase()] || 'Creative Entity';
  };

  const IconComponent = getEntityIcon(selectedEntity.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight" data-testid="entity-overview-title">
          Entity Overview
        </h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex items-center gap-4" style={{ backgroundColor: `${selectedEntity.color}10` }}>
            <div className="p-3 rounded-lg" style={{ backgroundColor: `${selectedEntity.color}20` }}>
              <div style={{ color: selectedEntity.color }}><IconComponent className="w-6 h-6" /></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{selectedEntity.displayName}</CardTitle>
                <Badge variant="outline" style={{ backgroundColor: `${selectedEntity.color}20`, borderColor: selectedEntity.color, color: selectedEntity.color }}>
                  Active
                </Badge>
              </div>
              <CardDescription className="text-base">
                {getEntityDescription(selectedEntity.name)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Stakeholders</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Active contributors</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Founded</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2023</div>
                    <p className="text-xs text-muted-foreground">Establishment year</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Active projects</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>About {selectedEntity.displayName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {selectedEntity.description || 
                      `${selectedEntity.displayName} is a creative entity focused on ${getEntityDescription(selectedEntity.name).toLowerCase()}. 
                      The entity was established to drive innovation and excellence in its domain while maintaining 
                      strong collaborative relationships with other entities in The Grid Atelier collective.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Entity Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Entity ID</h4>
                      <p>{selectedEntity.id}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Entity Type</h4>
                      <p>{selectedEntity.type || "Creative Division"}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                      <p>Active</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Brand Color</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedEntity.color }}></div>
                        <p>{selectedEntity.color}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stakeholders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Stakeholders</CardTitle>
                  <CardDescription>People involved with this entity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Stakeholder information will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}