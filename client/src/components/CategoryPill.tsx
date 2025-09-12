import { Button } from "@/components/ui/button";

interface CategoryPillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: "default" | "secondary" | "accent";
  className?: string;
}

export default function CategoryPill({
  children,
  active = false,
  onClick,
  variant = "default",
  className = ""
}: CategoryPillProps) {
  const getVariantStyles = () => {
    if (active) {
      switch (variant) {
        case "accent":
          return "bg-chart-2 text-white border-chart-2";
        case "secondary":
          return "bg-chart-5 text-white border-chart-5";
        default:
          return "bg-primary text-primary-foreground border-primary";
      }
    }
    
    return "bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground";
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`
        rounded-full px-4 py-2 text-sm font-medium
        border transition-all duration-200
        hover-elevate
        ${getVariantStyles()}
        ${className}
      `}
    >
      {children}
    </Button>
  );
}