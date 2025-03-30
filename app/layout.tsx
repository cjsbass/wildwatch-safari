import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Safari Lodge Wildlife Notifications",
  description: "Get notified when your favorite animals are spotted at the watering hole!",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  )
}



import './globals.css'