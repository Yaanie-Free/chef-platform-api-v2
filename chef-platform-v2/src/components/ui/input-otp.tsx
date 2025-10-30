"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputOTPProps {
  value: string;
  onValueChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  placeholder?: string;
}

export function InputOTP({ value, onValueChange, maxLength = 6, className, placeholder }: InputOTPProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = e.target.value.replace(/[^0-9]/g, "").slice(0, maxLength);
    onValueChange(numeric);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value && inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(
          "w-full h-11 rounded-2xl bg-muted/30 border border-input px-4 text-base outline-none",
          "placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        )}
      />
    </div>
  );
}

export function InputOTPGroup({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>;
}

export function InputOTPSlot({ index, value }: { index: number; value?: string }) {
  const char = value && value[index] ? value[index] : "";
  return (
    <div className="w-10 h-12 rounded-xl border border-input bg-muted/30 flex items-center justify-center text-lg">
      {char}
    </div>
  );
}

export function InputOTPSeparator() {
  return <div className="w-3" />;
}
