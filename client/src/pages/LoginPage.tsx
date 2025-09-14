import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
// Import app icon
const appIcon = "/attached_assets/base_img/app-icon.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty email/password
      if (email && password) {
        // Navigate to main app
        navigate("/dashboard");
      } else {
        setError("Please enter both email and password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setError("");
    setSocialLoading(true);
    
    try {
      // Simulate Apple authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed with Apple login
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred during Apple login");
      console.error(err);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-background to-background/90 px-4 pt-safe pb-safe pl-safe pr-safe" data-testid="login-page">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute left-4 top-4 rounded-full hover:bg-background/80" 
            onClick={() => navigate("/welcome")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-full bg-primary/10 blur-sm"></div>
            <img 
              src={appIcon} 
              alt="Art Overwatch Logo" 
              className="h-20 w-20 relative z-10"
              data-testid="login-logo"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sign in</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Enter your credentials to access your Art Overwatch account
          </p>
        </div>

        <Card className="border-border/30 shadow-lg">
          <form onSubmit={handleLogin}>
            <CardContent className="pt-6 space-y-6">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 flex items-center space-x-2" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="grid gap-2.5">
                <Label htmlFor="email" className="text-sm font-medium text-foreground/90 pl-0.5">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-md border-border/50 px-4 bg-background/80 focus:bg-background focus-visible:ring-primary/30 focus-visible:ring-offset-0 shadow-sm"
                  data-testid="email-input"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2.5 mt-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground/90 pl-0.5">Password</Label>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs text-primary/80 hover:text-primary font-medium transition-colors" 
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-md border-border/50 px-4 bg-background/80 focus:bg-background focus-visible:ring-primary/30 focus-visible:ring-offset-0 shadow-sm"
                  data-testid="password-input"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center space-x-3 pt-2">
                <Checkbox 
                  id="remember" 
                  className="rounded-md border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground" 
                />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-5 pt-2 pb-6">
              <Button 
                type="submit" 
                className="w-full h-12 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all" 
                disabled={isLoading}
                data-testid="submit-button"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center text-sm mt-6">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary font-medium hover:text-primary/80" 
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
        
        <div className="mt-8 max-w-sm w-full mx-auto">
          <div className="flex items-center w-full py-1">
            <Separator className="flex-grow bg-border/40" />
            <span className="px-3 text-xs font-medium text-muted-foreground">OR</span>
            <Separator className="flex-grow bg-border/40" />
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12 rounded-lg flex items-center justify-center border-border/50 bg-background/50 hover:bg-background/80 shadow-sm transition-all mt-4" 
            onClick={handleAppleLogin}
            disabled={socialLoading}
            data-testid="apple-login-button"
          >
            <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span className="text-base">{socialLoading ? "Signing in..." : "Sign in with Apple"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}