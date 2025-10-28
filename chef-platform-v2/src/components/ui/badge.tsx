"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const styles = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-muted text-muted-foreground",
      outline: "border border-input",
    } as const;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          styles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
