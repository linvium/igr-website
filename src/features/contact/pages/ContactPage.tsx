"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, siteSettings, type Language } from "@/lib"

interface ContactPageProps {
  lang: Language
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresa",
    lines: [siteSettings.contact.address],
  },
  {
    icon: Phone,
    title: "Telefon",
    lines: [siteSettings.contact.phone],
  },
  {
    icon: Mail,
    title: "E-mail",
    lines: [siteSettings.contact.email],
  },
  {
    icon: Clock,
    title: "Radno vrijeme",
    lines: ["Pon - Pet: 08:00 - 16:00", "Sub - Ned: Zatvoreno"],
  },
]

export function ContactPage({ lang }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later
    console.log("Form submitted:", formData)
  }

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: "Kontakt" }]} />
      </div>

      <PageHeader
        title="Kontakt"
        description="Imate pitanja ili želite saradnju? Javite nam se."
      />

      <div className="grid lg:grid-cols-2 gap-12 py-12">
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
                <h3 className="font-serif font-semibold text-foreground mb-2">{item.title}</h3>
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
            <div className="aspect-video bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Mapa će biti dodata kasnije</p>
            </div>
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
    </Container>
  )
}
