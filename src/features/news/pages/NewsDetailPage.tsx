import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, getNewsBySlug, getRelatedNews, type Language } from "@/lib"
import { formatDate } from "@/lib/format"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsDetailPageProps {
  lang: Language
  slug: string
}

export function NewsDetailPage({ lang, slug }: NewsDetailPageProps) {
  const item = getNewsBySlug(slug)
  if (!item) {
    return null
  }

  const relatedNews = getRelatedNews(item)

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: "Novosti", href: routes.news.list(lang) },
            { label: item.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.news.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nazad na novosti
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
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
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
                  <p className="text-sm text-muted-foreground mb-2">Datum</p>
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
          <h2 className="font-serif text-3xl font-bold mb-8">Povezane novosti</h2>
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
                    <Link href={routes.news.detail(lang, related.slug)}>Pročitaj više</Link>
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
