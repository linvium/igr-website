import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import biodiversityImg from "@/assets/biodiversity-center.jpg";
import geneBankImg from "@/assets/gene-bank.jpg";
import protectedAreaImg from "@/assets/protected-area.jpg";
import botanicalGardenImg from "@/assets/botanical-garden.jpg";
import nurseryImg from "@/assets/nursery.jpg";

const centers = [
  {
    id: 1,
    title: "Centar za biodiverzitet",
    description:
      "Istraživanje i dokumentovanje biološke raznolikosti regije, monitoring vrsta i ekosistema.",
    image: biodiversityImg,
    href: "/centri/biodiverzitet",
  },
  {
    id: 2,
    title: "Banka gena",
    description:
      "Očuvanje genetičkih resursa biljaka kroz dugotrajno skladištenje sjemena i vegetativnog materijala.",
    image: geneBankImg,
    href: "/centri/banka-gena",
  },
  {
    id: 3,
    title: 'Zaštićeno područje "Univerzitetski grad"',
    description:
      "Očuvanje i upravljanje zaštićenim prirodnim područjem unutar kampusa Univerziteta.",
    image: protectedAreaImg,
    href: "/centri/zasticeno-podrucje",
  },
  {
    id: 4,
    title: "Botanička bašta",
    description:
      "Živa kolekcija biljaka za naučna istraživanja, obrazovanje i očuvanje rijetkih vrsta.",
    image: botanicalGardenImg,
    href: "/centri/botanicka-basta",
  },
  {
    id: 5,
    title: "Rasadnik",
    description:
      "Proizvodnja sadnog materijala autohtonih i ugroženih biljnih vrsta za konzervaciju.",
    image: nurseryImg,
    href: "/centri/rasadnik",
  },
];

export function CentersSection() {
  return (
    <section id="centers" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Naši centri
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Centri i djelatnosti
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            Kroz pet specijalizovanih centara, radimo na očuvanju i istraživanju
            genetičkih resursa i biodiverziteta.
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {centers.map((center, index) => (
            <div
              key={center.id}
              className={`group bg-card rounded-2xl overflow-hidden card-elevated border border-border/50 ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "h-64 lg:h-80" : "h-48"
                }`}
              >
                <img
                  src={center.image}
                  alt={center.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif font-bold text-primary-foreground">
                    {center.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{center.description}</p>
                <Link to={center.href}>
                  <Button variant="link" className="p-0 h-auto group/btn">
                    Saznaj više
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
