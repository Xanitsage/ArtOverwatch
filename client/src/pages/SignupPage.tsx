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

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid input
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignup = async () => {
    setError("");
    setSocialLoading(true);
    
    try {
      // Simulate Apple authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed with Apple signup
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred during Apple signup");
      console.error(err);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 pt-safe pb-safe pl-safe pr-safe" data-testid="signup-page">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute left-4 top-4" 
            onClick={() => navigate("/welcome")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <img 
            src={appIcon} 
            alt="The Grid Atelier Logo" 
            className="h-16 w-16 mb-4"
            data-testid="signup-logo"
          />
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Join The Grid Atelier to manage your creative collective
          </p>
        </div>

        <Card>
          <form onSubmit={handleSignup}>
            <CardContent className="pt-6 space-y-4">
              {error && (
                <div className="p-3 text-sm text-white bg-destructive rounded-md" role="alert">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="name-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="email-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="password-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  data-testid="confirm-password-input"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the <Button variant="ghost" className="p-0 h-auto">Terms of Service</Button> and <Button variant="ghost" className="p-0 h-auto">Privacy Policy</Button>
                </Label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                data-testid="submit-button"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              
              <div className="flex items-center w-full">
                <Separator className="flex-grow" />
                <span className="px-2 text-xs text-muted-foreground">OR</span>
                <Separator className="flex-grow" />
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center" 
                onClick={handleAppleSignup}
                disabled={socialLoading}
                data-testid="apple-signup-button"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                {socialLoading ? "Signing up..." : "Sign up with Apple"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button 
            variant="ghost" 
            className="p-0 h-auto" 
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}