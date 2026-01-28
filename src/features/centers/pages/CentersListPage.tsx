"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { CenterListSkeleton } from "@/components/skeletons"
import { routes, type Language } from "@/lib"
import { useTranslations } from "@/hooks/useTranslations"
import { getCentersRepository } from "@/repositories/factory"
import type { Center } from "@/types/models"

interface CentersListPageProps {
  lang: Language
}

export function CentersListPage({ lang }: CentersListPageProps) {
  const { t } = useTranslations('centers')
  const { t: tc } = useTranslations('common')
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCenters = async () => {
      try {
        const repository = getCentersRepository()
        const data = await repository.findAll()
        setCenters(data)
      } catch (error) {
        console.error('Failed to load centers:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCenters()
  }, [])

  if (loading) {
    return <CenterListSkeleton />
  }

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: t('title') }]} />
      </div>

      <PageHeader
        title={t('title')}
        description={t('description')}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {centers.map((center) => (
          <Card key={center.id} className="group card-elevated overflow-hidden">
            <div className="relative h-48">
              <Image
                src={center.image}
                alt={center.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-serif">{center.title}</CardTitle>
              <CardDescription>{center.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 h-auto group/btn" asChild>
                <Link href={routes.centers.detail(lang, center.slug)}>
                  {tc('actions.learnMore')}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
