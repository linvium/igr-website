import { AboutSubPage } from "@/features/about"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  return generatePageMetadata("Partneri", "Partneri Instituta za Genetičke Resurse")
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return (
    <AboutSubPage
      lang={lang}
      title="Partneri"
      description="Naši partneri i saradnici"
      breadcrumbLabel="Partneri"
      content={
        <>
          <h2>Međunarodni Partneri</h2>
          <p>
            Institut za Genetičke Resurse saraduje sa brojnim međunarodnim organizacijama i
            institucijama u oblasti očuvanja genetičkih resursa i biodiverziteta.
          </p>

          <h2>Glavni Partneri</h2>
          <ul>
            <li>FAO - Organizacija za hranu i poljoprivredu Ujedinjenih nacija</li>
            <li>ECPGR - Evropska kooperativna programa za genetičke resurse biljaka</li>
            <li>AEGIS - Evropski sistem za očuvanje genetičkih resursa</li>
            <li>Razni univerziteti i istraživački instituti u regionu</li>
          </ul>

          <h2>Lokalni Partneri</h2>
          <p>
            Institut takođe saraduje sa lokalnim institucijama, organizacijama i zajednicama u
            cilju promocije očuvanja genetičkih resursa i biodiverziteta.
          </p>

          <h2>Saradnja</h2>
          <p>
            Kroz saradnju sa našim partnerima, razmenjujemo znanje, resurse i najbolje prakse u
            oblasti očuvanja genetičkih resursa. Ova saradnja omogućava nam da postignemo veće
            rezultate i doprinesemo globalnim naporima za očuvanje biodiverziteta.
          </p>
        </>
      }
    />
  )
}
