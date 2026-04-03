import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border-2 border-border bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-neo",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "bg-background text-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground shadow-none border-transparent dark:shadow-none",
        destructive: "bg-destructive text-destructive-foreground",
        link: "text-primary underline-offset-4 hover:underline shadow-none border-transparent dark:shadow-none active:translate-x-0 active:translate-y-0 active:shadow-none hover:-translate-y-0",
      },
      size: {
        default: "h-12 px-6 py-2 text-base",
        sm: "h-9 px-3 text-sm",
        lg: "h-14 px-8 text-lg font-black",
        xs: "h-8 px-2 text-xs",
        icon: "h-12 w-12",
        "icon-xs": "size-8",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
