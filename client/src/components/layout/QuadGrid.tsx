import { cn } from "@/lib/utils"

interface QuadGridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'grid' | 'grid-2' | 'grid-3' | 'grid-4'
  rows?: 'auto' | number
}

export function QuadGrid({ 
  children, 
  className, 
  cols = 12, 
  gap = 'grid-2',
  rows = 'auto'
}: QuadGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', 
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  }
  
  const gapClass = {
    grid: 'gap-grid',
    'grid-2': 'gap-grid-2',
    'grid-3': 'gap-grid-3',
    'grid-4': 'gap-grid-4'
  }
  
  const rowClass: Record<'auto' | number, string> = {
    auto: 'auto-rows-min',
    1: 'grid-rows-1',
    2: 'grid-rows-2',
    3: 'grid-rows-3',
    4: 'grid-rows-4'
  }
  
  return (
    <div className={cn(
      "grid",
      gridCols[cols],
      rows === 'auto' ? rowClass.auto : rowClass[rows],
      gapClass[gap],
      "w-full",
      className
    )}>
      {children}
    </div>
  )
}

// Pre-configured grid layouts for common use cases
interface DashboardGridProps {
  children: React.ReactNode
  className?: string
}

export function DashboardGrid({ children, className }: DashboardGridProps) {
  return (
    <QuadGrid 
      cols={12} 
      gap="grid-2" 
      className={cn("min-h-full", className)}
    >
      {children}
    </QuadGrid>
  )
}

interface CardGridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
}

export function CardGrid({ children, className, cols = 3 }: CardGridProps) {
  return (
    <QuadGrid 
      cols={cols} 
      gap="grid-2" 
      className={cn("auto-rows-min", className)}
    >
      {children}
    </QuadGrid>
  )
}