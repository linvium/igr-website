import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const news = [
  {
    id: 1,
    title: "Međunarodna konferencija o biodiverzitetu",
    excerpt:
      "Institut organizuje godišnju konferenciju posvećenu očuvanju biodiverziteta u regionu Jugoistočne Evrope.",
    date: "15. Jan 2026",
    category: "Događaji",
    featured: true,
  },
  {
    id: 2,
    title: "Nova kolekcija sjemena u banci gena",
    excerpt:
      "Uspješno prikupljeno i pohranjeno preko 200 novih uzoraka sjemena autohtonih vrsta.",
    date: "10. Jan 2026",
    category: "Vijesti",
    featured: false,
  },
  {
    id: 3,
    title: "Potpisani sporazum sa FAO",
    excerpt:
      "Novi sporazum o saradnji sa Organizacijom za hranu i poljoprivredu Ujedinjenih nacija.",
    date: "05. Jan 2026",
    category: "Saradnja",
    featured: false,
  },
  {
    id: 4,
    title: "Proljetna akcija sadnje drveća",
    excerpt:
      "Pridružite nam se u akciji sadnje autohtonih vrsta drveća na području Univerzitetskog grada.",
    date: "01. Jan 2026",
    category: "Akcije",
    featured: false,
  },
];

export function NewsSection() {
  const featuredNews = news.find((n) => n.featured);
  const regularNews = news.filter((n) => !n.featured);

  return (
    <section id="news" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
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
              Pratite naše aktivnosti, događaje i postignuća u oblasti očuvanja
              genetičkih resursa.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start lg:self-auto">
            Sve vijesti
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured News */}
          {featuredNews && (
            <div className="group bg-card rounded-2xl overflow-hidden card-elevated border border-border/50 lg:row-span-2">
              <div className="relative h-64 lg:h-80 bg-primary/10">
                <div className="absolute inset-0 hero-gradient opacity-90" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium mb-3">
                    {featuredNews.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-3">
                    {featuredNews.title}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredNews.date}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Button variant="link" className="p-0 h-auto group/btn">
                  Pročitaj više
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
