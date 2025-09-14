import { SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface GridShellProps {
  children: React.ReactNode
  className?: string
  sidebar?: React.ReactNode
}

export function GridShell({ children, className, sidebar }: GridShellProps) {
  return (
    <SidebarProvider>
      <div className={cn(
        "min-h-screen flex w-full",
        "bg-background text-foreground",
        "grid-shell", // Custom class for grid system
        className
      )}>
        {sidebar}
        <main className={cn(
          "flex-1 overflow-auto",
          "p-grid-2", // 16px padding using 8px grid system
          "grid-main"
        )}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}