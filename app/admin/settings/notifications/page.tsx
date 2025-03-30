"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { NotificationSettings } from "../../components/notification-settings"

export default function NotificationSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Notification Settings</h1>
        <p className="text-muted-foreground">Configure how and when you receive notifications</p>
      </div>

      <NotificationSettings />
    </div>
  )
} 