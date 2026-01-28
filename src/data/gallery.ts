export type GalleryCategory = "centri" | "projekti" | "dogadjaji" | "priroda" | "istrazivanja"

export type GalleryImage = {
  id: string
  url: string
  alt: string
  caption?: string
}

export type GalleryAlbum = {
  id: string
  slug: string
  title: string
  description: string
  category: GalleryCategory
  coverImage: string
  images: GalleryImage[]
  date: string
  tags: string[]
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "1",
    slug: "gen-banka-interijer",
    title: "Gen Banka - Interijer",
    description: "Fotografije unutrašnjosti nove zgrade Gen Banke",
    category: "centri",
    coverImage: "/assets/gene-bank.jpg",
    images: [
      { id: "1-1", url: "/assets/gene-bank.jpg", alt: "Gen Banka - glavna hala", caption: "Glavna hala za čuvanje uzoraka" },
      { id: "1-2", url: "/assets/botanical-garden.jpg", alt: "Gen Banka - laboratorija", caption: "Savremena laboratorija" },
      { id: "1-3", url: "/assets/biodiversity-center.jpg", alt: "Gen Banka - krioprezervacija", caption: "Jedinica za krioprezervaciju" },
    ],
    date: "2024-12-15",
    tags: ["gen banka", "interijer", "oprema"],
  },
  {
    id: "2",
    slug: "botanicka-basta-leto",
    title: "Botanička Bašta - Leto",
    description: "Fotografije Botaničke bašte tokom letnjih meseci",
    category: "priroda",
    coverImage: "/assets/botanical-garden.jpg",
    images: [
      { id: "2-1", url: "/assets/botanical-garden.jpg", alt: "Botanička bašta - leto", caption: "Letnji pejzaž" },
      { id: "2-2", url: "/assets/nursery.jpg", alt: "Cveće u bašti", caption: "Raznovrsno cveće" },
      { id: "2-3", url: "/assets/protected-area.jpg", alt: "Drveće u bašti", caption: "Stabla u bašti" },
    ],
    date: "2024-08-20",
    tags: ["botanička bašta", "leto", "priroda"],
  },
  {
    id: "3",
    slug: "konferencija-biodiverzitet",
    title: "Konferencija o Biodiverzitetu 2024",
    description: "Fotografije sa međunarodne konferencije",
    category: "dogadjaji",
    coverImage: "/assets/biodiversity-center.jpg",
    images: [
      { id: "3-1", url: "/assets/biodiversity-center.jpg", alt: "Konferencija - otvorenje", caption: "Svečano otvorenje" },
      { id: "3-2", url: "/assets/gene-bank.jpg", alt: "Konferencija - predavanje", caption: "Predavanje o genetičkim resursima" },
      { id: "3-3", url: "/assets/botanical-garden.jpg", alt: "Konferencija - panel", caption: "Panel diskusija" },
    ],
    date: "2024-11-20",
    tags: ["konferencija", "dogadjaj", "biodiverzitet"],
  },
  {
    id: "4",
    slug: "terenska-istrazivanja",
    title: "Terenska Istraživanja",
    description: "Fotografije sa terenskih istraživanja u zaštićenim područjima",
    category: "istrazivanja",
    coverImage: "/assets/protected-area.jpg",
    images: [
      { id: "4-1", url: "/assets/protected-area.jpg", alt: "Terensko istraživanje", caption: "Istraživači u akciji" },
      { id: "4-2", url: "/assets/biodiversity-center.jpg", alt: "Biljne vrste", caption: "Dokumentovanje biljnih vrsta" },
      { id: "4-3", url: "/assets/nursery.jpg", alt: "Uzorkovanje", caption: "Uzorkovanje genetičkog materijala" },
    ],
    date: "2024-09-10",
    tags: ["istraživanje", "teren", "biodiverzitet"],
  },
  {
    id: "5",
    slug: "rasadnik-proizvodnja",
    title: "Rasadnik - Proizvodnja",
    description: "Fotografije iz procesa proizvodnje autohtonih biljnih vrsta",
    category: "projekti",
    coverImage: "/assets/nursery.jpg",
    images: [
      { id: "5-1", url: "/assets/nursery.jpg", alt: "Rasadnik - proizvodnja", caption: "Proizvodnja sadnica" },
      { id: "5-2", url: "/assets/botanical-garden.jpg", alt: "Rasadnik - uzgoj", caption: "Uzgoj autohtonih vrsta" },
      { id: "5-3", url: "/assets/gene-bank.jpg", alt: "Rasadnik - distribucija", caption: "Priprema za distribuciju" },
    ],
    date: "2024-07-15",
    tags: ["rasadnik", "proizvodnja", "autohtone vrste"],
  },
  {
    id: "6",
    slug: "edukativni-programi",
    title: "Edukativni Programi",
    description: "Fotografije sa edukativnih programa za škole",
    category: "dogadjaji",
    coverImage: "/assets/botanical-garden.jpg",
    images: [
      { id: "6-1", url: "/assets/botanical-garden.jpg", alt: "Edukativni program", caption: "Učenici u Botaničkoj bašti" },
      { id: "6-2", url: "/assets/nursery.jpg", alt: "Radionica", caption: "Praktična radionica" },
      { id: "6-3", url: "/assets/biodiversity-center.jpg", alt: "Edukacija", caption: "Interaktivna prezentacija" },
    ],
    date: "2024-09-15",
    tags: ["edukacija", "škole", "mladi"],
  },
]

export const getAlbumBySlug = (slug: string): GalleryAlbum | undefined => {
  return galleryAlbums.find((album) => album.slug === slug)
}

export const getAlbumsByCategory = (category: GalleryCategory): GalleryAlbum[] => {
  return galleryAlbums.filter((album) => album.category === category)
}
