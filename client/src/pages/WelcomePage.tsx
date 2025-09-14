import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Palette, Shield, PaintBucket, Users, DollarSign } from "lucide-react";
// Import app icon
const appIcon = "/attached_assets/base_img/app-icon.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Creative Management",
      description: "Track your creative process from ideation to completion",
      icon: Palette,
    },
    {
      title: "IP Protection",
      description: "Secure and manage your intellectual property rights",
      icon: Shield,
    },
    {
      title: "Revenue Tracking",
      description: "Monitor your earnings and financial performance",
      icon: PaintBucket,
    },
    {
      title: "Community Building",
      description: "Engage with your audience and grow your community",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background pt-safe pb-safe pl-safe pr-safe" data-testid="welcome-page">
      <div className="flex flex-col items-center justify-center px-4 py-12 text-center md:px-6 md:py-24">
        <img 
          src={appIcon} 
          alt="The Grid Atelier Logo" 
          className="h-24 w-24 mb-6"
          data-testid="welcome-logo"
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to The Grid Atelier
        </h1>
        <p className="mt-4 max-w-[42rem] text-xl text-muted-foreground">
          A unified platform giving creators the operational power of a collective.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button 
            size="lg" 
            onClick={() => navigate("/login")} 
            data-testid="login-button"
          >
            Log In
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/signup")} 
            data-testid="signup-button"
          >
            Sign Up
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader className="pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to take control of your creative business?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of creators who have transformed their creative practice with The Grid Atelier.
          </p>
          <Button 
            size="lg" 
            className="mt-6" 
            onClick={() => navigate("/login")}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}