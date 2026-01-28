import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: "default" | "wide" | "narrow"
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-7xl": size === "default",
          "max-w-[90rem]": size === "wide",
          "max-w-4xl": size === "narrow",
        },
        className
      )}
    >
      {children}
    </div>
  )
}
