export type Center = {
  id: string
  slug: string
  title: string
  excerpt: string
  description: string
  image: string
  category: string
  established: number
  director?: string
  location?: string
  relatedCenters?: string[]
}

export const centers: Center[] = [
  {
    id: "1",
    slug: "gen-banka",
    title: "Gen Banka",
    excerpt: "Centar za očuvanje genetičkih resursa biljaka",
    description: "Gen Banka je najveći centar za očuvanje genetičkih resursa biljaka u regionu. Sa preko 50.000 uzoraka, predstavlja ključni resurs za očuvanje biodiverziteta i istraživanje genetičkih resursa.",
    image: "/assets/gene-bank.jpg",
    category: "Očuvanje",
    established: 1985,
    director: "Dr. Marko Petrović",
    location: "Beograd",
    relatedCenters: ["2", "3"],
  },
  {
    id: "2",
    slug: "botanicka-basta",
    title: "Botanička Bašta",
    excerpt: "Živa kolekcija biljnih vrsta i edukativni centar",
    description: "Botanička bašta sa preko 3.000 biljnih vrsta predstavlja jedinstveni prostor za edukaciju, istraživanje i očuvanje biljnog sveta. Organizujemo edukativne programe i vodene obilaske za sve uzraste.",
    image: "/assets/botanical-garden.jpg",
    category: "Edukacija",
    established: 1992,
    director: "Dr. Ana Jovanović",
    location: "Beograd",
    relatedCenters: ["1", "4"],
  },
  {
    id: "3",
    slug: "centar-za-biodiverzitet",
    title: "Centar za Biodiverzitet",
    excerpt: "Istraživanje i monitoring biodiverziteta",
    description: "Centar za Biodiverzitet sprovodi istraživanja i monitoring biodiverziteta kroz terenske studije, analizu ekosistema i razvoj strategija za očuvanje prirodnih resursa.",
    image: "/assets/biodiversity-center.jpg",
    category: "Istraživanje",
    established: 2000,
    director: "Dr. Petar Nikolić",
    location: "Beograd",
    relatedCenters: ["1", "5"],
  },
  {
    id: "4",
    slug: "rasadnik",
    title: "Rasadnik",
    excerpt: "Produkcija i distribucija autohtonih biljnih vrsta",
    description: "Rasadnik proizvodi i distribuiše autohtone biljne vrste za potrebe rekultivacije, zaštićenih područja i javnih prostora. Specijalizovan za endemične i ugrožene vrste.",
    image: "/assets/nursery.jpg",
    category: "Produkcija",
    established: 1995,
    director: "Dr. Milica Stojanović",
    location: "Beograd",
    relatedCenters: ["2"],
  },
  {
    id: "5",
    slug: "zasticeno-podrucje",
    title: "Zaštićeno Područje",
    excerpt: "Upravljanje zaštićenim prirodnim područjima",
    description: "Centar upravlja zaštićenim prirodnim područjima, sprovodi monitoring, planiranje i implementaciju mera zaštite, te saradnju sa lokalnim zajednicama.",
    image: "/assets/protected-area.jpg",
    category: "Zaštita",
    established: 2005,
    director: "Dr. Stefan Đorđević",
    location: "Različite lokacije",
    relatedCenters: ["3"],
  },
]

export const getCenterBySlug = (slug: string): Center | undefined => {
  return centers.find((center) => center.slug === slug)
}

export const getRelatedCenters = (center: Center): Center[] => {
  if (!center.relatedCenters) return []
  return centers.filter((c) => center.relatedCenters?.includes(c.id))
}
