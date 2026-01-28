import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/layout"

export function GalleryListSkeleton() {
  return (
    <Container>
      {/* Breadcrumbs */}
      <div className="py-8">
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Filters */}
      <div className="py-8">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-card rounded-2xl overflow-hidden border">
            <Skeleton className="h-64 w-full" />
            <div className="p-6 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
