"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { NewsDetailSkeleton } from "@/components/skeletons"
import { routes, type Language } from "@/lib"
import { formatDate } from "@/lib/format"
import { useTranslations } from "@/hooks/useTranslations"
import { getNewsRepository } from "@/repositories/factory"
import type { News } from "@/types/models"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"

interface NewsDetailPageProps {
  lang: Language
  slug: string
}

export function NewsDetailPage({ lang, slug }: NewsDetailPageProps) {
  const { t } = useTranslations('news')
  const { t: tc } = useTranslations('common')
  const [item, setItem] = useState<News | null>(null)
  const [relatedNews, setRelatedNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const repository = getNewsRepository()
        const newsItem = await repository.findBySlug(slug)
        
        if (!newsItem) {
          notFound()
          return
        }
        
        setItem(newsItem)
        
        const related = await repository.findRelated(newsItem)
        setRelatedNews(related)
      } catch (error) {
        console.error('Failed to load news:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  if (loading) {
    return <NewsDetailSkeleton />
  }

  if (!item) {
    return null
  }

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: t('title'), href: routes.news.list(lang) },
            { label: item.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.news.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {tc('actions.back')}
        </Link>
      </Button>

      <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>

      <PageHeader title={item.title} description={item.excerpt} />

      <div className="grid lg:grid-cols-3 gap-12 py-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <Badge className="capitalize">{item.category}</Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.date)}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p>{item.body}</p>
          </div>

          {item.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">{t('detail.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Informacije</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Kategorija</p>
                  <Badge className="capitalize">{item.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t('detail.publishedOn')}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {relatedNews.length > 0 && (
        <div className="py-12 border-t">
          <h2 className="font-serif text-3xl font-bold mb-8">{t('detail.relatedNews')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedNews.map((related) => (
              <Card key={related.id} className="card-elevated">
                <div className="relative h-48">
                  <Image src={related.image} alt={related.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif">{related.title}</CardTitle>
                  <CardDescription>{related.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href={routes.news.detail(lang, related.slug)}>{tc('actions.readMore')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}
