import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { AboutNavigation } from "../components/AboutNavigation"
import { routes, type Language } from "@/lib"

interface AboutSubPageProps {
  lang: Language
  title: string
  description?: string
  breadcrumbLabel: string
  content: React.ReactNode
}

export function AboutSubPage({
  lang,
  title,
  description,
  breadcrumbLabel,
  content,
}: AboutSubPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: "O Institutu", href: routes.about.overview(lang) },
            { label: breadcrumbLabel },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-4 gap-12 py-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="font-serif text-lg font-semibold mb-4">Navigacija</h2>
            <AboutNavigation lang={lang} />
          </div>
        </aside>

        <div className="lg:col-span-3">
          <PageHeader title={title} description={description} />
          <div className="prose prose-lg max-w-none">{content}</div>
        </div>
      </div>
    </Container>
  )
}
