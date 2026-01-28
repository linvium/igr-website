import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Trees, MapPin, Bird, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import protectedAreaImg from "@/assets/protected-area.jpg";

const ProtectedArea = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${protectedAreaImg})` }}
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
              Zaštićeno područje "Univerzitetski grad"
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Očuvanje i upravljanje zaštićenim prirodnim područjem unutar kampusa Univerziteta.
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
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">O zaštićenom području</h2>
                  <div className="section-divider mb-6" />
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Zaštićeno područje "Univerzitetski grad" predstavlja jedinstveni primjer očuvanja 
                    prirodnog ekosistema unutar urbanog okruženja. Ovo područje služi kao živi 
                    laboratorij za naučna istraživanja i obrazovne aktivnosti.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Na prostoru od preko 50 hektara, područje obuhvata različite tipove staništa 
                    uključujući šumske zajednice, livade, močvarna područja i vodene ekosisteme.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Institut upravlja ovim područjem u skladu sa principima održivog upravljanja, 
                    balansirajući potrebe konzervacije sa obrazovnim i istraživačkim aktivnostima.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Prirodne vrijednosti</h3>
                  <ul className="space-y-4">
                    {[
                      "Autohtone šumske zajednice hrasta i bukve",
                      "Rijetke i zaštićene biljne vrste",
                      "Gnijezdilišta ptica od nacionalnog značaja",
                      "Stanište za ugrožene vrste vodozemaca",
                      "Ekološki koridori za divljač",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Aktivnosti</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Ekološke edukativne staze",
                      "Vođene ture za grupe",
                      "Istraživački rad studenata",
                      "Monitoring divljih vrsta",
                    ].map((item) => (
                      <div key={item} className="bg-secondary/50 rounded-xl p-4">
                        <span className="text-foreground font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Lokacija", desc: "Kampus Univerziteta u Banjoj Luci" },
                  { icon: Trees, title: "Površina", desc: "50+ hektara zaštićenog područja" },
                  { icon: Bird, title: "Biodiverzitet", desc: "150+ vrsta ptica, 300+ vrsta biljaka" },
                  { icon: Camera, title: "Monitoring", desc: "Kontinuirano praćenje ekosistema" },
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

export default ProtectedArea;
