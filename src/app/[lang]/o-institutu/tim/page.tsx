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
  return generatePageMetadata("Tim", "Tim Instituta za Genetičke Resurse")
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return (
    <AboutSubPage
      lang={lang}
      title="Tim"
      description="Upoznajte naš tim stručnjaka"
      breadcrumbLabel="Tim"
      content={
        <>
          <h2>Naš Tim</h2>
          <p>
            Institut za Genetičke Resurse okuplja multidisciplinarni tim naučnika, istraživača i
            stručnjaka posvećenih očuvanju genetičkog naslijeđa. Naš tim kombinuje ekspertizu iz
            različitih oblasti kako bismo postigli najbolje rezultate.
          </p>

          <h2>Stručnjaci</h2>
          <p>
            Naš tim čine doktori nauka, istraživači, botaničari, genetičari i drugi stručnjaci koji
            rade na različitim projektima očuvanja genetičkih resursa. Svaki član tima doprinosi
            svojom ekspertizom i entuzijazmom.
          </p>

          <h2>Centri i Timovi</h2>
          <ul>
            <li>Gen Banka - tim za očuvanje genetičkih resursa</li>
            <li>Botanička Bašta - tim za živu kolekciju biljaka</li>
            <li>Centar za Biodiverzitet - istraživački tim</li>
            <li>Rasadnik - tim za produkciju</li>
            <li>Zaštićeno Područje - tim za upravljanje</li>
          </ul>

          <h2>Saradnja</h2>
          <p>
            Naš tim saraduje sa brojnim međunarodnim institucijama, univerzitetima i
            organizacijama kako bismo delili znanje i najbolje prakse u očuvanju genetičkih resursa.
          </p>
        </>
      }
    />
  )
}
