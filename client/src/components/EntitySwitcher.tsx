import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Building2, Loader2, Palette, Cpu, Briefcase, Banknote } from "lucide-react";
import { useEntity } from "@/contexts/EntityContext";

export function EntitySwitcher() {
  const { selectedEntity, setSelectedEntity, entities, isLoading } = useEntity();

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading entities...</span>
        </CardContent>
      </Card>
    );
  }

  if (!selectedEntity || entities.length === 0) {
    return (
      <Card className="mb-6 border-dashed">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No entities available</p>
          </div>
        </CardContent>
      </Card>
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

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedEntity.color}20` }}>
              {(() => {
                const IconComponent = getEntityIcon(selectedEntity.name);
                return <IconComponent className="w-5 h-5 text-primary" />;
              })()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold" data-testid="text-current-entity">
                  {selectedEntity.displayName}
                </h2>
                <Badge variant="outline" style={{ backgroundColor: `${selectedEntity.color}20`, borderColor: selectedEntity.color, color: selectedEntity.color }}>
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {getEntityDescription(selectedEntity.name)}
              </p>
            </div>
          </div>
          
          {entities.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" data-testid="button-switch-entity">
                  Switch Entity
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {entities.map((entity) => (
                  <DropdownMenuItem
                    key={entity.id}
                    onClick={() => setSelectedEntity(entity)}
                    className={`flex items-center gap-3 py-3 ${
                      selectedEntity.id === entity.id ? 'bg-muted' : ''
                    }`}
                    data-testid={`option-entity-${entity.name.toLowerCase()}`}
                  >
                    <div className="p-1.5 rounded" style={{ backgroundColor: `${entity.color}20` }}>
                      {(() => {
                        const IconComponent = getEntityIcon(entity.name);
                        return <IconComponent className="w-4 h-4" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{entity.displayName}</div>
                      <div className="text-xs text-muted-foreground">
                        {getEntityDescription(entity.name)}
                      </div>
                    </div>
                    {selectedEntity.id === entity.id && (
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: entity.color }}
                      />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
}