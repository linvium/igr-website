import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Database, Thermometer, Shield, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import geneBankImg from "@/assets/gene-bank.jpg";

const GeneBank = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${geneBankImg})` }}
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
              Banka gena
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Očuvanje genetičkih resursa biljaka kroz dugotrajno skladištenje sjemena i vegetativnog materijala.
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
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">O Banci gena</h2>
                  <div className="section-divider mb-6" />
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Banka gena predstavlja centralno mjesto za ex-situ konzervaciju biljnih genetičkih 
                    resursa u Bosni i Hercegovini. Naša misija je prikupljanje, karakterizacija, 
                    dokumentovanje i dugotrajno očuvanje sjemenskog materijala.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Opremljeni smo najsavremenijom tehnologijom za skladištenje sjemena na niskim 
                    temperaturama (-18°C do -20°C), što omogućava očuvanje vitalnosti sjemena 
                    tokom više decenija.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Banka gena je dio evropske mreže banaka gena AEGIS (A European Genebank 
                    Integrated System) i aktivno sarađuje sa međunarodnim institucijama.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Kolekcije</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: "Žitarice", count: "350+ uzoraka" },
                      { name: "Povrtlarsko bilje", count: "280+ uzoraka" },
                      { name: "Krmno bilje", count: "150+ uzoraka" },
                      { name: "Ljekovito bilje", count: "120+ uzoraka" },
                      { name: "Voćne vrste", count: "90+ uzoraka" },
                      { name: "Autohtone sorte", count: "200+ uzoraka" },
                    ].map((item) => (
                      <div key={item.name} className="bg-secondary/50 rounded-xl p-4">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-primary text-sm font-medium">{item.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {[
                  { icon: Database, title: "Ukupno uzoraka", desc: "1000+ sjemenskih uzoraka" },
                  { icon: Thermometer, title: "Skladištenje", desc: "-18°C do -20°C" },
                  { icon: Shield, title: "Sigurnost", desc: "Duplirani uzorci u sigurnosnoj kopiji" },
                  { icon: Microscope, title: "Laboratorija", desc: "Moderna oprema za testiranje" },
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

export default GeneBank;
