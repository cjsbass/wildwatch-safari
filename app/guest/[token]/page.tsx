"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { CheckCircle, Send } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

// Sample animal data
const animals = [
  { id: "elephant", name: "Elephant", icon: "🐘" },
  { id: "lion", name: "Lion", icon: "🦁" },
  { id: "giraffe", name: "Giraffe", icon: "🦒" },
  { id: "rhino", name: "Rhino", icon: "🦏" },
  { id: "zebra", name: "Zebra", icon: "🦓" },
  { id: "buffalo", name: "Buffalo", icon: "🐃" },
  { id: "cheetah", name: "Cheetah", icon: "🐆" },
  { id: "hippo", name: "Hippo", icon: "🦛" },
]

export default function GuestDashboardPage() {
  const params = useParams()
  const token = params.token as string

  const [name, setName] = useState("Guest")
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([])
  const [notificationTime, setNotificationTime] = useState("all-day")
  const [isLoading, setIsLoading] = useState(false)
  const [isOnboarded, setIsOnboarded] = useState(false)

  // Simulate fetching guest data
  useEffect(() => {
    // This would be an API call in a real app
    setTimeout(() => {
      setName("Sarah Johnson")
    }, 500)
  }, [token])

  const handleAnimalToggle = (animalId: string) => {
    setSelectedAnimals((prev) => (prev.includes(animalId) ? prev.filter((id) => id !== animalId) : [...prev, animalId]))
  }

  const handleSavePreferences = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsOnboarded(true)
      toast({
        title: "Preferences saved!",
        description: "You'll now receive notifications for your selected animals.",
      })
    }, 1500)
  }

  const handleSendTestNotification = () => {
    // Simulate sending a test notification
    toast({
      title: "Test notification sent!",
      description: "Check your WhatsApp for a test message.",
    })
  }

  return (
    <div className="min-h-screen safari-pattern">
      <header className="container flex h-16 items-center justify-between py-4">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="container py-6">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome, {name}!</CardTitle>
            <CardDescription>Get notified when your favorite animals are spotted at the watering hole</CardDescription>
          </CardHeader>

          {isOnboarded ? (
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-2 text-xl font-semibold">You're all set!</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive WhatsApp notifications when your selected animals are spotted.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Your animal preferences:</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedAnimals.map((animalId) => {
                    const animal = animals.find((a) => a.id === animalId)
                    return (
                      <div key={animalId} className="flex items-center gap-1 rounded-full bg-secondary/20 px-3 py-1">
                        <span>{animal?.icon}</span>
                        <span>{animal?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-medium">Notification time:</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationTime === "all-day"
                    ? "All day (24/7)"
                    : notificationTime === "daylight"
                      ? "Daylight hours only (6 AM - 6 PM)"
                      : "Evening hours only (6 PM - 6 AM)"}
                </p>
              </div>

              <Separator />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsOnboarded(false)}>
                  Edit Preferences
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleSendTestNotification}>
                  <Send className="h-4 w-4" />
                  Send Test Notification
                </Button>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <Tabs defaultValue="animals" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="animals">Animal Preferences</TabsTrigger>
                  <TabsTrigger value="settings">Notification Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="animals" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Select animals you'd like to be notified about:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {animals.map((animal) => (
                        <div key={animal.id} className="flex items-center space-x-2">
                          <Switch
                            id={animal.id}
                            checked={selectedAnimals.includes(animal.id)}
                            onCheckedChange={() => handleAnimalToggle(animal.id)}
                          />
                          <Label htmlFor={animal.id} className="flex items-center gap-2">
                            <span className="text-xl">{animal.icon}</span>
                            {animal.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">When would you like to receive notifications?</h3>
                    <RadioGroup defaultValue="all-day" value={notificationTime} onValueChange={setNotificationTime}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all-day" id="all-day" />
                        <Label htmlFor="all-day">All day (24/7)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daylight" id="daylight" />
                        <Label htmlFor="daylight">Daylight hours only (6 AM - 6 PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">Evening hours only (6 PM - 6 AM)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}

          {!isOnboarded && (
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSavePreferences}
                disabled={selectedAnimals.length === 0 || isLoading}
              >
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          )}
        </Card>
      </main>

      <footer className="container py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Safari Lodge Wildlife Notifications</p>
      </footer>
    </div>
  )
}

