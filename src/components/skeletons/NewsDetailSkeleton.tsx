import { Container } from "@/components/layout"

export function NewsDetailSkeleton() {
  return (
    <Container>
      {/* Breadcrumbs Skeleton */}
      <div className="py-8">
        <div className="flex gap-2">
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-6 w-24 bg-muted rounded-full animate-pulse mb-4" />
          <div className="h-12 w-full bg-muted rounded animate-pulse mb-4" />
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse mb-6" />
          <div className="flex items-center gap-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="h-5 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 bg-muted rounded-lg animate-pulse mb-8" />

        {/* Article Body */}
        <div className="prose prose-lg max-w-none space-y-4 mb-12">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>

        {/* Tags */}
        <div className="mb-12">
          <div className="h-6 w-20 bg-muted rounded animate-pulse mb-4" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 bg-muted rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Related News */}
        <div>
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Container>
  )
}
