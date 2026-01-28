"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { routes, type Language } from "@/lib"
import { useTranslations } from "@/hooks/useTranslations"
import { getCentersRepository } from "@/repositories/factory"
import type { Center } from "@/types/models"

interface CentersSectionProps {
  lang: Language
}

export function CentersSection({ lang }: CentersSectionProps) {
  const { t } = useTranslations('home')
  const { t: tc } = useTranslations('common')
  const [centers, setCenters] = useState<Center[]>([])

  useEffect(() => {
    const loadCenters = async () => {
      try {
        const repository = getCentersRepository()
        const data = await repository.findAll()
        setCenters(data.slice(0, 5))
      } catch (error) {
        console.error('Failed to load centers:', error)
      }
    }
    loadCenters()
  }, [])

  return (
    <section id="centers" className="py-24 bg-secondary/30 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('sections.centers')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Centri i djelatnosti
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            Kroz pet specijalizovanih centara, radimo na očuvanju i istraživanju genetičkih resursa
            i biodiverziteta.
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {centers.map((center) => (
            <div
              key={center.id}
              className="group bg-card rounded-2xl overflow-hidden card-elevated border border-border/50 flex flex-col h-full"
            >
              <div className="relative overflow-hidden flex-shrink-0 h-48">
                <Image
                  src={center.image}
                  alt={center.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-serif font-bold text-primary-foreground line-clamp-2">
                    {center.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                  {center.excerpt}
                </p>
                <Button variant="link" className="p-0 h-auto group/btn self-start" asChild>
                  <Link href={routes.centers.detail(lang, center.slug)}>
                    {tc('actions.learnMore')}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href={routes.centers.list(lang)}>{tc('actions.viewAll')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
