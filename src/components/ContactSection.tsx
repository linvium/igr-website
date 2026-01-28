import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresa",
    lines: ["Univerzitet u Banjoj Luci", "Bulevar vojvode Petra Bojovića 1A", "78000 Banja Luka, BiH"],
  },
  {
    icon: Phone,
    title: "Telefon",
    lines: ["+387 51 321 199", "+387 51 321 200"],
  },
  {
    icon: Mail,
    title: "E-mail",
    lines: ["info@igr.unibl.org", "geneticki.resursi@unibl.org"],
  },
  {
    icon: Clock,
    title: "Radno vrijeme",
    lines: ["Pon - Pet: 08:00 - 16:00", "Sub - Ned: Zatvoreno"],
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Kontaktirajte nas
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">
            Imate pitanja ili želite saradnju? Javite nam se.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-2xl p-6 card-elevated border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  {item.lines.map((line, index) => (
                    <p key={index} className="text-muted-foreground text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl overflow-hidden card-elevated border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.5584!2d17.1926!3d44.7722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ2JzIwLjAiTiAxN8KwMTEnMzMuNCJF!5e0!3m2!1sen!2sba!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija Instituta"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 card-elevated border border-border/50">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
              Pošaljite poruku
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Ime i prezime
                  </label>
                  <Input
                    id="name"
                    placeholder="Vaše ime"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vasa@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Predmet
                </label>
                <Input
                  id="subject"
                  placeholder="Predmet poruke"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Poruka
                </label>
                <Textarea
                  id="message"
                  placeholder="Vaša poruka..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="w-4 h-4" />
                Pošalji poruku
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
