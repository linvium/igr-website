"use client"

import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import Link from "next/link"
import { useSiteSettings } from "@/contexts/SiteSettingsContext"
import { routes, defaultLanguage } from "@/lib"

export default function NotFound() {
  const siteSettings = useSiteSettings()
  const em = siteSettings.errorMessages

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <FileQuestion className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-6xl font-serif font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">{em.notFoundTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            {em.notFoundDescription}
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href={routes.home(defaultLanguage)}>{em.notFoundHomeButton}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={routes.about.overview(defaultLanguage)}>O Institutu</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
