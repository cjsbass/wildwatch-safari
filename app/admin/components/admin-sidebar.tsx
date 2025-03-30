"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, MessageSquare, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Guests",
    href: "/admin/guests",
    icon: Users,
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  
  // Helper function to check if a path is active, including subpaths
  const isPathActive = (path: string) => {
    if (path === "/admin/dashboard" && pathname === "/admin") return true;
    if (path === "/admin/settings" && pathname.startsWith("/admin/settings")) return true;
    return pathname === path;
  }

  const NavContent = () => (
    <div className="flex h-full flex-col gap-2" style={{ backgroundColor: "#f8f7f4" }}>
      <div className="flex h-14 items-center px-4">
        <Logo />
      </div>
      <div className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isPathActive(item.href) 
                  ? "border-2 border-primary text-primary bg-primary/5 font-medium" 
                  : "hover:bg-muted text-gray-600 hover:text-gray-900",
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isPathActive(item.href) ? "text-primary" : "text-gray-500"
              )} />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start gap-2" asChild>
          <Link href="/admin/login">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0" style={{ backgroundColor: "#f8f7f4" }}>
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="hidden w-64 md:block" style={{ backgroundColor: "#f8f7f4" }}>
        <NavContent />
      </div>
    </>
  )
}

