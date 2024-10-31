"use client";

import * as React from "react";
import { OTPInput } from "input-otp";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

const OTPInputComponent = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2", className)}
    {...props}
  />
));
OTPInputComponent.displayName = "OTPInputComponent";

const OTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-10 w-10 rounded-md border border-input bg-background text-center text-sm shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring",
      className
    )}
    {...props}
  />
));
OTPSlot.displayName = "OTPSlot";

const OTPInput_Hidden = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "absolute h-full w-full opacity-0 focus:outline-none",
      className
    )}
    {...props}
  />
));
OTPInput_Hidden.displayName = "OTPInput_Hidden";

const OTPDisplay = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 flex items-center justify-center",
      className
    )}
    {...props}
  />
));
OTPDisplay.displayName = "OTPDisplay";

export {
  OTPInputComponent as OTPInput,
  OTPSlot,
  OTPInput_Hidden,
  OTPDisplay,
  Dot,
};
