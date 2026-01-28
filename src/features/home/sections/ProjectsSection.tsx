import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { routes, projects, type Language } from "@/lib"
import { formatYear } from "@/lib/format"

interface ProjectsSectionProps {
  lang: Language
}

export function ProjectsSection({ lang }: ProjectsSectionProps) {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dna-helix opacity-20" />

      <Container className="relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Projekti
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Naši projekti
            </h2>
            <p className="text-lg text-muted-foreground">
              Aktivni i završeni projekti koji doprinose očuvanju genetičkih resursa i biodiverziteta
              u regionu.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start lg:self-auto" asChild>
            <Link href={routes.projects.list(lang)}>
              Svi projekti
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl p-6 md:p-8 card-elevated border border-border/50 hover:border-primary/30 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Project Number */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <span className="text-2xl font-serif font-bold text-primary group-hover:text-primary-foreground transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium capitalize">
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        project.status === "aktivno"
                          ? "bg-primary/10 text-primary"
                          : project.status === "završeno"
                            ? "bg-muted text-muted-foreground"
                            : "bg-accent/10 text-accent"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.excerpt}</p>
                </div>

                {/* Year & Arrow */}
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatYear(project.year)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link href={routes.projects.detail(lang, project.slug)}>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
