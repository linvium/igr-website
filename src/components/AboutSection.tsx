import { Target, Eye, History, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Misija",
    description:
      "Očuvanje i održivo korištenje genetičkih resursa kroz naučna istraživanja, obrazovanje i međunarodnu saradnju.",
  },
  {
    icon: Eye,
    title: "Vizija",
    description:
      "Postati regionalni lider u očuvanju biodiverziteta i genetičkih resursa, prepoznat po izvrsnosti u naučnom radu.",
  },
  {
    icon: History,
    title: "Istorijat",
    description:
      "Osnovan kao dio Univerziteta u Banjoj Luci, Institut ima dugu tradiciju u istraživanju i očuvanju biološke raznolikosti.",
  },
  {
    icon: Users,
    title: "Tim",
    description:
      "Multidisciplinarni tim naučnika, istraživača i stručnjaka posvećenih očuvanju genetičkog naslijeđa.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 botanical-pattern opacity-50" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            O nama
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            O Institutu
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            Institut za genetičke resurse Univerziteta u Banjoj Luci je vodeća
            institucija u regionu za očuvanje biodiverziteta i genetičkih resursa.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 card-elevated border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-8">
            Naši partneri
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["UNBL", "MŠVS", "FAO", "ECPGR", "AEGIS"].map((partner) => (
              <div
                key={partner}
                className="px-6 py-3 bg-secondary rounded-lg text-secondary-foreground font-medium hover:opacity-100 transition-opacity"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
