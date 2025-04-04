import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = {
  variant: {
    default:
      "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80 cursor-pointer",
    outline:
      "border border-foreground/10 hover:bg-foreground/5 active:bg-foreground/10 cursor-pointer",
    ghost:
      "text-foreground/80 hover:bg-transparent [&>span]:hover:text-foreground cursor-pointer",
    link: "text-foreground underline-offset-4 hover:underline cursor-pointer",
  },
  size: {
    default: "h-12 px-6",
    sm: "h-9 px-4",
    lg: "h-14 px-8",
    icon: "h-10 w-10",
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
