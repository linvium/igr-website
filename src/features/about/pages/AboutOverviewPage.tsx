import Link from "next/link"
import { ArrowRight, Target, Eye, History, Users, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout"
import { PageHeader } from "@/components/shared"
import { routes, type Language } from "@/lib"

interface AboutOverviewPageProps {
  lang: Language
}

const cards = [
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
  {
    icon: Handshake,
    title: "Partneri",
    description:
      "Saradnja sa međunarodnim organizacijama, univerzitetima i institucijama za očuvanje genetičkih resursa.",
    href: (lang: Language) => routes.about.partners(lang),
  },
]

export function AboutOverviewPage({ lang }: AboutOverviewPageProps) {
  return (
    <Container>
      <PageHeader
        title="O Institutu"
        description="Institut za Genetičke Resurse je vodeća institucija u regionu za očuvanje biodiverziteta i genetičkih resursa. Kroz pet specijalizovanih centara, radimo na istraživanju, očuvanju i obrazovanju."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {cards.map((card) => (
          <Card key={card.title} className="card-elevated">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-xl font-serif">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{card.description}</CardDescription>
              <Button variant="link" className="p-0 h-auto group/btn" asChild>
                <Link href={card.href(lang)}>
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
