import { HeroSection } from "./sections/HeroSection"
import { AboutSection } from "./sections/AboutSection"
import { CentersSection } from "./sections/CentersSection"
import { ProjectsSection } from "./sections/ProjectsSection"
import { NewsSection } from "./sections/NewsSection"
import { GallerySection } from "./sections/GallerySection"
import { ContactSection } from "./sections/ContactSection"
import type { Language } from "@/lib"

interface HomePageProps {
  lang: Language
}

export function HomePage({ lang }: HomePageProps) {
  return (
    <>
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <CentersSection lang={lang} />
      <ProjectsSection lang={lang} />
      <NewsSection lang={lang} />
      <GallerySection lang={lang} />
      <ContactSection lang={lang} />
    </>
  )
}
