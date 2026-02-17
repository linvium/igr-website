'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Container } from '@/components/layout';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { routes, type Language } from '@/lib';
import type { ContactPageConfig } from '@/services/list-pages.service';

interface ContactSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  contactPageConfig?: ContactPageConfig;
}

export function ContactSection({
  lang,
  title,
  description,
  contactPageConfig,
}: ContactSectionProps) {
  const siteSettings = useSiteSettings();
  const config = contactPageConfig;

  const displayTitle = title || config?.title || 'Kontaktirajte nas';
  const displayDescription =
    description || config?.description || 'Imate pitanja ili želite saradnju? Javite nam se.';

  const workingHoursLines = config?.workingHours
    ? config.workingHours
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    : ['Pon - Pet: 08:00 - 16:00', 'Sub - Ned: Zatvoreno'];

  const contactInfo = [
    {
      icon: MapPin,
      title: config?.addressLabel || 'Adresa',
      lines: [siteSettings.contact.address],
    },
    {
      icon: Phone,
      title: config?.phoneLabel || 'Telefon',
      lines: [siteSettings.contact.phone],
    },
    {
      icon: Mail,
      title: config?.emailLabel || 'E-mail',
      lines: [siteSettings.contact.email],
    },
    {
      icon: Clock,
      title: config?.workingHoursLabel || 'Radno vrijeme',
      lines: workingHoursLines.length > 0 ? workingHoursLines : ['—'],
    },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {config?.title || 'Kontakt'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {displayTitle}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">{displayDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
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
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 card-elevated border border-border/50">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
              {config?.formTitle || 'Pošaljite poruku'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {config?.nameLabel || 'Ime i prezime'}
                  </label>
                  <Input
                    id="name"
                    placeholder={config?.namePlaceholder || 'Vaše ime'}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {config?.formEmailLabel || 'E-mail'}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={config?.emailPlaceholder || 'vasa@email.com'}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {config?.subjectLabel || 'Predmet'}
                </label>
                <Input
                  id="subject"
                  placeholder={config?.subjectPlaceholder || 'Predmet poruke'}
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="h-12"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {config?.messageLabel || 'Poruka'}
                </label>
                <Textarea
                  id="message"
                  placeholder={config?.messagePlaceholder || 'Vaša poruka...'}
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="w-4 h-4" />
                {config?.submitButton || 'Pošalji poruku'}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
