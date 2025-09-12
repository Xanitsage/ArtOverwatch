import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "liquid-glass">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "liquid-glass" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.remove("dark", "liquid-glass");
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (initialTheme === "liquid-glass") {
      document.documentElement.classList.add("liquid-glass");
    }
  }, []);

  const toggleTheme = () => {
    let newTheme: "light" | "dark" | "liquid-glass";
    if (theme === "light") {
      newTheme = "dark";
    } else if (theme === "dark") {
      newTheme = "liquid-glass";
    } else {
      newTheme = "light";
    }
    
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    document.documentElement.classList.remove("dark", "liquid-glass");
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "liquid-glass") {
      document.documentElement.classList.add("liquid-glass");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="hover-elevate"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : theme === "dark" ? (
        <Sparkles className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}