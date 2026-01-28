import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { routes, defaultLanguage } from "@/lib"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <FileQuestion className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-serif text-6xl font-bold text-foreground mb-4">404</h1>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Stranica nije pronađena
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stranica koju tražite ne postoji ili je premještena.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={routes.home(defaultLanguage)}>Vrati se na početnu</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={routes.about.overview(defaultLanguage)}>O Institutu</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
