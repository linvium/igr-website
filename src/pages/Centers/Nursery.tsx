import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Sprout, Package, Handshake, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import nurseryImg from "@/assets/nursery.jpg";

const Nursery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${nurseryImg})` }}
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
              Rasadnik
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Proizvodnja sadnog materijala autohtonih i ugroženih biljnih vrsta za konzervaciju.
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
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">O Rasadniku</h2>
                  <div className="section-divider mb-6" />
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Rasadnik Instituta za genetičke resurse specijalizovan je za proizvodnju 
                    visokokvalitetnog sadnog materijala autohtonih i ugroženih biljnih vrsta. 
                    Naš cilj je očuvanje genetičke raznolikosti kroz ex-situ konzervaciju i 
                    reintrodukciju vrsta u prirodna staništa.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Rasadnik koristi moderne tehnike razmnožavanja, uključujući vegetativno 
                    razmnožavanje, mikrorazmnožavanje i uzgoj iz sjemena, što omogućava 
                    proizvodnju velikog broja sadnica uz očuvanje genetičkog integriteta.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Naše sadnice koriste se u projektima revitalizacije degradiranih staništa, 
                    pošumljavanja i urbanog ozelenjavanja.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Proizvodnja</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: "Šumske sadnice", desc: "Hrast, bukva, javor, lipa..." },
                      { name: "Voćne sadnice", desc: "Autohtone sorte jabuka, krušaka, šljiva" },
                      { name: "Ljekovito bilje", desc: "Tradicioalne ljekovite vrste" },
                      { name: "Ukrasno bilje", desc: "Autohtono cvjetno bilje" },
                      { name: "Zaštićene vrste", desc: "Rijetke i ugrožene biljke" },
                      { name: "Mikrorazmnožavanje", desc: "Laboratorijska proizvodnja" },
                    ].map((item) => (
                      <div key={item.name} className="bg-secondary/50 rounded-xl p-4">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Usluge</h3>
                  <ul className="space-y-4">
                    {[
                      "Prodaja sadnica autohtonih vrsta",
                      "Projektovanje ozelenjavanja sa autohtonim vrstama",
                      "Konsultacije za revitalizaciju staništa",
                      "Edukacija o uzgoju autohtonih biljaka",
                      "Proizvodnja sadnica po narudžbi",
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
                  { icon: Sprout, title: "Godišnja proizvodnja", desc: "50,000+ sadnica" },
                  { icon: Package, title: "Vrste", desc: "100+ autohtonih vrsta" },
                  { icon: Handshake, title: "Partneri", desc: "Šumarstva, općine, NVO" },
                  { icon: Award, title: "Kvalitet", desc: "Certificirani sadni materijal" },
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

export default Nursery;
