import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("py-12 md:py-16", className)}>
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground mb-6">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}
