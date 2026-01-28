export type ProjectStatus = "aktivno" | "završeno" | "planirano"
export type ProjectCategory = "istraživanje" | "očuvanje" | "edukacija" | "razvoj"

export type Project = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: ProjectCategory
  status: ProjectStatus
  year: number
  image: string
  gallery?: string[]
  tags: string[]
  relatedProjects?: string[]
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "gen-banka-digitalizacija",
    title: "Digitalizacija Gen Banke",
    excerpt: "Projekat digitalizacije kolekcije genetičkih resursa",
    body: "Ovaj projekat ima za cilj potpunu digitalizaciju kolekcije Gen Banke, uključujući katalogizaciju svih uzoraka, kreiranje digitalne baze podataka i razvoj online platforme za pristup informacijama. Projektom će biti obuhvaćeno preko 50.000 uzoraka sa detaljnim metapodacima.",
    category: "razvoj",
    status: "aktivno",
    year: 2024,
    image: "/assets/gene-bank.jpg",
    gallery: ["/assets/gene-bank.jpg", "/assets/botanical-garden.jpg"],
    tags: ["digitalizacija", "tehnologija", "baza podataka"],
    relatedProjects: ["2", "3"],
  },
  {
    id: "2",
    slug: "monitoring-biodiverziteta",
    title: "Monitoring Biodiverziteta",
    excerpt: "Dugoročni monitoring biodiverziteta u zaštićenim područjima",
    body: "Projekat obuhvata sistematski monitoring biodiverziteta u svim zaštićenim područjima pod upravom Instituta. Sprovodi se praćenje promena u biljnim i životinjskim zajednicama, analiza uticaja klimatskih promena i razvoj strategija adaptacije.",
    category: "istraživanje",
    status: "aktivno",
    year: 2023,
    image: "/assets/biodiversity-center.jpg",
    tags: ["monitoring", "biodiverzitet", "klimatske promene"],
    relatedProjects: ["1", "5"],
  },
  {
    id: "3",
    slug: "edukativni-programi",
    title: "Edukativni Programi za Škole",
    excerpt: "Razvoj i implementacija edukativnih programa za osnovne i srednje škole",
    body: "Projekat razvija i implementira edukativne programe namenjene učenicima osnovnih i srednjih škola. Programi obuhvataju praktične radionice, vodene obilaske Botaničke bašte i interaktivne prezentacije o važnosti očuvanja genetičkih resursa.",
    category: "edukacija",
    status: "aktivno",
    year: 2024,
    image: "/assets/botanical-garden.jpg",
    tags: ["edukacija", "škole", "mladi"],
    relatedProjects: ["4"],
  },
  {
    id: "4",
    slug: "rekultivacija-rudnika",
    title: "Rekultivacija Napuštenih Rudnika",
    excerpt: "Projekat rekultivacije napuštenih rudničkih lokacija",
    body: "Projekat se fokusira na rekultivaciju napuštenih rudničkih lokacija korišćenjem autohtonih biljnih vrsta iz našeg rasadnika. Razvijamo metode za poboljšanje kvaliteta zemljišta i uspostavljanje održivih ekosistema.",
    category: "očuvanje",
    status: "završeno",
    year: 2023,
    image: "/assets/nursery.jpg",
    tags: ["rekultivacija", "autohtone vrste", "održivost"],
    relatedProjects: ["3"],
  },
  {
    id: "5",
    slug: "gen-banka-seeds",
    title: "Gen Banka Seeds - Distribucija Semena",
    excerpt: "Program distribucije semena autohtonih vrsta",
    body: "Program omogućava javnosti pristup semenu autohtonih biljnih vrsta za ličnu upotrebu. Kroz online platformu, građani mogu naručiti seme sa detaljnim uputstvima za uzgoj i negu.",
    category: "razvoj",
    status: "aktivno",
    year: 2024,
    image: "/assets/gene-bank.jpg",
    tags: ["distribucija", "javnost", "autohtone vrste"],
    relatedProjects: ["1", "4"],
  },
  {
    id: "6",
    slug: "klimatske-promene-adaptacija",
    title: "Adaptacija na Klimatske Promene",
    excerpt: "Istraživanje strategija adaptacije biljnih vrsta na klimatske promene",
    body: "Projekat istražuje uticaj klimatskih promena na autohtone biljne vrste i razvija strategije adaptacije. Uključuje eksperimente sa različitim klimatskim scenarijima i identifikaciju otpornih genotipova.",
    category: "istraživanje",
    status: "aktivno",
    year: 2024,
    image: "/assets/biodiversity-center.jpg",
    tags: ["klimatske promene", "adaptacija", "istraživanje"],
    relatedProjects: ["2"],
  },
  {
    id: "7",
    slug: "medicinske-biljke",
    title: "Katalog Medicinskih Biljaka",
    excerpt: "Istraživanje i dokumentovanje tradicionalnih medicinskih biljaka",
    body: "Projekat dokumentuje tradicionalnu upotrebu medicinskih biljaka u regionu, istražuje njihove hemijske sastave i potencijal za modernu primenu. Rezultati će biti objavljeni u digitalnom katalogu sa detaljnim opisima i fotografijama.",
    category: "istraživanje",
    status: "planirano",
    year: 2025,
    image: "/assets/botanical-garden.jpg",
    tags: ["medicina", "tradicija", "katalog"],
    relatedProjects: [],
  },
  {
    id: "8",
    slug: "međunarodna-saradnja",
    title: "Međunarodna Saradnja i Razmena",
    excerpt: "Projekat razmene genetičkih resursa sa međunarodnim partnerima",
    body: "Projekat omogućava razmenu genetičkih resursa i znanja sa međunarodnim institucijama. Uključuje organizaciju radionica, konferencija i zajedničkih istraživačkih projekata sa fokusom na očuvanje globalnog biodiverziteta.",
    category: "razvoj",
    status: "aktivno",
    year: 2024,
    image: "/assets/protected-area.jpg",
    tags: ["saradnja", "međunarodno", "razmena"],
    relatedProjects: ["1"],
  },
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug)
}

export const getRelatedProjects = (project: Project): Project[] => {
  if (!project.relatedProjects) return []
  return projects.filter((p) => project.relatedProjects?.includes(p.id))
}

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter((p) => p.category === category)
}

export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return projects.filter((p) => p.status === status)
}
