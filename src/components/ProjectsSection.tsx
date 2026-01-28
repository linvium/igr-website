import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Mapiranje genetičkih resursa BiH",
    category: "Istraživanje",
    status: "Aktivan",
    year: "2024",
    description:
      "Sveobuhvatno mapiranje i dokumentovanje genetičkih resursa biljaka na teritoriji Bosne i Hercegovine.",
  },
  {
    id: 2,
    title: "Očuvanje autohtonih sorti voća",
    category: "Konzervacija",
    status: "Aktivan",
    year: "2023",
    description:
      "Program očuvanja i obnove starih sorti jabuka, krušaka i šljiva karakterističnih za region.",
  },
  {
    id: 3,
    title: "Monitoring ugroženih vrsta",
    category: "Biodiverzitet",
    status: "Aktivan",
    year: "2024",
    description:
      "Kontinuirano praćenje populacija ugroženih biljnih i životinjskih vrsta na zaštićenim područjima.",
  },
  {
    id: 4,
    title: "Edukativni programi za mlade",
    category: "Obrazovanje",
    status: "Završen",
    year: "2023",
    description:
      "Radionice i terenska nastava za učenike osnovnih i srednjih škola o značaju biodiverziteta.",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dna-helix opacity-20" />

      <div className="container mx-auto px-4 relative">
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
              Aktivni i završeni projekti koji doprinose očuvanju genetičkih resursa i
              biodiverziteta u regionu.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start lg:self-auto">
            Svi projekti
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl p-6 md:p-8 card-elevated border border-border/50 hover:border-primary/30 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Project Number */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <span className="text-2xl font-serif font-bold text-primary group-hover:text-primary-foreground transition-colors">
                    {String(project.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Aktivan"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                {/* Year & Arrow */}
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
