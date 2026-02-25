'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { AboutNavigation } from '../components/AboutNavigation';
import { routes, type Language } from '@/lib';
import type {
  AboutNavItem,
  TeamMember,
  TeamSection,
  TeamCategorySlug,
} from '@/services/about.service';
import { TEAM_CATEGORY_LABELS } from '@/services/about.service';
import { cn } from '@/lib/utils';

interface TeamPageProps {
  lang: Language;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  overviewBreadcrumbLabel: string;
  teamSection: TeamSection;
  navItems: AboutNavItem[];
  navHeading: string;
}

export function TeamPage({
  lang,
  title,
  description,
  breadcrumbLabel,
  overviewBreadcrumbLabel,
  teamSection,
  navItems,
  navHeading,
}: TeamPageProps) {
  const [activeFilter, setActiveFilter] = useState<TeamCategorySlug | 'all'>(
    'all',
  );

  const filteredMembers = useMemo(() => {
    if (activeFilter === 'all') return teamSection.members;
    return teamSection.members.filter((m) => m.category === activeFilter);
  }, [teamSection.members, activeFilter]);

  const categories = Object.entries(TEAM_CATEGORY_LABELS) as [
    TeamCategorySlug,
    string,
  ][];

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: overviewBreadcrumbLabel, href: routes.about.overview(lang) },
            { label: breadcrumbLabel },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-4 gap-12 py-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <AboutNavigation heading={navHeading} items={navItems} />
          </div>
        </aside>

        <div className="lg:col-span-3">
          <PageHeader title={title} description={description} />

          {/* Filter buttons - fixed size to prevent flickering */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={cn(
                'h-9 px-4 rounded-md text-sm font-medium transition-colors',
                'border-2 box-border',
                activeFilter === 'all'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-transparent text-foreground hover:bg-muted/50',
              )}
            >
              Svi
            </button>
            {categories.map(([slug, label]) => (
              <button
                key={slug}
                type="button"
                onClick={() => setActiveFilter(slug)}
                className={cn(
                  'h-9 px-4 rounded-md text-sm font-medium transition-colors',
                  'border-2 box-border',
                  activeFilter === slug
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-transparent text-foreground hover:bg-muted/50',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Team cards */}
          {filteredMembers.length > 0 ? (
            <ul className="space-y-6">
              {filteredMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Nema članova tima u ovoj kategoriji.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const fullName = [member.name, member.surname].filter(Boolean).join(' ');

  return (
    <li
      className={cn(
        'flex flex-col sm:flex-row gap-6 p-6 rounded-lg border border-border bg-card',
        'overflow-hidden',
      )}
    >
      {/* Image - left side */}
      <div className="relative w-full sm:w-48 h-48 sm:h-40 shrink-0 rounded-lg overflow-hidden bg-muted">
        {member.image ? (
          <Image
            src={member.image}
            alt={fullName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 192px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-4xl font-serif">
            {member.name?.[0] || '?'}
          </div>
        )}
      </div>

      {/* Content - right side */}
      <div className="flex-1 min-w-0">
        <div className="mb-2">
          <h3 className="text-xl font-serif font-bold text-foreground">
            {fullName}
          </h3>
          {member.title && (
            <p className="text-primary font-medium">{member.title}</p>
          )}
        </div>
        {member.description && (
          <p className="text-muted-foreground leading-relaxed">
            {member.description}
          </p>
        )}
      </div>
    </li>
  );
}
