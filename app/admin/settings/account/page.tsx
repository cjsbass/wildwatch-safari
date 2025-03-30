"use client"

import { AccountSettings } from "../../components/account-settings"

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings</p>
      </div>

      <AccountSettings />
    </div>
  )
} 