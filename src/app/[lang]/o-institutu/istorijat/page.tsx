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
  return generatePageMetadata("Istorijat", "Istorija Instituta za Genetičke Resurse")
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return (
    <AboutSubPage
      lang={lang}
      title="Istorijat"
      description="Istorija razvoja Instituta za Genetičke Resurse"
      breadcrumbLabel="Istorijat"
      content={
        <>
          <h2>Osnivanje</h2>
          <p>
            Institut za Genetičke Resurse je osnovan sa ciljem očuvanja genetičkih resursa i
            biodiverziteta. Od samog početka, Institut je bio posvećen naučnom istraživanju i
            praktičnoj primeni znanja o genetičkim resursima.
          </p>

          <h2>Razvoj</h2>
          <p>
            Tokom godina, Institut je proširio svoje aktivnosti i sada obuhvata pet specijalizovanih
            centara koji rade na različitim aspektima očuvanja genetičkih resursa. Svaki centar
            ima svoju specifičnu ulogu i doprinosi ukupnom cilju Instituta.
          </p>

          <h2>Dostignuća</h2>
          <ul>
            <li>Osnivanje Gen Banke sa preko 50.000 uzoraka</li>
            <li>Razvoj Botaničke bašte sa preko 3.000 biljnih vrsta</li>
            <li>Međunarodna saradnja sa vodećim institucijama</li>
            <li>Brojni naučni projekti i publikacije</li>
            <li>Edukativni programi za sve uzraste</li>
          </ul>

          <h2>Budućnost</h2>
          <p>
            Institut nastavlja da se razvija i unapređuje svoje aktivnosti, sa fokusom na
            digitalizaciju, međunarodnu saradnju i inovativne pristupe očuvanju genetičkih resursa.
          </p>
        </>
      }
    />
  )
}
