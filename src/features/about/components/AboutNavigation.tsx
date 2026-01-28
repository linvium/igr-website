"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { routes, type Language } from "@/lib"

interface AboutNavigationProps {
  lang: Language
}

const navItems = [
  { label: "Pregled", href: (lang: Language) => routes.about.overview(lang) },
  { label: "Misija i Vizija", href: (lang: Language) => routes.about.mission(lang) },
  { label: "Istorijat", href: (lang: Language) => routes.about.history(lang) },
  { label: "Tim", href: (lang: Language) => routes.about.team(lang) },
  { label: "Partneri", href: (lang: Language) => routes.about.partners(lang) },
]

export function AboutNavigation({ lang }: AboutNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const href = item.href(lang)
        const isActive = pathname === href
        return (
          <Link
            key={item.label}
            href={href}
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
