"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { routes, type Language } from "@/lib"
import { formatDateShort } from "@/lib/format"
import { useTranslations } from "@/hooks/useTranslations"
import { getNewsRepository } from "@/repositories/factory"
import type { News } from "@/types/models"

interface NewsSectionProps {
  lang: Language
}

export function NewsSection({ lang }: NewsSectionProps) {
  const { t } = useTranslations('home')
  const { t: tc } = useTranslations('common')
  const [allNews, setAllNews] = useState<News[]>([])
  const [featured, setFeatured] = useState<News | null>(null)
  const [regularNews, setRegularNews] = useState<News[]>([])

  useEffect(() => {
    const loadNews = async () => {
      try {
        const repository = getNewsRepository()
        const featuredList = await repository.findFeatured()
        const newsData = await repository.findAll()
        
        setAllNews(newsData)
        setFeatured(featuredList[0] || null)
        setRegularNews(newsData.filter(n => !n.featured).slice(0, 3))
      } catch (error) {
        console.error('Failed to load news:', error)
      }
    }
    loadNews()
  }, [])

  return (
    <section id="news" className="py-24 bg-secondary/30 relative">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('sections.news')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Najnovije vijesti
            </h2>
            <p className="text-lg text-muted-foreground">
              Pratite naše aktivnosti, događaje i postignuća u oblasti očuvanja genetičkih resursa.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start lg:self-auto" asChild>
            <Link href={routes.news.list(lang)}>
              {tc('actions.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allNews.slice(0, 4).map((item: News) => (
            <div
              key={item.id}
              className="group bg-card rounded-2xl overflow-hidden card-elevated border border-border/50 hover:border-primary/30 transition-all flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/90 text-foreground text-xs font-medium capitalize backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-1">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDateShort(item.date)}</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-xs group/btn" asChild>
                    <Link href={routes.news.detail(lang, item.slug)}>
                      {tc('actions.readMore')}
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
