"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { motion } from "framer-motion"

export default function GuestWelcomePage() {
  const params = useParams()
  const router = useRouter()
  const token = params.token as string

  const handleContinue = () => {
    router.push(`/guest/${token}`)
  }

  const animals = [
    { icon: "🐘", delay: 0 },
    { icon: "🦁", delay: 0.1 },
    { icon: "🦒", delay: 0.2 },
    { icon: "🦏", delay: 0.3 },
    { icon: "🦓", delay: 0.4 },
  ]

  return (
    <div className="min-h-screen safari-pattern">
      <header className="container flex h-16 items-center justify-between py-4">
        <Logo />
      </header>

      <main className="container flex flex-col items-center justify-center py-12">
        <div className="mb-8 flex justify-center">
          {animals.map((animal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animal.delay, duration: 0.5 }}
              className="text-4xl md:text-6xl"
            >
              {animal.icon}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">Welcome to WildWatch!</CardTitle>
              <CardDescription>
                Get real-time notifications when amazing wildlife is spotted at our watering hole
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p>
                Our AI-powered cameras monitor the watering hole 24/7 and can send you WhatsApp notifications when your
                favorite animals appear.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium">How it works:</h3>
                <ol className="mt-2 space-y-2 text-sm text-left">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Select which animals you want to be notified about</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Choose when you want to receive notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Get WhatsApp alerts when those animals are spotted!</span>
                  </li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleContinue}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <footer className="container py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Safari Lodge Wildlife Notifications</p>
      </footer>
    </div>
  )
}

