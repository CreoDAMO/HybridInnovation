"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToasterProps {
  className?: string
}

const Toaster = React.forwardRef<
  HTMLDivElement,
  ToasterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
Toaster.displayName = "Toaster"

export { Toaster }