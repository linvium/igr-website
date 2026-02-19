'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { routes, type Language } from '@/lib';
import type { ContactPageConfig } from '@/services/list-pages.service';

interface ContactPageProps {
  lang: Language;
  pageConfig: ContactPageConfig;
}

export function ContactPage({ lang, pageConfig }: ContactPageProps) {
  const siteSettings = useSiteSettings();
  const workingHoursLines = pageConfig.workingHours
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const contactInfo = [
    {
      icon: MapPin,
      title: pageConfig.addressLabel,
      lines: [siteSettings.contact.address],
    },
    {
      icon: Phone,
      title: pageConfig.phoneLabel,
      lines: [siteSettings.contact.phone],
    },
    {
      icon: Mail,
      title: pageConfig.emailLabel,
      lines: [siteSettings.contact.email],
    },
    {
      icon: Clock,
      title: pageConfig.workingHoursLabel,
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
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: pageConfig.title }]} />
      </div>

      <PageHeader
        title={pageConfig.title}
        description={pageConfig.description}
      />

      <div className="grid lg:grid-cols-2 gap-12 py-8">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-[4px] p-6 card-elevated border border-border/50"
              >
                <div className="w-12 h-12 rounded-[4px] bg-primary/10 flex items-center justify-center mb-4">
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
        <div className="bg-card rounded-[4px] p-8 card-elevated border border-border/50">
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
            {pageConfig.formTitle}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {pageConfig.nameLabel}
                </label>
                <Input
                  id="name"
                  placeholder={pageConfig.namePlaceholder}
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
                  {pageConfig.formEmailLabel}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={pageConfig.emailPlaceholder}
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
                {pageConfig.subjectLabel}
              </label>
              <Input
                id="subject"
                placeholder={pageConfig.subjectPlaceholder}
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
                {pageConfig.messageLabel}
              </label>
              <Textarea
                id="message"
                placeholder={pageConfig.messagePlaceholder}
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              <Send className="w-4 h-4" />
              {pageConfig.submitButton}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
