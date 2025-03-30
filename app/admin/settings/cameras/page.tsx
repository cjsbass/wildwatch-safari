"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function CamerasRedirectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const lodgeId = searchParams.get('lodge')

  useEffect(() => {
    // If there was a lodge ID parameter, pass it to the new URL
    if (lodgeId) {
      router.replace(`/admin/cameras?tab=management&lodge=${lodgeId}`)
    } else {
      router.replace('/admin/cameras?tab=management')
    }
  }, [router, lodgeId])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Redirecting to the new Cameras page...</p>
    </div>
  )
}

