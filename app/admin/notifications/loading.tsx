import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-[180px]" />
        </div>
      </div>

      <div className="space-y-1">
        <Skeleton className="h-10 w-[300px]" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="space-y-4">
        {Array(3).fill(null).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-start space-y-0 pb-2">
              <div className="space-y-1 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Skeleton className="h-24 w-24 rounded-md" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 