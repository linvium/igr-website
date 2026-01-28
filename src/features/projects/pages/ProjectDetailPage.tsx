import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, getProjectBySlug, getRelatedProjects, type Language } from "@/lib"
import { formatYear } from "@/lib/format"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectDetailPageProps {
  lang: Language
  slug: string
}

export function ProjectDetailPage({ lang, slug }: ProjectDetailPageProps) {
  const project = getProjectBySlug(slug)
  if (!project) {
    return null
  }

  const relatedProjects = getRelatedProjects(project)

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: "Projekti", href: routes.projects.list(lang) },
            { label: project.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.projects.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nazad na projekte
        </Link>
      </Button>

      <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      <PageHeader title={project.title} description={project.excerpt} />

      <div className="grid lg:grid-cols-3 gap-12 py-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none mb-8">
            <p>{project.body}</p>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {project.gallery.map((img, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image src={img} alt={`${project.title} - slika ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Informacije</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Kategorija</p>
                  <Badge className="capitalize">{project.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <Badge
                    className={`capitalize ${
                      project.status === "aktivno"
                        ? "bg-primary/10 text-primary"
                        : project.status === "završeno"
                          ? "bg-muted text-muted-foreground"
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Godina</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatYear(project.year)}</span>
                  </div>
                </div>
                {project.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tagovi</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {relatedProjects.length > 0 && (
        <div className="py-12 border-t">
          <h2 className="font-serif text-3xl font-bold mb-8">Povezani projekti</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((related) => (
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
                    <Link href={routes.projects.detail(lang, related.slug)}>Saznaj više</Link>
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
