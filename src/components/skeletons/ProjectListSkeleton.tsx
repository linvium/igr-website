import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/layout"

export function ProjectListSkeleton() {
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

      {/* Search */}
      <div className="py-8">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-6 py-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card rounded-2xl p-6 md:p-8 border">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
