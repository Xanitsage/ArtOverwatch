import * as React from "react"

import { cn } from "@/lib/utils"

const QuadCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "quad-card border bg-card border-card-border text-card-foreground transition-all duration-200",
      className
    )}
    {...props}
  />
));
QuadCard.displayName = "QuadCard"

const QuadCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
));
QuadCardHeader.displayName = "QuadCardHeader"

const QuadCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-18 font-medium leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
QuadCardTitle.displayName = "QuadCardTitle"

const QuadCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-14 text-muted-foreground", className)}
    {...props}
  />
));
QuadCardDescription.displayName = "QuadCardDescription"

const QuadCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
QuadCardContent.displayName = "QuadCardContent"

const QuadCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
QuadCardFooter.displayName = "QuadCardFooter"

export {
  QuadCard,
  QuadCardHeader,
  QuadCardFooter,
  QuadCardTitle,
  QuadCardDescription,
  QuadCardContent,
}