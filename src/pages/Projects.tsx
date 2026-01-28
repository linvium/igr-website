import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const allProjects = [
  {
    id: 1,
    title: "Mapiranje genetičkih resursa BiH",
    category: "Istraživanje",
    status: "Aktivan",
    year: "2024",
    description:
      "Sveobuhvatno mapiranje i dokumentovanje genetičkih resursa biljaka na teritoriji Bosne i Hercegovine.",
    fullDescription:
      "Ovaj projekat ima za cilj kompletnu inventarizaciju biljnih genetičkih resursa na prostoru BiH. Uključuje terenska istraživanja, prikupljanje uzoraka, genetičke analize i izradu digitalne baze podataka.",
  },
  {
    id: 2,
    title: "Očuvanje autohtonih sorti voća",
    category: "Konzervacija",
    status: "Aktivan",
    year: "2023",
    description:
      "Program očuvanja i obnove starih sorti jabuka, krušaka i šljiva karakterističnih za region.",
    fullDescription:
      "Program se fokusira na identifikaciju, dokumentovanje i očuvanje tradicionalnih sorti voća koje su u opasnosti od izumiranja. Uključuje rad sa lokalnim zajednicama i uspostavljanje matičnih zasada.",
  },
  {
    id: 3,
    title: "Monitoring ugroženih vrsta",
    category: "Biodiverzitet",
    status: "Aktivan",
    year: "2024",
    description:
      "Kontinuirano praćenje populacija ugroženih biljnih i životinjskih vrsta na zaštićenim područjima.",
    fullDescription:
      "Sistematski monitoring vrsta sa crvene liste uključuje praćenje veličine populacija, stanja staništa i prijetnji. Podaci se koriste za izradu akcionih planova zaštite.",
  },
  {
    id: 4,
    title: "Edukativni programi za mlade",
    category: "Obrazovanje",
    status: "Završen",
    year: "2023",
    description:
      "Radionice i terenska nastava za učenike osnovnih i srednjih škola o značaju biodiverziteta.",
    fullDescription:
      "Program je obuhvatio više od 50 škola i 2000 učenika. Uključivao je radionice, terenske izlete, izradu edukativnih materijala i takmičenja na temu zaštite prirode.",
  },
  {
    id: 5,
    title: "Revitalizacija degradiranih staništa",
    category: "Konzervacija",
    status: "Aktivan",
    year: "2024",
    description:
      "Obnova prirodnih ekosistema oštećenih ljudskim aktivnostima korištenjem autohtonih vrsta.",
    fullDescription:
      "Projekat uključuje pripremu terena, sadnju autohtonih vrsta iz našeg rasadnika, monitoring uspješnosti i dugoročno upravljanje obnovljenim područjima.",
  },
  {
    id: 6,
    title: "Digitalizacija herbarske zbirke",
    category: "Istraživanje",
    status: "Završen",
    year: "2022",
    description:
      "Skeniranje i katalogizacija historijske herbarske zbirke u digitalnu bazu podataka.",
    fullDescription:
      "Više od 10,000 herbarskih primjeraka je digitalizirano i učinjeno dostupnim online. Baza uključuje fotografije, geografske podatke i taksonomske informacije.",
  },
  {
    id: 7,
    title: "Međunarodna razmjena germplazme",
    category: "Saradnja",
    status: "Aktivan",
    year: "2023",
    description:
      "Uspostavljanje mreže za razmjenu biljnog genetičkog materijala sa partnerskim institucijama.",
    fullDescription:
      "Projekat uključuje usklađivanje sa međunarodnim standardima (ITPGRFA), potpisivanje sporazuma o razmjeni i razvoj protokola za siguran transfer genetičkog materijala.",
  },
  {
    id: 8,
    title: "Klimatske promjene i biodiverzitet",
    category: "Istraživanje",
    status: "Aktivan",
    year: "2024",
    description:
      "Istraživanje uticaja klimatskih promjena na rasprostranjenje i adaptaciju vrsta u regionu.",
    fullDescription:
      "Multidisciplinarno istraživanje koje kombinuje klimatske modele, terenska istraživanja i genetičke analize za predviđanje budućih promjena i planiranje adaptacionih mjera.",
  },
];

const categories = ["Sve", "Istraživanje", "Konzervacija", "Biodiverzitet", "Obrazovanje", "Saradnja"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("Sve");
  const [activeStatus, setActiveStatus] = useState("Svi");

  const filteredProjects = allProjects.filter((project) => {
    const categoryMatch = activeCategory === "Sve" || project.category === activeCategory;
    const statusMatch =
      activeStatus === "Svi" ||
      (activeStatus === "Aktivni" && project.status === "Aktivan") ||
      (activeStatus === "Završeni" && project.status === "Završen");
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <div className="absolute inset-0 dna-helix opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6">
              Naši projekti
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Pregled svih aktivnih i završenih projekata koji doprinose očuvanju genetičkih resursa
              i biodiverziteta u regionu.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-secondary/30 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-muted-foreground" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                {["Svi", "Aktivni", "Završeni"].map((status) => (
                  <Button
                    key={status}
                    variant={activeStatus === status ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveStatus(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-card rounded-2xl p-6 md:p-8 card-elevated border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
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
                        <span className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.fullDescription}</p>
                      <Button variant="link" className="p-0 h-auto group/btn">
                        Detalji projekta
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nema projekata koji odgovaraju odabranim filterima.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
