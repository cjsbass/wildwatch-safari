"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function UsersRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin/settings/users')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Redirecting to User Management...</p>
    </div>
  )
} 