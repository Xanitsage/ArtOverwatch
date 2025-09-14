import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import app icon
const appIcon = "/attached_assets/base_img/app-icon.png";

export default function LaunchScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // After 2 seconds, start fade out animation
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // After 2.5 seconds (2000ms + 500ms for animation), navigate to welcome page
    const navigateTimer = setTimeout(() => {
      navigate("/welcome");
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div 
      className={`flex h-screen w-full items-center justify-center bg-gradient-to-b from-background to-background/90 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'} pt-safe pb-safe pl-safe pr-safe`}
      data-testid="launch-screen"
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse blur-xl"></div>
          <div className="absolute -inset-8 rounded-full bg-primary/5 animate-pulse delay-300 blur-2xl"></div>
          <img 
            src={appIcon} 
            alt="The Grid Atelier Logo" 
            className="h-40 w-40 relative z-10 animate-bounce-slow"
            data-testid="launch-logo"
          />
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            The Grid Atelier
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in delay-300">
            Precision. Creativity. Collective.
          </p>
        </div>
      </div>
    </div>
  );
}