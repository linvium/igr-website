"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs, FilterPills, EmptyState } from "@/components/shared"
import { routes, projects, type Language, type ProjectCategory, type ProjectStatus } from "@/lib"
import { formatYear } from "@/lib/format"
import type { FilterOption } from "@/components/shared/FilterPills"

interface ProjectsListPageProps {
  lang: Language
}

const categoryOptions: FilterOption[] = [
  { value: "all", label: "Sve" },
  { value: "istraživanje", label: "Istraživanje" },
  { value: "očuvanje", label: "Očuvanje" },
  { value: "edukacija", label: "Edukacija" },
  { value: "razvoj", label: "Razvoj" },
]

const statusOptions: FilterOption[] = [
  { value: "all", label: "Sve" },
  { value: "aktivno", label: "Aktivno" },
  { value: "završeno", label: "Završeno" },
  { value: "planirano", label: "Planirano" },
]

export function ProjectsListPage({ lang }: ProjectsListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: "Projekti" }]} />
      </div>

      <PageHeader
        title="Projekti"
        description="Aktivni i završeni projekti koji doprinose očuvanju genetičkih resursa i biodiverziteta."
      />

      {/* Filters */}
      <div className="space-y-6 py-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pretraži projekte..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Kategorija</h3>
            <FilterPills
              options={categoryOptions}
              selected={selectedCategory === "all" ? [] : [selectedCategory]}
              onSelect={(value) => setSelectedCategory(value)}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <FilterPills
              options={statusOptions}
              selected={selectedStatus === "all" ? [] : [selectedStatus]}
              onSelect={(value) => setSelectedStatus(value)}
            />
          </div>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="Nema pronađenih projekata"
          description="Pokušajte da promenite filtere ili pretragu."
        />
      ) : (
        <div className="space-y-6 py-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl p-6 md:p-8 card-elevated border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
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
                  <p className="text-muted-foreground mb-4">{project.excerpt}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatYear(project.year)}</span>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={routes.projects.detail(lang, project.slug)}>Detalji</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
