import Link from "next/link"
import { ArrowRight, Target, Eye, History, Users, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout"
import { PageHeader } from "@/components/shared"
import { routes, aboutSectionRoute, type Language } from "@/lib"
import type { AboutPageConfig } from "@/services/about.service"

const iconMap = {
  target: Target,
  eye: Eye,
  history: History,
  users: Users,
  handshake: Handshake,
} as const

interface AboutOverviewPageProps {
  lang: Language
  pageConfig: AboutPageConfig
}

export function AboutOverviewPage({ lang, pageConfig }: AboutOverviewPageProps) {
  const cards = pageConfig.overviewCards

  return (
    <Container>
      <PageHeader
        title={pageConfig.title}
        description={pageConfig.description}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {cards.map((card) => {
          const IconComponent = iconMap[card.icon as keyof typeof iconMap] ?? Target
          const href = aboutSectionRoute(lang, card.sectionSlug)
          return (
            <Card key={`${card.title}-${card.sectionSlug}`} className="card-elevated">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{card.description}</CardDescription>
                <Button variant="link" className="p-0 h-auto group/btn" asChild>
                  <Link href={href}>
                    {pageConfig.learnMore}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Container>
  )
}
