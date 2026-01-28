import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Leaf, Target, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import biodiversityImg from "@/assets/biodiversity-center.jpg";

const BiodiversityCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${biodiversityImg})` }}
          />
          <div className="absolute inset-0 hero-gradient opacity-90" />
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/#centers">
              <Button variant="ghost" className="text-primary-foreground mb-6 hover:bg-primary-foreground/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nazad na centre
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6">
              Centar za biodiverzitet
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Istraživanje i dokumentovanje biološke raznolikosti regije, monitoring vrsta i ekosistema.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">O Centru</h2>
                  <div className="section-divider mb-6" />
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Centar za biodiverzitet je specijalizovana jedinica Instituta za genetičke resurse 
                    koja se bavi istraživanjem, dokumentovanjem i očuvanjem biološke raznolikosti na 
                    prostoru Bosne i Hercegovine i šire regije.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Naš tim stručnjaka provodi kontinuirane terenske istraživanja, prikuplja podatke 
                    o vrstama i staništima, te razvija strategije za očuvanje ugroženih ekosistema.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Centar sarađuje sa brojnim međunarodnim organizacijama i institucijama u cilju 
                    razmjene znanja i implementacije najboljih praksi u zaštiti biodiverziteta.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Glavne aktivnosti</h3>
                  <ul className="space-y-4">
                    {[
                      "Inventarizacija i monitoring biljnih i životinjskih vrsta",
                      "Mapiranje i procjena stanja staništa",
                      "Izrada crvenih lista i knjiga ugroženih vrsta",
                      "Razvoj programa za očuvanje rijetkih i endemičnih vrsta",
                      "Edukacija i podizanje svijesti o značaju biodiverziteta",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {[
                  { icon: Target, title: "Misija", desc: "Očuvanje biološke raznolikosti kroz nauku" },
                  { icon: Users, title: "Tim", desc: "15+ stručnjaka iz različitih oblasti" },
                  { icon: FileText, title: "Projekti", desc: "20+ aktivnih istraživačkih projekata" },
                  { icon: Leaf, title: "Vrste", desc: "500+ dokumentovanih vrsta" },
                ].map((item) => (
                  <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-serif font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BiodiversityCenter;
