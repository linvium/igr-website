import Link from "next/link"
import { Target, Eye, History, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { routes, type Language } from "@/lib"

interface AboutSectionProps {
  lang: Language
}

const features = [
  {
    icon: Target,
    title: "Misija",
    description:
      "Očuvanje i održivo korištenje genetičkih resursa kroz naučna istraživanja, obrazovanje i međunarodnu saradnju.",
    href: (lang: Language) => routes.about.mission(lang),
  },
  {
    icon: Eye,
    title: "Vizija",
    description:
      "Postati regionalni lider u očuvanju biodiverziteta i genetičkih resursa, prepoznat po izvrsnosti u naučnom radu.",
    href: (lang: Language) => routes.about.mission(lang),
  },
  {
    icon: History,
    title: "Istorijat",
    description:
      "Osnovan kao centar za očuvanje genetičkih resursa, Institut ima dugu tradiciju u istraživanju i očuvanju biološke raznolikosti.",
    href: (lang: Language) => routes.about.history(lang),
  },
  {
    icon: Users,
    title: "Tim",
    description:
      "Multidisciplinarni tim naučnika, istraživača i stručnjaka posvećenih očuvanju genetičkog naslijeđa.",
    href: (lang: Language) => routes.about.team(lang),
  },
]

export function AboutSection({ lang }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 botanical-pattern opacity-50" />

      <Container className="relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            O nama
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            O Institutu
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            Institut za genetičke resurse je vodeća institucija u regionu za očuvanje
            biodiverziteta i genetičkih resursa.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group card-elevated border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-xl font-serif">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
                <Button variant="link" className="p-0 h-auto group/btn" asChild>
                  <Link href={feature.href(lang)}>
                    Saznaj više
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partners Section */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-8">Naši partneri</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["UNBL", "MŠVS", "FAO", "ECPGR", "AEGIS"].map((partner) => (
              <div
                key={partner}
                className="px-6 py-3 bg-secondary rounded-lg text-secondary-foreground font-medium hover:opacity-100 transition-opacity"
              >
                {partner}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href={routes.about.partners(lang)}>Svi partneri</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
