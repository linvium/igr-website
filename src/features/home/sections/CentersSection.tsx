import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { routes, centers, type Language } from "@/lib"

interface CentersSectionProps {
  lang: Language
}

export function CentersSection({ lang }: CentersSectionProps) {
  const featuredCenters = centers.slice(0, 5)

  return (
    <section id="centers" className="py-24 bg-secondary/30 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Naši centri
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCenters.map((center, index) => (
            <div
              key={center.id}
              className={`group bg-card rounded-2xl overflow-hidden card-elevated border border-border/50 ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "h-64 lg:h-80" : "h-48"
                }`}
              >
                <Image
                  src={center.image}
                  alt={center.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-primary-foreground">
                    {center.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{center.excerpt}</p>
                <Button variant="link" className="p-0 h-auto group/btn" asChild>
                  <Link href={routes.centers.detail(lang, center.slug)}>
                    Saznaj više
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href={routes.centers.list(lang)}>Svi centri</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
