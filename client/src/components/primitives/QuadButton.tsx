import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const quadButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-14 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
  " hover-elevate active-elevate-2 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          "border [border-color:var(--button-outline)] backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground border border-secondary-border",
        ghost: "",
      },
      size: {
        default: "min-h-10 px-4 py-2 text-14",
        sm: "min-h-8 px-2 py-2 text-14",
        lg: "min-h-12 px-6 py-4 text-16",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface QuadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof quadButtonVariants> {
  asChild?: boolean
}

const QuadButton = React.forwardRef<HTMLButtonElement, QuadButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(quadButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
QuadButton.displayName = "QuadButton"

export { QuadButton, quadButtonVariants }