import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, getCenterBySlug, getRelatedCenters, type Language } from "@/lib"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CenterDetailPageProps {
  lang: Language
  slug: string
}

export function CenterDetailPage({ lang, slug }: CenterDetailPageProps) {
  const center = getCenterBySlug(slug)
  if (!center) {
    return null
  }

  const relatedCenters = getRelatedCenters(center)

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: "Centri", href: routes.centers.list(lang) },
            { label: center.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.centers.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nazad na centri
        </Link>
      </Button>

      <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
        <Image src={center.image} alt={center.title} fill className="object-cover" />
      </div>

      <PageHeader title={center.title} description={center.excerpt} />

      <div className="grid lg:grid-cols-3 gap-12 py-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none mb-8">
            <p>{center.description}</p>
          </div>

          {center.director && (
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <h3 className="font-serif text-xl font-semibold mb-4">Informacije</h3>
              <div className="space-y-3">
                {center.director && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Direktor</p>
                      <p className="font-medium">{center.director}</p>
                    </div>
                  </div>
                )}
                {center.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lokacija</p>
                      <p className="font-medium">{center.location}</p>
                    </div>
                  </div>
                )}
                {center.established && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Osnovan</p>
                      <p className="font-medium">{center.established}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Kategorija</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge>{center.category}</Badge>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {relatedCenters.length > 0 && (
        <div className="py-12 border-t">
          <h2 className="font-serif text-3xl font-bold mb-8">Povezani centri</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedCenters.map((related) => (
              <Card key={related.id} className="card-elevated">
                <div className="relative h-48">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif">{related.title}</CardTitle>
                  <CardDescription>{related.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href={routes.centers.detail(lang, related.slug)}>
                      Saznaj više
                    </Link>
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
