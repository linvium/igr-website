import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { routes, news, getFeaturedNews, type Language } from "@/lib"
import { formatDateShort } from "@/lib/format"

interface NewsSectionProps {
  lang: Language
}

export function NewsSection({ lang }: NewsSectionProps) {
  const featured = getFeaturedNews()[0]
  const regularNews = news.filter((n) => !n.featured).slice(0, 3)

  return (
    <section id="news" className="py-24 bg-secondary/30 relative">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Novosti
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
              Sve vijesti
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured News */}
          {featured && (
            <div className="group bg-card rounded-2xl overflow-hidden card-elevated border border-border/50 lg:row-span-2">
              <div className="relative h-64 lg:h-80">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium mb-3 capitalize">
                    {featured.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDateShort(featured.date)}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button variant="link" className="p-0 h-auto group/btn" asChild>
                  <Link href={routes.news.detail(lang, featured.slug)}>
                    Pročitaj više
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Regular News */}
          <div className="space-y-6">
            {regularNews.map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-2xl p-6 card-elevated border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-3 capitalize">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{item.excerpt}</p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateShort(item.date)}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link href={routes.news.detail(lang, item.slug)}>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
