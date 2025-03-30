"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LodgeSettings } from "../components/lodge-settings"
import { UserSettings } from "../components/user-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Users, Camera } from "lucide-react"

export default function SettingsPage() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("lodges")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your system settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 flex space-x-1">
          <TabsTrigger value="lodges" className="data-[state=active]:bg-background flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Lodges</span>
          </TabsTrigger>
          <TabsTrigger value="cameras" className="data-[state=active]:bg-background flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Cameras</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-background flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lodges" className="space-y-6">
          <div className="lodge-settings-wrapper">
            <LodgeSettings />
          </div>
        </TabsContent>

        <TabsContent value="cameras" className="space-y-6">
          <button
            onClick={() => router.push("/admin/settings/cameras")}
            className="text-safari-leaf hover:underline font-medium flex items-center gap-1"
          >
            <Camera className="h-4 w-4" />
            <span>Go to Camera Settings</span>
          </button>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

