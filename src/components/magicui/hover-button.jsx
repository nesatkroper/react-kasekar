import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const HoverButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative w-auto cursor-pointer overflow-hidden rounded-lg border bg-background p-2 px-6 text-center text-sm font-semibold",
          className
        )}
        {...props}>
        <div className='flex justify-center items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-primary transition-all duration-500 group-hover:scale-[100.8]'></div>
          <span className='inline-block transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0'>
            {children}
          </span>
        </div>
        <div className='absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-500 group-hover:-translate-x-5 group-hover:opacity-100'>
          <span>{children}</span>
          <ArrowRight />
        </div>
      </button>
    );
  }
);

HoverButton.displayName = "HoverButton";
