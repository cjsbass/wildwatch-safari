import { Skeleton } from "@/components/ui/skeleton"

export default function CamerasLoading() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-4 w-[250px] mt-2" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        
        <div className="space-y-4">
          <div className="rounded-lg border p-6">
            <Skeleton className="h-6 w-[200px] mb-4" />
            <Skeleton className="h-4 w-full max-w-[400px] mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="aspect-video rounded-md" />
              <Skeleton className="aspect-video rounded-md" />
              <Skeleton className="aspect-video rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 