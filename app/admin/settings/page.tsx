"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LodgeSettings } from "../components/lodge-settings"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const pathname = usePathname()
  const router = useRouter()

  // Use CSS to hide the original heading
  return (
    <div>
      <style jsx global>{`
        /* Hide the original heading in the LodgeSettings component */
        .lodge-settings-wrapper h2.text-2xl.font-bold {
          display: none;
        }
        .lodge-settings-wrapper p.text-muted-foreground:first-of-type {
          display: none;
        }
      `}</style>
      
      <div className="lodge-settings-wrapper mt-2">
        <LodgeSettings />
      </div>
    </div>
  )
}

