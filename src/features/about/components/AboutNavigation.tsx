"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { AboutNavItem } from "@/services/about.service"

interface AboutNavigationProps {
  heading: string
  items: AboutNavItem[]
}

export function AboutNavigation({ heading, items }: AboutNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      <h2 className="font-serif text-lg font-semibold mb-4">{heading}</h2>
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "block px-4 py-2 rounded-lg transition-colors",
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
