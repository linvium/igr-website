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
  return generatePageMetadata("Misija i Vizija", "Misija i vizija Instituta za Genetičke Resurse")
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return (
    <AboutSubPage
      lang={lang}
      title="Misija i Vizija"
      description="Naša misija i vizija za očuvanje genetičkih resursa"
      breadcrumbLabel="Misija i Vizija"
      content={
        <>
          <h2>Misija</h2>
          <p>
            Institut za Genetičke Resurse ima za cilj očuvanje i održivo korištenje genetičkih
            resursa kroz naučna istraživanja, obrazovanje i međunarodnu saradnju. Naša misija je da
            zaštitimo biodiverzitet za buduće generacije i da promovišemo održivo upravljanje
            genetičkim resursima.
          </p>

          <h2>Vizija</h2>
          <p>
            Vizija Instituta je da postane regionalni lider u očuvanju biodiverziteta i genetičkih
            resursa, prepoznat po izvrsnosti u naučnom radu, inovativnim pristupima i snažnoj
            međunarodnoj saradnji. Težimo da budemo centar izvrsnosti koji integriše istraživanje,
            obrazovanje i praktičnu primenu znanja o genetičkim resursima.
          </p>

          <h2>Vrednosti</h2>
          <ul>
            <li>Izvrsnost u naučnom radu</li>
            <li>Održivost i odgovornost</li>
            <li>Međunarodna saradnja</li>
            <li>Edukacija i transfer znanja</li>
            <li>Zaštita biodiverziteta</li>
          </ul>
        </>
      }
    />
  )
}
