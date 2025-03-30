"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LodgeSettings } from "../components/lodge-settings"

export default function SettingsPage() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your system settings</p>
      </div>

      <div className="lodge-settings-wrapper">
        <LodgeSettings />
      </div>
    </div>
  )
}

