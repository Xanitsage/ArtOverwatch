import { cn } from "@/lib/utils"

interface QuadCardVariant {
  children: React.ReactNode
  className?: string
  span?: 1 | 2 | 3 | 4 | 6 | 12
  rowSpan?: 1 | 2 | 3 | 4
}

export function QuadCard1x1({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-1 row-span-1",
      "border bg-card border-card-border text-card-foreground",
      "p-grid-2", // 16px padding
      "min-h-grid-6", // Minimum 48px height  
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  )
}

export function QuadCard2x1({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-2 row-span-1",
      "border bg-card border-card-border text-card-foreground", 
      "p-grid-2",
      "min-h-grid-6",
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  )
}

export function QuadCard2x2({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-2 row-span-2",
      "border bg-card border-card-border text-card-foreground",
      "p-grid-2", 
      "min-h-grid-12", // Minimum 96px height
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  )
}

export function QuadCard3x1({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-3 row-span-1",
      "border bg-card border-card-border text-card-foreground",
      "p-grid-2",
      "min-h-grid-6", 
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  )
}

export function QuadCard4x1({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-4 row-span-1",
      "border bg-card border-card-border text-card-foreground",
      "p-grid-2",
      "min-h-grid-6",
      "transition-all duration-200", 
      className
    )}>
      {children}
    </div>
  )
}

export function QuadCard6x1({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-6 row-span-1",
      "border bg-card border-card-border text-card-foreground",
      "p-grid-2",
      "min-h-grid-6",
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  )
}

export function QuadCard12x1({ children, className }: QuadCardVariant) {
  return (
    <div className={cn(
      "col-span-12 row-span-1",
      "border bg-card border-card-border text-card-foreground",
      "p-grid-2",
      "min-h-grid-6",
      "transition-all duration-200",
      className
    )}>
      {children}
    </div>
  )
}