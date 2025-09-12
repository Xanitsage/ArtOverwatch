import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, Image, Palette, Plus, Type, Upload } from "lucide-react";
import { useState } from "react";
import appIcon from "@assets/generated_images/ArtOverwatch_app_icon_1f115011.png";

export default function BrandingStudio() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");

  //todo: remove mock functionality - this data should come from the backend
  const mockBrandColors = [
    { name: "Primary Blue", hex: "#3B82F6", usage: "Main brand color" },
    { name: "Secondary Purple", hex: "#8B5CF6", usage: "Accent color" },
    { name: "Success Green", hex: "#10B981", usage: "Success states" },
    { name: "Warning Orange", hex: "#F59E0B", usage: "Attention" },
    { name: "Dark Gray", hex: "#374151", usage: "Text primary" },
    { name: "Light Gray", hex: "#9CA3AF", usage: "Text secondary" },
  ];

  const mockFonts = [
    { name: "SF Pro Display", category: "Primary", usage: "Headers and titles", weight: "600" },
    { name: "Inter", category: "Body", usage: "Body text and UI", weight: "400" },
    { name: "JetBrains Mono", category: "Monospace", usage: "Code and data", weight: "400" },
  ];

  const mockLogos = [
    { name: "Primary Logo", type: "SVG", size: "2.4 KB", usage: "Main brand mark" },
    { name: "Logo Mark", type: "PNG", size: "15 KB", usage: "Icon only" },
    { name: "Horizontal Logo", type: "SVG", size: "3.1 KB", usage: "Wide layouts" },
    { name: "Monochrome Logo", type: "SVG", size: "1.8 KB", usage: "Single color use" },
  ];

  const mockAssets = [
    { name: "Business Card Template", type: "AI", size: "8.2 MB", category: "Print" },
    { name: "Letterhead Design", type: "PSD", size: "12.5 MB", category: "Print" },
    { name: "Social Media Kit", type: "FIGMA", size: "24.1 MB", category: "Digital" },
    { name: "Website Graphics", type: "ZIP", size: "45.3 MB", category: "Digital" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Branding Studio</h1>
          <p className="text-muted-foreground">
            Create and manage your brand identity assets and guidelines
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" data-testid="button-upload-asset">
            <Upload className="mr-2 h-4 w-4" />
            Upload Asset
          </Button>
          <Button data-testid="button-create-brand-guide">
            <Plus className="mr-2 h-4 w-4" />
            Create Brand Guide
          </Button>
        </div>
      </div>

      {/* Brand Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Brand Overview
          </CardTitle>
          <CardDescription>
            Your complete brand identity at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Logo Section */}
            <div>
              <h3 className="font-semibold mb-4">Primary Logo</h3>
              <div className="bg-card border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <img 
                  src={appIcon} 
                  alt="Brand Logo" 
                  className="w-16 h-16 mx-auto mb-4"
                />
                <p className="text-sm text-muted-foreground">ArtOverwatch</p>
              </div>
            </div>

            {/* Colors Section */}
            <div>
              <h3 className="font-semibold mb-4">Brand Colors</h3>
              <div className="grid grid-cols-3 gap-2">
                {mockBrandColors.slice(0, 6).map((color, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-full h-12 rounded-lg border cursor-pointer hover-elevate"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.hex)}
                      data-testid={`color-${index}`}
                    ></div>
                    <p className="text-xs text-muted-foreground mt-1">{color.hex}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Section */}
            <div>
              <h3 className="font-semibold mb-4">Typography</h3>
              <div className="space-y-3">
                <div className="font-bold text-xl">SF Pro Display</div>
                <div className="text-base">Inter Regular</div>
                <div className="font-mono text-sm">JetBrains Mono</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Brand Management */}
      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="colors" data-testid="tab-colors">Colors</TabsTrigger>
          <TabsTrigger value="typography" data-testid="tab-typography">Typography</TabsTrigger>
          <TabsTrigger value="logos" data-testid="tab-logos">Logos</TabsTrigger>
          <TabsTrigger value="assets" data-testid="tab-assets">Assets</TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                Manage your brand colors and their usage guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-4">Brand Colors</h4>
                  <div className="space-y-4">
                    {mockBrandColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover-elevate" data-testid={`card-color-${index}`}>
                        <div 
                          className="w-12 h-12 rounded-lg border"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="flex-1">
                          <div className="font-medium">{color.name}</div>
                          <div className="text-sm text-muted-foreground">{color.usage}</div>
                          <div className="text-xs font-mono text-muted-foreground">{color.hex}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Color Tools</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="color-picker">Add New Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          id="color-picker"
                          type="color" 
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-16 h-10"
                          data-testid="input-color-picker"
                        />
                        <Input 
                          placeholder="Color name"
                          className="flex-1"
                          data-testid="input-color-name"
                        />
                        <Button variant="outline" data-testid="button-add-color">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Usage Guidelines</Label>
                      <div className="mt-2 p-4 bg-muted rounded-lg text-sm">
                        <ul className="space-y-1">
                          <li>• Use primary blue for main CTAs and headers</li>
                          <li>• Secondary purple for highlights and accents</li>
                          <li>• Maintain 4.5:1 contrast ratio for accessibility</li>
                          <li>• Limit to 3-4 colors per design</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography System</CardTitle>
              <CardDescription>
                Manage fonts and text styles for consistent brand communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockFonts.map((font, index) => (
                  <div key={index} className="border rounded-lg p-6 hover-elevate" data-testid={`card-font-${index}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{font.name}</h4>
                        <p className="text-sm text-muted-foreground">{font.usage}</p>
                      </div>
                      <Badge variant="outline">{font.category}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div style={{ fontFamily: font.name.includes('SF Pro') ? '-apple-system' : font.name.includes('Mono') ? 'monospace' : 'Inter' }}>
                        <div className="text-2xl font-bold">The quick brown fox</div>
                        <div className="text-lg">jumps over the lazy dog</div>
                        <div className="text-base">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                        <div className="text-sm">abcdefghijklmnopqrstuvwxyz 1234567890</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logos Tab */}
        <TabsContent value="logos">
          <Card>
            <CardHeader>
              <CardTitle>Logo Library</CardTitle>
              <CardDescription>
                Manage logo variations and brand marks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {mockLogos.map((logo, index) => (
                  <div key={index} className="border rounded-lg p-6 hover-elevate" data-testid={`card-logo-${index}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{logo.name}</h4>
                        <p className="text-sm text-muted-foreground">{logo.usage}</p>
                      </div>
                      <Badge variant="outline">{logo.type}</Badge>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-8 text-center mb-4">
                      <img 
                        src={appIcon} 
                        alt={logo.name}
                        className="w-16 h-16 mx-auto"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{logo.size}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
              <CardDescription>
                Design templates and marketing materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockAssets.map((asset, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover-elevate" data-testid={`card-asset-${index}`}>
                    <div className="p-3 bg-muted rounded-lg">
                      <Image className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{asset.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {asset.type} • {asset.size} • {asset.category}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}