import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, centers, type Language } from "@/lib"

interface CentersListPageProps {
  lang: Language
}

export function CentersListPage({ lang }: CentersListPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: "Centri" }]} />
      </div>

      <PageHeader
        title="Centri"
        description="Pet specijalizovanih centara koji rade na očuvanju i istraživanju genetičkih resursa i biodiverziteta."
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
                  Saznaj više
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
