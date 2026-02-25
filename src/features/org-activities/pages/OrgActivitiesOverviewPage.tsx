import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/layout';
import { PageHeader } from '@/components/shared';
import { orgActivitiesSectionRoute, type Language } from '@/lib';
import type { OrgActivitiesPageConfig } from '@/services/org-activities.service';

interface OrgActivitiesOverviewPageProps {
  lang: Language;
  pageConfig: OrgActivitiesPageConfig;
}

export function OrgActivitiesOverviewPage({
  lang,
  pageConfig,
}: OrgActivitiesOverviewPageProps) {
  const cards = pageConfig.overviewCards;

  return (
    <Container>
      <PageHeader
        title={pageConfig.title}
        description={pageConfig.description}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {cards.map((card) => {
          const href = orgActivitiesSectionRoute(lang, card.sectionSlug);
          return (
            <Card
              key={`${card.title}-${card.sectionSlug}`}
              className="card-elevated rounded-[4px] overflow-hidden"
            >
              {card.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {card.description}
                </CardDescription>
                <Button variant="link" className="p-0 h-auto group/btn" asChild>
                  <Link href={href}>
                    {pageConfig.learnMore}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
