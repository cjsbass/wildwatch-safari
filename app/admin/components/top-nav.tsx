"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Bell, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const navItems = [
  {
    title: "Lodges",
    href: "/admin/settings",
    icon: Home,
  },
  {
    title: "Cameras",
    href: "/admin/settings/cameras",
    icon: Camera,
  },
  {
    title: "Notifications",
    href: "/admin/settings/notifications",
    icon: Bell,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Account",
    href: "/admin/settings/account",
    icon: User,
  },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <div className="flex justify-start">
      <Tabs defaultValue={getActiveTab(pathname)}>
        <TabsList>
          {navItems.map((item) => (
            <TabsTrigger 
              key={item.href}
              value={item.href}
              asChild
            >
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

// Helper function to determine which tab should be active based on the current pathname
function getActiveTab(pathname: string): string {
  if (pathname.includes('/cameras')) {
    return '/admin/settings/cameras'
  } else if (pathname.includes('/notifications')) {
    return '/admin/settings/notifications'
  } else if (pathname.includes('/users')) {
    return '/admin/users'
  } else if (pathname.includes('/account')) {
    return '/admin/settings/account'
  } else {
    return '/admin/settings'
  }
} 