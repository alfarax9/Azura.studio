import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full whitespace-nowrap font-medium transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-ink text-cream hover:bg-azure",
        invert: "bg-cream text-ink hover:bg-azure hover:text-cream",
        accent: "bg-azure text-cream hover:bg-ink",
        outline:
          "border border-hairline bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream",
        outlineInvert:
          "border border-hairline-invert bg-transparent text-cream hover:border-cream hover:bg-cream hover:text-ink",
        ghost: "bg-transparent text-current hover:opacity-60",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-cursor="hover"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
