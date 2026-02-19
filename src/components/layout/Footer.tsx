'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from './Container';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { routes, type Language } from '@/lib';

interface FooterProps {
  lang: Language;
}

const isExternal = (href: string) =>
  href.startsWith('http://') || href.startsWith('https://');

export function Footer({ lang }: FooterProps) {
  const siteSettings = useSiteSettings();
  const { institut, centri, resursi } = siteSettings.footer;
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: siteSettings.social.facebook },
    { name: 'Twitter', icon: Twitter, href: siteSettings.social.twitter },
    { name: 'LinkedIn', icon: Linkedin, href: siteSettings.social.linkedin },
    { name: 'Instagram', icon: Instagram, href: siteSettings.social.instagram },
  ];

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground relative">
      {/* Main Footer */}
      <Container>
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link
                href={routes.home(lang)}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-primary">
                  <Image
                    src="/logo-white.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-primary-foreground">
                    {siteSettings.name}
                  </h3>
                  {siteSettings.shortName && (
                    <p className="text-primary-foreground/70 text-sm">
                      {siteSettings.shortName}
                    </p>
                  )}
                </div>
              </Link>
              <p className="text-primary-foreground/70 mb-6 max-w-sm">
                {siteSettings.description}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors text-primary-foreground"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-serif font-semibold text-primary-foreground mb-4">
                {institut.title}
              </h4>
              <ul className="space-y-3">
                {institut.links.map((link) => (
                  <li key={link.label}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-primary-foreground mb-4">
                {centri.title}
              </h4>
              <ul className="space-y-3">
                {centri.links.map((link) => (
                  <li key={link.label}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-primary-foreground mb-4">
                {resursi.title}
              </h4>
              <ul className="space-y-3">
                {resursi.links.map((link) => (
                  <li key={link.label}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <Container>
          <div className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-primary-foreground/60 text-sm text-center md:text-left">
                © {new Date().getFullYear()} {siteSettings.name}. Sva prava
                zadržana.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
                >
                  Politika privatnosti
                </Link>
                <Link
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
                >
                  Uslovi korištenja
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Scroll to Top */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        onClick={scrollToTop}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
}
