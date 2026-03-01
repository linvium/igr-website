'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routes, type Language } from '@/lib';

interface ProjectsTabsProps {
  lang: Language;
  projectsTabLabel: string;
  servicesTabLabel: string;
}

export function ProjectsTabs({
  lang,
  projectsTabLabel,
  servicesTabLabel,
}: ProjectsTabsProps) {
  const pathname = usePathname();
  const listHref = routes.projects.list(lang);
  const servicesHref = routes.projects.services(lang);
  const isServicesActive =
    pathname === servicesHref || pathname.startsWith(servicesHref + '/');

  return (
    <Tabs value={isServicesActive ? 'usluge' : 'projekti'} className="mb-8">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="projekti" asChild>
          <Link href={listHref}>{projectsTabLabel}</Link>
        </TabsTrigger>
        <TabsTrigger value="usluge" asChild>
          <Link href={servicesHref}>{servicesTabLabel}</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
