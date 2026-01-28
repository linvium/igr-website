import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Flower2, BookOpen, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import botanicalGardenImg from "@/assets/botanical-garden.jpg";

const BotanicalGarden = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${botanicalGardenImg})` }}
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
              Botanička bašta
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Živa kolekcija biljaka za naučna istraživanja, obrazovanje i očuvanje rijetkih vrsta.
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
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">O Botaničkoj bašti</h2>
                  <div className="section-divider mb-6" />
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Botanička bašta Instituta za genetičke resurse predstavlja živu kolekciju biljaka 
                    koja služi naučnim istraživanjima, obrazovanju i očuvanju rijetkih i ugroženih vrsta.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Na prostoru od 5 hektara, bašta je organizovana u tematske sekcije koje prikazuju 
                    biljni svijet različitih ekosistema i geografskih područja, sa posebnim naglaskom 
                    na autohtonu floru Bosne i Hercegovine.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Botanička bašta je otvorena za javnost i nudi vođene ture, edukativne programe 
                    za škole i tematske događaje tokom cijele godine.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Kolekcije bašte</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: "Alpska flora", desc: "Biljke visokoplaninskih područja" },
                      { name: "Ljekovito bilje", desc: "Tradicionalne ljekovite biljke" },
                      { name: "Endemiti", desc: "Balkanski i bosanski endemiti" },
                      { name: "Arboretum", desc: "Kolekcija drveća i grmlja" },
                      { name: "Vodeni vrt", desc: "Akvatične i močvarne biljke" },
                      { name: "Sistematska kolekcija", desc: "Biljke po botaničkim porodicama" },
                    ].map((item) => (
                      <div key={item.name} className="bg-secondary/50 rounded-xl p-4">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Programi</h3>
                  <ul className="space-y-4">
                    {[
                      "Vođene ture za grupe i škole",
                      "Radionice iz hortikulture i botanike",
                      "Sezonski događaji i festivali",
                      "Programi za djecu i mlade istraživače",
                      "Volonterski programi",
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
                  { icon: Flower2, title: "Kolekcija", desc: "2000+ vrsta biljaka" },
                  { icon: BookOpen, title: "Edukacija", desc: "5000+ posjetilaca godišnje" },
                  { icon: Globe, title: "Razmjena", desc: "Partner 50+ botaničkih bašti" },
                  { icon: Calendar, title: "Radno vrijeme", desc: "April-Oktobar: 8-18h" },
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

export default BotanicalGarden;
