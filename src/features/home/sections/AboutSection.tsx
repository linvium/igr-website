import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, History, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { routes, type Language } from '@/lib';
import type { AboutFeature, HomePartner } from '@/types/models/home.types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  eye: Eye,
  history: History,
  users: Users,
};

const SLUG_TO_HREF: Record<
  'mission' | 'history' | 'team' | 'partners',
  (lang: Language) => string
> = {
  mission: routes.about.mission,
  history: routes.about.history,
  team: routes.about.team,
  partners: routes.about.partners,
};

interface AboutSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  readMoreButton?: string;
  partnersHeadingLabel?: string;
  allPartnersButtonLabel?: string;
  features?: AboutFeature[];
  partners?: HomePartner[];
}

export function AboutSection({
  lang,
  title,
  description,
  badgeLabel,
  readMoreButton,
  partnersHeadingLabel,
  allPartnersButtonLabel,
  features = [],
  partners = [],
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 botanical-pattern opacity-50" />

      <Container className="relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {badgeLabel && (
            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              {badgeLabel}
            </span>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              {title}
            </h2>
          )}
          <div className="section-divider mb-6" />
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Features Grid */}
        {features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon =
                ICON_MAP[feature.icon?.toLowerCase() || ''] || Target;
              const hrefFn = SLUG_TO_HREF[feature.sectionSlug];
              return (
                <Card
                  key={`${feature.title}-${index}`}
                  className="group card-elevated border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-xl font-serif">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                    {readMoreButton && hrefFn && (
                      <Button
                        variant="link"
                        className="p-0 h-auto group/btn"
                        asChild
                      >
                        <Link href={hrefFn(lang)}>
                          {readMoreButton}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Partners Section */}
        {(partnersHeadingLabel || partners.length > 0) && (
          <div className="mt-20 text-center">
            {partnersHeadingLabel && (
              <h3 className="text-xl font-serif font-semibold text-foreground mb-8">
                {partnersHeadingLabel}
              </h3>
            )}
            {partners.length > 0 && (
              <div className="flex flex-wrap justify-center items-start gap-10 sm:gap-12">
                {partners.map((partner) => (
                  <div
                    key={partner.name || partner.logo}
                    className="flex flex-col items-center gap-3 w-28 sm:w-32 group"
                  >
                    {partner.url ? (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden group-hover:opacity-100 opacity-90 transition-opacity"
                      >
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={96}
                            height={96}
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Logo
                          </span>
                        )}
                      </a>
                    ) : (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden">
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={96}
                            height={96}
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Logo
                          </span>
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium text-muted-foreground text-center">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {allPartnersButtonLabel && (
              <div className="mt-10">
                <Button variant="outline" asChild>
                  <Link href={routes.about.partners(lang)}>
                    {allPartnersButtonLabel}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
