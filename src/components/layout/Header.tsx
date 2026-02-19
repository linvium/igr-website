'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from './LanguageSwitch';
import { Container } from './Container';
import { routes, type Language } from '@/lib';
import { getLanguage } from '@/lib/lang';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = getLanguage(pathname.split('/')[1] as Language);
  const siteSettings = useSiteSettings();
  const navigation = siteSettings.navbar;

  const isExternal = (href: string) =>
    href.startsWith('http://') || href.startsWith('https://');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <Container>
        <nav className="py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href={routes.home(currentLang)}
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform bg-primary">
                <Image
                  src="/logo-white.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-serif font-bold text-lg leading-tight text-foreground transition-colors">
                  {siteSettings.name}
                </h1>
                {siteSettings.shortName && (
                  <p className="text-xs text-muted-foreground">
                    {siteSettings.shortName}
                  </p>
                )}
              </div>
            </Link>

            {/* Desktop Navigation - centered, uppercase */}
            <div className="hidden lg:flex items-center justify-center gap-6 flex-1">
              {navigation.map((item) =>
                isExternal(item.href) ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>

            {/* Right: Language + Search + Mobile menu */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageSwitch />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-border/50 animate-fade-up">
              <div className="flex flex-col gap-2">
                {navigation.map((item) =>
                  isExternal(item.href) ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}
