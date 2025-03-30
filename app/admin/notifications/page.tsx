"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Eye, Filter, Search, Settings, Trash2, CheckIcon, Calendar, Clock, Map } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotificationsPage() {
  // State for filter options
  const [showFilters, setShowFilters] = useState(false)
  const [filterType, setFilterType] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample notification data
  const notificationsData = [
    {
      id: 1,
      type: "elephant",
      timestamp: "2023-03-30T14:25:00",
      viewed: true,
      message: "Elephant spotted at Watering Hole #2",
      coordinates: "S 19.2356° E 32.5678°"
    },
    {
      id: 2,
      type: "lion",
      timestamp: "2023-03-30T12:05:00",
      viewed: false,
      message: "Lion pride approaching from the east",
      coordinates: "S 19.2311° E 32.5701°"
    },
    {
      id: 3,
      type: "giraffe",
      timestamp: "2023-03-30T09:47:00",
      viewed: false,
      message: "Giraffes feeding near the acacia grove",
      coordinates: "S 19.2401° E 32.5689°"
    },
    {
      id: 4,
      type: "rhino",
      timestamp: "2023-03-29T17:33:00",
      viewed: true,
      message: "Rhino sighting at Watering Hole #1",
      coordinates: "S 19.2378° E 32.5645°"
    }
  ]

  // Filter notifications based on search and filters
  const notifications = notificationsData
    .filter(notification => {
      // Apply type filter if any types are selected
      if (filterType.length > 0 && !filterType.includes(notification.type)) {
        return false
      }
      
      // Apply search filter
      if (searchQuery && !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      return true
    })
    .sort((a, b) => {
      // Sort by timestamp
      if (sortBy === "newest") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      } else {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      }
    })

  // Available animal types for filtering
  const animalTypes = ['elephant', 'lion', 'giraffe', 'rhino', 'zebra', 'buffalo', 'cheetah', 'leopard']

  // Generate a default animal image with fallback
  const getAnimalImage = (type: string) => {
    return {
      src: `/placeholder.jpg`,
      alt: type,
      fallback: type.substring(0, 2).toUpperCase()
    }
  }

  // Handle filter change
  const handleFilterChange = (type: string) => {
    setFilterType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    )
  }

  // Mark notification as viewed
  const markAsViewed = (id: number) => {
    // In a real app, this would update the server
    console.log(`Marked notification ${id} as viewed`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Animal Type</DropdownMenuLabel>
              {animalTypes.map(type => (
                <DropdownMenuCheckboxItem 
                  key={type}
                  checked={filterType.includes(type)}
                  onCheckedChange={() => handleFilterChange(type)}
                  className="capitalize"
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Sort By</DropdownMenuLabel>
              <DropdownMenuCheckboxItem 
                checked={sortBy === "newest"}
                onCheckedChange={() => setSortBy("newest")}
              >
                Newest First
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={sortBy === "oldest"}
                onCheckedChange={() => setSortBy("oldest")}
              >
                Oldest First
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Settings className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notification Settings</DialogTitle>
                <DialogDescription>
                  Configure how and when you receive notifications
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch id="sms-notifications" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly digest</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notifications..."
              className="h-8 w-[150px] sm:w-[180px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="text-xs sm:text-sm">All Notifications</TabsTrigger>
            <TabsTrigger value="unread" className="text-xs sm:text-sm">Unread</TabsTrigger>
            <TabsTrigger value="animals" className="text-xs sm:text-sm">By Animal</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear All</span>
          </Button>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium leading-none">
                    {notification.message}
                  </CardTitle>
                  <CardDescription>
                    {new Date(notification.timestamp).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.viewed && <Badge variant="default">New</Badge>}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => markAsViewed(notification.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted">
                    <Avatar className="h-24 w-24 rounded-md">
                      <AvatarImage 
                        src="/placeholder.jpg" 
                        alt={notification.type} 
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md text-lg">
                        {notification.type.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">
                        Animal Type: <span className="font-medium text-foreground capitalize">{notification.type}</span>
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Coordinates: <span className="font-medium text-foreground">{notification.coordinates}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{notification.message}</DialogTitle>
                            <DialogDescription>
                              {new Date(notification.timestamp).toLocaleString()}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                              <Avatar className="h-full w-full">
                                <AvatarImage 
                                  src="/placeholder.jpg" 
                                  alt={notification.type} 
                                  className="object-cover"
                                />
                                <AvatarFallback className="text-4xl">
                                  {notification.type.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{new Date(notification.timestamp).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{new Date(notification.timestamp).toLocaleTimeString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bell className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Animal Type: <span className="font-medium capitalize">{notification.type}</span></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Map className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Coordinates: {notification.coordinates}</span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button>Send to Guests</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">Send to Guests</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-4">
          {notifications.filter(n => !n.viewed).map((notification) => (
            <Card key={notification.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium leading-none">
                    {notification.message}
                  </CardTitle>
                  <CardDescription>
                    {new Date(notification.timestamp).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">New</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => markAsViewed(notification.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted">
                    <Avatar className="h-24 w-24 rounded-md">
                      <AvatarImage 
                        src="/placeholder.jpg" 
                        alt={notification.type} 
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md text-lg">
                        {notification.type.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">
                        Animal Type: <span className="font-medium text-foreground capitalize">{notification.type}</span>
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Coordinates: <span className="font-medium text-foreground">{notification.coordinates}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Send to Guests</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="animals" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {animalTypes.map(animal => {
              const animalImage = getAnimalImage(animal)
              return (
                <Card key={animal} className="overflow-hidden">
                  <div className="aspect-square bg-muted relative">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage 
                        src="/placeholder.jpg" 
                        alt={animal} 
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-none text-4xl">
                        {animal.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-medium capitalize">{animal}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Notify Guests</span>
                      <Switch id={`animal-${animal}`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 