import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button variant="outline" className="w-fit" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Settings
        </Button>

        <Skeleton className="h-8 w-40" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="mt-2 h-5 w-full max-w-lg" />
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </div>
  )
}

