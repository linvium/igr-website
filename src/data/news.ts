export type NewsCategory = "vesti" | "dogadjaji" | "istrazivanja" | "edukacija" | "saradnja"

export type News = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: NewsCategory
  date: string
  image: string
  tags: string[]
  featured?: boolean
  relatedNews?: string[]
}

export const news: News[] = [
  {
    id: "1",
    slug: "otvorena-nova-gen-banka",
    title: "Otvorena Nova Gen Banka",
    excerpt: "Svečano otvorenje nove zgrade Gen Banke sa kapacitetom za 100.000 uzoraka",
    body: "Danas je svečano otvorena nova zgrada Gen Banke, koja predstavlja najsavremeniji centar za očuvanje genetičkih resursa u regionu. Nova zgrada ima kapacitet za čuvanje preko 100.000 uzoraka u kontrolisanim uslovima, što omogućava dugoročno očuvanje genetičkog materijala. Investicija vredna 5 miliona evra omogućila je instalaciju najsavremenije opreme za krioprezervaciju i digitalizaciju kolekcije.",
    category: "vesti",
    date: "2024-12-15",
    image: "/assets/gene-bank.jpg",
    tags: ["gen banka", "otvorenje", "investicija"],
    featured: true,
    relatedNews: ["2", "3"],
  },
  {
    id: "2",
    slug: "konferencija-biodiverzitet-2024",
    title: "Konferencija o Biodiverzitetu 2024",
    excerpt: "Uspešno održana međunarodna konferencija sa preko 200 učesnika",
    body: "Institut je organizovao međunarodnu konferenciju o biodiverzitetu koja je okupila preko 200 stručnjaka iz 30 zemalja. Tokom tri dana, učesnici su razmenjivali iskustva o najnovijim istraživanjima, strategijama očuvanja i izazovima sa kojima se suočavamo u eri klimatskih promena. Posebno mesto zauzeli su paneli o digitalizaciji genetičkih resursa i međunarodnoj saradnji.",
    category: "dogadjaji",
    date: "2024-11-20",
    image: "/assets/biodiversity-center.jpg",
    tags: ["konferencija", "međunarodno", "biodiverzitet"],
    featured: true,
    relatedNews: ["1", "8"],
  },
  {
    id: "3",
    slug: "novi-projekat-klimatske-promene",
    title: "Pokrenut Novi Projekat o Klimatskim Promenama",
    excerpt: "Počinje istraživanje adaptacije biljnih vrsta na klimatske promene",
    body: "Institut je pokrenuo novi trogodišnji projekat fokusiran na istraživanje adaptacije autohtonih biljnih vrsta na klimatske promene. Projekat će obuhvatiti terenska istraživanja, laboratorijske eksperimente i razvoj strategija za očuvanje genetičkih resursa u uslovima promenjenog klime. Finansiranje obezbeđeno je kroz međunarodni grant u vrednosti od 500.000 evra.",
    category: "istrazivanja",
    date: "2024-10-10",
    image: "/assets/biodiversity-center.jpg",
    tags: ["klimatske promene", "istraživanje", "projekat"],
    relatedNews: ["1", "6"],
  },
  {
    id: "4",
    slug: "edukativni-program-za-skole",
    title: "Novi Edukativni Program za Osnovne Škole",
    excerpt: "Pokrenut program edukacije o važnosti genetičkih resursa",
    body: "Institut je pokrenuo novi edukativni program namenjen učenicima osnovnih škola. Program obuhvata interaktivne radionice, vodene obilaske Botaničke bašte i praktične aktivnosti koje učenike upoznaju sa svetom biljaka i važnošću očuvanja genetičkih resursa. Do sada je programom obuhvaćeno preko 1.000 učenika iz 20 škola.",
    category: "edukacija",
    date: "2024-09-15",
    image: "/assets/botanical-garden.jpg",
    tags: ["edukacija", "škole", "mladi"],
    relatedNews: ["5"],
  },
  {
    id: "5",
    slug: "radionica-za-nastavnike",
    title: "Radionica za Nastavnike Prirodnih Nauka",
    excerpt: "Organizovana radionica za nastavnike o genetičkim resursima",
    body: "Institut je organizovao jednodnevnu radionicu za nastavnike prirodnih nauka iz osnovnih i srednjih škola. Radionica je obuhvatila predavanja o genetičkim resursima, praktične demonstracije u Botaničkoj bašti i distribuciju edukativnih materijala koje nastavnici mogu koristiti u nastavi. Učestvovalo je 50 nastavnika iz Beograda i okoline.",
    category: "edukacija",
    date: "2024-08-20",
    image: "/assets/botanical-garden.jpg",
    tags: ["edukacija", "nastavnici", "radionica"],
    relatedNews: ["4"],
  },
  {
    id: "6",
    slug: "saradnja-sa-univerzitetom",
    title: "Potpisana Saradnja sa Univerzitetom",
    excerpt: "Institut i Univerzitet potpisali sporazum o zajedničkim istraživanjima",
    body: "Institut za Genetičke Resurse i Biološki fakultet Univerziteta u Beogradu potpisali su sporazum o dugoročnoj saradnji. Sporazumom je predviđena razmena znanja i resursa, zajednička istraživanja i programi za studente. Prvi zajednički projekat će se fokusirati na istraživanje endemičkih biljnih vrsta.",
    category: "saradnja",
    date: "2024-07-05",
    image: "/assets/biodiversity-center.jpg",
    tags: ["saradnja", "univerzitet", "istraživanje"],
    relatedNews: ["8"],
  },
  {
    id: "7",
    slug: "novi-katalog-medicinskih-biljaka",
    title: "Objavljen Novi Katalog Medicinskih Biljaka",
    excerpt: "Digitalni katalog sa preko 200 tradicionalnih medicinskih biljaka",
    body: "Institut je objavio novi digitalni katalog tradicionalnih medicinskih biljaka koje rastu u našoj zemlji. Katalog obuhvata preko 200 vrsta sa detaljnim opisima, fotografijama, informacijama o tradicionalnoj upotrebi i savremenim naučnim saznanjima. Katalog je dostupan besplatno na web sajtu Instituta.",
    category: "istrazivanja",
    date: "2024-06-12",
    image: "/assets/botanical-garden.jpg",
    tags: ["katalog", "medicina", "tradicija"],
    relatedNews: [],
  },
  {
    id: "8",
    slug: "medjunarodni-grant",
    title: "Dobijen Međunarodni Grant za Digitalizaciju",
    excerpt: "Institut je dobio grant od 300.000 evra za digitalizaciju kolekcije",
    body: "Institut za Genetičke Resurse je uspešno dobio međunarodni grant u vrednosti od 300.000 evra za projekat digitalizacije kolekcije genetičkih resursa. Grant će omogućiti potpunu digitalizaciju postojeće kolekcije, razvoj online platforme i obuku osoblja. Projekat će trajati dve godine i rezultiraće najsveobuhvatnijom digitalnom bazom genetičkih resursa u regionu.",
    category: "vesti",
    date: "2024-05-20",
    image: "/assets/gene-bank.jpg",
    tags: ["grant", "digitalizacija", "međunarodno"],
    featured: true,
    relatedNews: ["1", "6"],
  },
]

export const getNewsBySlug = (slug: string): News | undefined => {
  return news.find((item) => item.slug === slug)
}

export const getRelatedNews = (item: News): News[] => {
  if (!item.relatedNews) return []
  return news.filter((n) => item.relatedNews?.includes(n.id))
}

export const getFeaturedNews = (): News[] => {
  return news.filter((item) => item.featured)
}

export const getNewsByCategory = (category: NewsCategory): News[] => {
  return news.filter((item) => item.category === category)
}
