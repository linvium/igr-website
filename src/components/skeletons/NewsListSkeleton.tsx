import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Container } from "@/components/layout"

export function NewsListSkeleton() {
  return (
    <Container>
      {/* Page Header Skeleton */}
      <div className="py-8">
        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-4" />
      </div>

      <div className="mb-8">
        <div className="h-10 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="h-6 w-full max-w-2xl bg-muted rounded animate-pulse" />
      </div>

      {/* Featured News Skeleton */}
      <div className="py-8">
        <div className="h-8 w-32 bg-muted rounded animate-pulse mb-6" />
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full bg-muted animate-pulse" />
            <div className="p-8 space-y-4">
              <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
              <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters Skeleton */}
      <div className="space-y-6 py-8">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
        <div>
          <div className="h-5 w-24 bg-muted rounded animate-pulse mb-2" />
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-20 bg-muted rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* News Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="relative h-48 bg-muted animate-pulse" />
            <CardHeader>
              <div className="h-5 w-20 bg-muted rounded-full animate-pulse mb-2" />
              <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-8 w-20 bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
