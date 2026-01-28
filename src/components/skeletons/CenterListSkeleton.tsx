import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Container } from "@/components/layout"

export function CenterListSkeleton() {
  return (
    <Container>
      {/* Page Header Skeleton */}
      <div className="py-8">
        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-4" />
      </div>

      <div className="mb-8">
        <div className="h-10 w-32 bg-muted rounded animate-pulse mb-4" />
        <div className="h-6 w-full max-w-2xl bg-muted rounded animate-pulse" />
      </div>

      {/* Centers Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="relative h-48 bg-muted animate-pulse" />
            <CardHeader>
              <div className="h-7 w-3/4 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-5 w-24 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
