"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitch } from "./LanguageSwitch"
import { Container } from "./Container"
import { routes, type Language } from "@/lib"
import { getLanguage } from "@/lib/lang"

const navigation = [
  { name: "O Institutu", href: (lang: Language) => routes.about.overview(lang) },
  { name: "Centri", href: (lang: Language) => routes.centers.list(lang) },
  { name: "Projekti", href: (lang: Language) => routes.projects.list(lang) },
  { name: "Novosti", href: (lang: Language) => routes.news.list(lang) },
  { name: "Galerija", href: (lang: Language) => routes.gallery.list(lang) },
  { name: "Kontakt", href: (lang: Language) => routes.contact(lang) },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const currentLang = getLanguage(pathname.split("/")[1] as Language)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={routes.home(currentLang)} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1
                  className={`font-serif font-bold text-lg leading-tight transition-colors ${
                    isScrolled ? "text-foreground" : "text-primary-foreground"
                  }`}
                >
                  Institut za Genetičke Resurse
                </h1>
                <p
                  className={`text-xs transition-colors ${
                    isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                  }`}
                >
                  Centar za očuvanje i istraživanje
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href(currentLang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-primary/10 ${
                    isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="ml-4">
                <LanguageSwitch />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitch />
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-foreground" : "text-primary-foreground"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-border/50 animate-fade-up">
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href(currentLang)}
                    className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}
