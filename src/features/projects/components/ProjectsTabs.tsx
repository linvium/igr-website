'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routes, type Language } from '@/lib';

interface ProjectsTabsProps {
  lang: Language;
  projectsTabLabel: string;
  servicesTabLabel: string;
  /** Direct link to first service - avoids redirect delay when clicking Usluge tab */
  servicesHref?: string;
}

export function ProjectsTabs({
  lang,
  projectsTabLabel,
  servicesTabLabel,
  servicesHref,
}: ProjectsTabsProps) {
  const pathname = usePathname();
  const listHref = routes.projects.list(lang);
  const effectiveServicesHref =
    servicesHref ?? routes.projects.serviceDetail(lang, 'laboratorijske-usluge');
  const isServicesActive =
    pathname === effectiveServicesHref ||
    pathname.startsWith(routes.projects.services(lang) + '/');

  return (
    <Tabs value={isServicesActive ? 'usluge' : 'projekti'} className="mb-8">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="projekti" asChild>
          <Link href={listHref}>{projectsTabLabel}</Link>
        </TabsTrigger>
        <TabsTrigger value="usluge" asChild>
          <Link href={effectiveServicesHref}>{servicesTabLabel}</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
