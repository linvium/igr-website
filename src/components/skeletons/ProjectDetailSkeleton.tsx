import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/layout"

export function ProjectDetailSkeleton() {
  return (
    <Container>
      {/* Breadcrumbs */}
      <div className="py-8">
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Back Button */}
      <Skeleton className="h-10 w-40 mb-6" />

      {/* Hero Image */}
      <Skeleton className="h-96 w-full rounded-2xl mb-12" />

      {/* Page Header */}
      <div className="mb-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full" />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-12 py-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          
          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-video rounded-lg" />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-6 border space-y-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  )
}
