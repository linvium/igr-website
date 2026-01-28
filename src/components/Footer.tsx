import { Leaf, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  institut: [
    { name: "O nama", href: "#about" },
    { name: "Tim", href: "#about" },
    { name: "Partneri", href: "#about" },
    { name: "Karijera", href: "#" },
  ],
  centri: [
    { name: "Centar za biodiverzitet", href: "#centers" },
    { name: "Banka gena", href: "#centers" },
    { name: "Botanička bašta", href: "#centers" },
    { name: "Rasadnik", href: "#centers" },
  ],
  resursi: [
    { name: "Projekti", href: "#projects" },
    { name: "Publikacije", href: "#" },
    { name: "Galerija", href: "#gallery" },
    { name: "Novosti", href: "#news" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-primary-foreground relative">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-foreground flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-primary-foreground">
                  Institut za Genetičke Resurse
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  Univerzitet u Banjoj Luci
                </p>
              </div>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Očuvanje biodiverziteta i genetičkih resursa za buduće generacije kroz
              naučna istraživanja i obrazovanje.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
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
              Institut
            </h4>
            <ul className="space-y-3">
              {footerLinks.institut.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-primary-foreground mb-4">
              Centri
            </h4>
            <ul className="space-y-3">
              {footerLinks.centri.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-primary-foreground mb-4">
              Resursi
            </h4>
            <ul className="space-y-3">
              {footerLinks.resursi.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © 2026 Institut za Genetičke Resurse, Univerzitet u Banjoj Luci. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                Politika privatnosti
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                Uslovi korištenja
              </a>
            </div>
          </div>
        </div>
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
