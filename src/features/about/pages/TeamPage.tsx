'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs, FilterSelect, PortableTextRenderer } from '@/components/shared';
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
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import type { FilterOption } from '@/components/shared/FilterPills';

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
    return teamSection.members.filter((m) =>
      m.categories.includes(activeFilter),
    );
  }, [teamSection.members, activeFilter]);

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: 'Svi' },
    ...(Object.entries(TEAM_CATEGORY_LABELS) as [TeamCategorySlug, string][]).map(
      ([slug, label]) => ({ value: slug, label }),
    ),
  ];

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

          <div className="mb-8">
            <FilterSelect
              label="Kategorija"
              options={categoryOptions}
              value={activeFilter}
              onValueChange={(v) =>
                setActiveFilter(v as TeamCategorySlug | 'all')
              }
            />
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
      <div className="relative w-full sm:w-48 aspect-square sm:aspect-auto sm:h-48 shrink-0 rounded-lg overflow-hidden bg-muted">
        <Image
          src={member.image || PLACEHOLDER_IMAGE}
          alt={fullName}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, 192px"
        />
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
          {member.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {member.categories.map((slug) => (
                <Badge key={slug} variant="secondary" className="font-normal">
                  {TEAM_CATEGORY_LABELS[slug]}
                </Badge>
              ))}
            </div>
          )}
        </div>
        {member.descriptionBlocks && member.descriptionBlocks.length > 0 ? (
          <PortableTextRenderer
            value={member.descriptionBlocks}
            className="prose prose-lg max-w-none text-muted-foreground mt-2"
          />
        ) : member.description ? (
          <p className="text-muted-foreground leading-relaxed mt-2">
            {member.description}
          </p>
        ) : null}
      </div>
    </li>
  );
}
