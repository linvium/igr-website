import { Header, Footer } from "@/components/layout"
import { getLanguage } from "@/lib/lang"
import type { Language } from "@/lib"

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer lang={lang} />
    </>
  )
}
