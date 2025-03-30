"use client"

import type { ReactNode } from "react"
import { AdminSidebar } from "./components/admin-sidebar"
import { AdminHeader } from "./components/admin-header"
import { TopNav } from "./components/top-nav"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"
  const isSettingsPage = pathname === "/admin/settings" || pathname.startsWith("/admin/settings/")

  return (
    <div className="flex min-h-screen flex-col md:flex-row" style={{ backgroundColor: "#f8f7f4" }}>
      {/* Global styles to hide headings */}
      <style jsx global>{`
        /* Hide page headings across admin pages */
        .space-y-6 > div:first-child > h1.text-3xl.font-bold,
        .space-y-6 > div:first-child > p.text-muted-foreground {
          display: none;
        }
      `}</style>
      
      {!isLoginPage && <AdminSidebar />}
      <div className="flex flex-1 flex-col">
        {!isLoginPage && <AdminHeader />}
        <main className="flex-1 p-4 md:p-6">
          {isSettingsPage && (
            <div className="mb-3">
              <TopNav />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

