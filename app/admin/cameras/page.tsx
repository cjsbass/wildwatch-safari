"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  PlayCircle, 
  History, 
  Settings, 
  Search, 
  Map,
  Activity,
  BarChart,
  Maximize2,
  Minimize2,
  Home,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  Download,
  Share2,
  Star,
  ListFilter,
  MoreVertical,
  Plus,
  ChevronDown
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CameraSettings } from "../components/camera-settings"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample lodge data
const lodges = [
  { id: "1", name: "Savanna Sunrise Lodge" },
  { id: "2", name: "Riverside Retreat" },
  { id: "all", name: "All Lodges" }
];

// Sample camera data
const camerasData = [
  {
    id: "1",
    name: "Watering Hole East",
    lodgeId: "1",
    lodgeName: "Savanna Sunrise Lodge",
    description: "Covers the main elephant gathering spot",
    status: "online",
    thumbnailUrl: "/placeholder.svg?height=200&width=320&text=Camera+1"
  },
  {
    id: "2",
    name: "Acacia Tree View",
    lodgeId: "1",
    lodgeName: "Savanna Sunrise Lodge",
    description: "Excellent for spotting leopards in trees",
    status: "online",
    thumbnailUrl: "/placeholder.svg?height=200&width=320&text=Camera+2"
  },
  {
    id: "3",
    name: "River Crossing",
    lodgeId: "2",
    lodgeName: "Riverside Retreat",
    description: "Positioned to capture wildebeest crossings",
    status: "offline",
    thumbnailUrl: "/placeholder.svg?height=200&width=320&text=Camera+3"
  },
  {
    id: "4",
    name: "Mountain View",
    lodgeId: "2",
    lodgeName: "Riverside Retreat",
    description: "Panoramic view of the mountain range",
    status: "online",
    thumbnailUrl: "/placeholder.svg?height=200&width=320&text=Camera+4"
  },
  {
    id: "5",
    name: "Woodland Trail",
    lodgeId: "1",
    lodgeName: "Savanna Sunrise Lodge",
    description: "Monitors wildlife along the trail",
    status: "online",
    thumbnailUrl: "/placeholder.svg?height=200&width=320&text=Camera+5"
  }
];

export default function CamerasPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const lodgeId = searchParams.get('lodge')
  
  // Default to live tab unless a valid tab is specified in the URL
  const [activeTab, setActiveTab] = useState(
    ['live', 'history', 'management', 'detection', 'map', 'health', 'analytics'].includes(tabParam || '') 
      ? tabParam! 
      : "live"
  )
  
  // State for selected lodge
  const [selectedLodge, setSelectedLodge] = useState<string>(lodgeId || "all")
  
  // State for selected cameras (for multi-select functionality)
  const [selectedCameras, setSelectedCameras] = useState<Record<string, boolean>>(
    camerasData.reduce((acc, camera) => ({ ...acc, [camera.id]: true }), {})
  )
  
  // State for selected animal types (all selected by default)
  const [selectedAnimals, setSelectedAnimals] = useState<Record<string, boolean>>({
    elephant: true,
    lion: true,
    rhino: true,
    buffalo: true,
    leopard: true,
    giraffe: true
  })
  
  // Toggle animal selection
  const toggleAnimalSelection = (animal: string) => {
    setSelectedAnimals(prev => ({
      ...prev,
      [animal]: !prev[animal]
    }))
  }
  
  // State for enlarged camera
  const [enlargedCamera, setEnlargedCamera] = useState<string | null>(null)
  
  // Filter cameras based on selected lodge
  const filteredCameras = camerasData.filter(camera => 
    (selectedLodge === "all" || camera.lodgeId === selectedLodge) && 
    selectedCameras[camera.id]
  )

  // Update the URL when tab changes without causing a full page reload
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('tab', activeTab)
    
    // Keep lodge ID parameter if it exists and not "all"
    if (selectedLodge && selectedLodge !== "all") {
      url.searchParams.set('lodge', selectedLodge)
    } else {
      url.searchParams.delete('lodge')
    }
    
    window.history.pushState({}, '', url.toString())
  }, [activeTab, selectedLodge])
  
  // Toggle camera selection
  const toggleCameraSelection = (cameraId: string) => {
    setSelectedCameras(prev => ({
      ...prev,
      [cameraId]: !prev[cameraId]
    }))
  }
  
  // Toggle camera enlargement
  const toggleCameraEnlargement = (cameraId: string) => {
    setEnlargedCamera(prev => prev === cameraId ? null : cameraId)
  }

  return (
    <div className="space-y-6 pt-6">
      <div>
        <h1 className="text-3xl font-bold">Cameras</h1>
        <p className="text-muted-foreground">
          Monitor and manage your wildlife cameras
        </p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="sticky top-0 z-10 bg-white pb-2 pt-2">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Live View</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Footage History</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
            </TabsTrigger>
            <TabsTrigger value="detection" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Detection</span>
              <Badge className="ml-1 hidden sm:inline" variant="outline">New</Badge>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map View</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Health</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="live" className="space-y-4">
          <div className="rounded-lg border p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1"></div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-48">
                  <Select 
                    value={selectedLodge} 
                    onValueChange={setSelectedLodge}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select lodge" />
                    </SelectTrigger>
                    <SelectContent>
                      {lodges.map((lodge) => (
                        <SelectItem key={lodge.id} value={lodge.id}>
                          {lodge.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => enlargedCamera && setEnlargedCamera(null)}
                  disabled={!enlargedCamera}
                >
                  <Minimize2 className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
            
            {/* Camera selection checkboxes */}
            <div className="flex flex-wrap gap-4 mb-6">
              {camerasData
                .filter(camera => selectedLodge === "all" || camera.lodgeId === selectedLodge)
                .map((camera) => (
                  <div key={`check-${camera.id}`} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`camera-${camera.id}`} 
                      checked={selectedCameras[camera.id]} 
                      onCheckedChange={() => toggleCameraSelection(camera.id)}
                    />
                    <Label htmlFor={`camera-${camera.id}`} className="text-sm">
                      {camera.name}
                    </Label>
                  </div>
                ))
              }
            </div>
            
            {/* Camera grid or enlarged view */}
            {enlargedCamera ? (
              // Enlarged single camera view with small thumbnails below
              <div className="space-y-4">
                {/* Enlarged camera */}
                {camerasData.filter(camera => camera.id === enlargedCamera).map((camera) => (
                  <div key={`enlarged-${camera.id}`} className="space-y-2">
                    <Card className="overflow-hidden">
                      <div 
                        className="aspect-video bg-black relative cursor-pointer" 
                        onClick={() => toggleCameraEnlargement(camera.id)}
                      >
                        <img
                          src={camera.thumbnailUrl}
                          alt={camera.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 text-white">
                            <Minimize2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {camera.status === "online" && (
                          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                            <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                            LIVE
                          </div>
                        )}
                      </div>
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{camera.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Home className="h-3 w-3" />
                              {camera.lodgeName}
                            </CardDescription>
                          </div>
                          <Badge variant={camera.status === "online" ? "outline" : "destructive"}>
                            {camera.status === "online" ? "Online" : "Offline"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{camera.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                
                {/* Other camera thumbnails */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredCameras
                    .filter(camera => camera.id !== enlargedCamera)
                    .map((camera) => (
                      <div
                        key={`thumb-${camera.id}`}
                        className="aspect-video bg-gray-100 rounded-md overflow-hidden relative cursor-pointer border"
                        onClick={() => toggleCameraEnlargement(camera.id)}
                      >
                        <img
                          src={camera.thumbnailUrl}
                          alt={camera.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1">
                          {camera.name}
                        </div>
                        {camera.status === "online" && (
                          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500"></div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              // Grid view of all selected cameras
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCameras.length > 0 ? filteredCameras.map((camera) => (
                  <Card key={camera.id} className="overflow-hidden">
                    <div 
                      className="aspect-video bg-black relative cursor-pointer" 
                      onClick={() => toggleCameraEnlargement(camera.id)}
                    >
                      <img
                        src={camera.thumbnailUrl}
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 text-white">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {camera.status === "online" && (
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                          LIVE
                        </div>
                      )}
                    </div>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{camera.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Home className="h-3 w-3" />
                            {camera.lodgeName}
                          </CardDescription>
                        </div>
                        <Badge variant={camera.status === "online" ? "outline" : "destructive"}>
                          {camera.status === "online" ? "Online" : "Offline"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm">{camera.description}</p>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="col-span-full flex items-center justify-center p-8 border rounded-md">
                    <p className="text-muted-foreground">No cameras selected. Please select at least one camera to view.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="rounded-lg border p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex-1"></div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className={`px-3 h-9 ${selectedAnimals.elephant ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
                      onClick={() => toggleAnimalSelection('elephant')}
                    >
                      <div className="w-3 h-3 rounded-sm bg-green-500 mr-2"></div>
                      Elephant
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`px-3 h-9 ${selectedAnimals.lion ? 'ring-2 ring-amber-500 bg-amber-50' : ''}`}
                      onClick={() => toggleAnimalSelection('lion')}
                    >
                      <div className="w-3 h-3 rounded-sm bg-amber-500 mr-2"></div>
                      Lion
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`px-3 h-9 ${selectedAnimals.rhino ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                      onClick={() => toggleAnimalSelection('rhino')}
                    >
                      <div className="w-3 h-3 rounded-sm bg-purple-500 mr-2"></div>
                      Rhino
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`px-3 h-9 ${selectedAnimals.buffalo ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                      onClick={() => toggleAnimalSelection('buffalo')}
                    >
                      <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
                      Buffalo
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`px-3 h-9 ${selectedAnimals.leopard ? 'ring-2 ring-rose-500 bg-rose-50' : ''}`}
                      onClick={() => toggleAnimalSelection('leopard')}
                    >
                      <div className="w-3 h-3 rounded-sm bg-rose-500 mr-2"></div>
                      Leopard
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`px-3 h-9 ${selectedAnimals.giraffe ? 'ring-2 ring-yellow-500 bg-yellow-50' : ''}`}
                      onClick={() => toggleAnimalSelection('giraffe')}
                    >
                      <div className="w-3 h-3 rounded-sm bg-yellow-500 mr-2"></div>
                      Giraffe
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-1"
                      onClick={() => {
                        const allSelected = Object.values(selectedAnimals).every(v => v);
                        const newState = !allSelected;
                        setSelectedAnimals({
                          elephant: newState,
                          lion: newState,
                          rhino: newState,
                          buffalo: newState,
                          leopard: newState,
                          giraffe: newState
                        });
                      }}
                    >
                      {Object.values(selectedAnimals).every(v => v) ? 'Clear All' : 'Select All'}
                    </Button>
                  </div>
                  
                  <Select defaultValue="all-cameras">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Camera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-cameras">All Cameras</SelectItem>
                      {camerasData.map(camera => (
                        <SelectItem key={camera.id} value={camera.id}>
                          {camera.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Date Range</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Date Range</DialogTitle>
                        <DialogDescription>
                          Choose the start and end dates to filter footage
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input id="start-date" type="date" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <Input id="end-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Apply Range</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Time of Day</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filter by Time of Day</DialogTitle>
                        <DialogDescription>
                          Select specific time periods to view footage
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Time Periods</Label>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="morning" defaultChecked />
                            <label htmlFor="morning" className="text-sm">Morning (05:00 - 11:00)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="afternoon" defaultChecked />
                            <label htmlFor="afternoon" className="text-sm">Afternoon (11:00 - 17:00)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="evening" defaultChecked />
                            <label htmlFor="evening" className="text-sm">Evening (17:00 - 22:00)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="night" defaultChecked />
                            <label htmlFor="night" className="text-sm">Night (22:00 - 05:00)</label>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Custom Time Range</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <Input type="time" placeholder="Start Time" defaultValue="00:00" />
                            <Input type="time" placeholder="End Time" defaultValue="23:59" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Apply Filters</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            {/* Timeline Navigation */}
            <div className="mb-8 border rounded-md p-5 bg-muted/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-medium">Timeline</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-24 text-center">March 31, 2024</span>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="relative h-20 bg-muted/20 rounded-md">
                <div className="absolute inset-x-0 top-0 h-6 flex items-center justify-between px-2 text-xs text-muted-foreground">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
                
                <div className="absolute left-0 right-0 bottom-0 h-14 flex items-end">
                  {/* Timeline event markers */}
                  <div className="absolute left-[15%] bottom-0 h-8 w-1.5 bg-green-500 rounded-t-sm cursor-pointer hover:h-10 transition-all" title="Elephant sighting - 03:42"></div>
                  <div className="absolute left-[28%] bottom-0 h-6 w-1.5 bg-amber-500 rounded-t-sm cursor-pointer hover:h-8 transition-all" title="Lion sighting - 06:51"></div>
                  <div className="absolute left-[34%] bottom-0 h-5 w-1.5 bg-blue-500 rounded-t-sm cursor-pointer hover:h-7 transition-all" title="Buffalo sighting - 08:15"></div>
                  <div className="absolute left-[45%] bottom-0 h-7 w-1.5 bg-green-500 rounded-t-sm cursor-pointer hover:h-9 transition-all" title="Elephant sighting - 10:47"></div>
                  <div className="absolute left-[52%] bottom-0 h-4 w-1.5 bg-rose-500 rounded-t-sm cursor-pointer hover:h-6 transition-all" title="Leopard sighting - 12:33"></div>
                  <div className="absolute left-[62%] bottom-0 h-5 w-1.5 bg-purple-500 rounded-t-sm cursor-pointer hover:h-7 transition-all" title="Rhino sighting - 14:38"></div>
                  <div className="absolute left-[70%] bottom-0 h-7 w-1.5 bg-blue-500 rounded-t-sm cursor-pointer hover:h-9 transition-all" title="Buffalo herd - 16:42"></div>
                  <div className="absolute left-[78%] bottom-0 h-8 w-1.5 bg-green-500 rounded-t-sm cursor-pointer hover:h-10 transition-all" title="Elephant sighting - 18:23"></div>
                  <div className="absolute left-[85%] bottom-0 h-5 w-1.5 bg-rose-500 rounded-t-sm cursor-pointer hover:h-7 transition-all" title="Leopard sighting - 20:17"></div>
                  <div className="absolute left-[92%] bottom-0 h-6 w-1.5 bg-amber-500 rounded-t-sm cursor-pointer hover:h-8 transition-all" title="Lion sighting - 22:15"></div>
                </div>
                
                {/* Current time indicator */}
                <div className="absolute left-[62%] top-0 bottom-0 w-0.5 bg-primary z-10"></div>
              </div>
            </div>
            
            {/* Selected clip view */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              <div className="lg:col-span-3">
                <div className="rounded-md overflow-hidden border">
                  <div className="aspect-video bg-black relative">
                    <img src="/placeholder.svg?height=360&width=640&text=Rhino+Footage" alt="Wildlife footage" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                          <Play className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">00:08 / 00:45</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-purple-500 text-white">Rhino</Badge>
                    </div>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">Watering Hole East</Badge>
                    </div>
                  </div>
                  
                  {/* Video scrubber */}
                  <div className="bg-black px-4 py-2">
                    <div className="relative h-1.5 bg-gray-700 rounded-full">
                      <div className="absolute left-0 top-0 h-full w-[20%] bg-primary rounded-full"></div>
                      <div className="absolute left-[20%] top-0 h-3 w-3 bg-primary rounded-full -translate-y-1/4 cursor-pointer"></div>
                    </div>
                  </div>
                </div>
                
                {/* Related clips */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Related Footage</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="aspect-video rounded-md overflow-hidden border cursor-pointer">
                      <img src="/placeholder.svg?height=120&width=200&text=Rhino" alt="Related rhino footage" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-video rounded-md overflow-hidden border cursor-pointer">
                      <img src="/placeholder.svg?height=120&width=200&text=Rhino" alt="Related rhino footage" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-video rounded-md overflow-hidden border cursor-pointer">
                      <img src="/placeholder.svg?height=120&width=200&text=Rhino" alt="Related rhino footage" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Rhino Sighting</CardTitle>
                        <CardDescription>Captured today at 14:38</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/30">
                        Rhino
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Camera</p>
                          <p className="font-medium">Watering Hole East</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">45 seconds</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Animal</p>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">Rhino</span>
                            <Badge variant="outline" className="text-xs h-5">98% confidence</Badge>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Weather</p>
                          <p className="font-medium">Sunny, 28°C</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">Eastern Watering Hole</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Lodge</p>
                          <p className="font-medium">Savanna Sunrise</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground text-sm mb-1.5">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="secondary">Rhino</Badge>
                          <Badge variant="secondary">Afternoon</Badge>
                          <Badge variant="secondary">Watering Hole</Badge>
                          <Badge variant="secondary">Adult</Badge>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            <Plus className="h-3 w-3 mr-1" /> Add Tag
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground text-sm mb-1.5">Notes</p>
                        <div className="relative">
                          <Textarea 
                            placeholder="Add notes about this sighting..." 
                            className="min-h-[80px] text-sm resize-none"
                            defaultValue="Male rhino spotted drinking at the watering hole. Appears to be the same individual observed last week. Good horn definition visible in the footage."
                          />
                          <Button size="sm" className="absolute bottom-2 right-2">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-1 flex-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1 flex-1">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Share Wildlife Footage</DialogTitle>
                          <DialogDescription>
                            Share this rhino sighting with guests or colleagues
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-3">
                          <Label>Share Link</Label>
                          <div className="flex items-center gap-2">
                            <Input value="https://safari-lodge.com/share/rhino-15432" readOnly className="flex-1" />
                            <Button variant="outline" size="sm">Copy</Button>
                          </div>
                          <div className="grid gap-2">
                            <Label>Share via Email</Label>
                            <Input placeholder="guest@example.com" />
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Checkbox id="include-note" />
                            <label htmlFor="include-note" className="text-sm">Include my notes</label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button>Send</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="gap-1 flex-1">
                      <Star className="h-4 w-4" />
                      <span>Favorite</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Recent clips grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <h3 className="text-lg font-medium">Recent Wildlife Sightings</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="duration">Longest Duration</SelectItem>
                      <SelectItem value="confidence">Highest Confidence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Clip 1 */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Rhino" alt="Rhino footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-500 text-white">Rhino</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">00:45</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Rhino Sighting</h4>
                        <p className="text-xs text-muted-foreground">Today, 14:38</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 2 */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Elephant" alt="Elephant footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">Elephant</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">01:23</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Elephant Group</h4>
                        <p className="text-xs text-muted-foreground">Today, 18:23</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 3 */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Lion" alt="Lion footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-amber-500 text-white">Lion</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">00:52</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Lion Pride</h4>
                        <p className="text-xs text-muted-foreground">Today, 06:51</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 4 */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Elephant" alt="Elephant footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">Elephant</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">01:05</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Elephant at Water</h4>
                        <p className="text-xs text-muted-foreground">Today, 10:47</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 5 - Buffalo */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Buffalo" alt="Buffalo footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500 text-white">Buffalo</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">02:17</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Buffalo Herd</h4>
                        <p className="text-xs text-muted-foreground">Today, 16:42</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 6 - Leopard */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Leopard" alt="Leopard footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-rose-500 text-white">Leopard</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">01:42</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Leopard in Tree</h4>
                        <p className="text-xs text-muted-foreground">Today, 12:33</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 7 - Leopard */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Leopard" alt="Leopard footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-rose-500 text-white">Leopard</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">00:58</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Leopard Hunting</h4>
                        <p className="text-xs text-muted-foreground">Today, 20:17</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Clip 8 - Buffalo */}
                <Card className="overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all">
                  <div className="aspect-video bg-muted relative">
                    <img src="/placeholder.svg?height=180&width=320&text=Buffalo" alt="Buffalo footage" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500 text-white">Buffalo</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-black/50 text-white border-0">01:34</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute inset-0 w-full h-full p-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">Buffalo at River</h4>
                        <p className="text-xs text-muted-foreground">Today, 08:15</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="gap-2">
                  Load More <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <div className="rounded-lg border p-6">
            <CameraSettings initialLodgeId={lodgeId !== "all" ? lodgeId || undefined : undefined} />
          </div>
        </TabsContent>

        <TabsContent value="detection" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Wildlife Detection Settings</h2>
            <p className="text-muted-foreground">
              Configure wildlife detection sensitivity and notification thresholds.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Camera Map View</h2>
            <p className="text-muted-foreground mb-6">
              Geographical display of all cameras with status indicators.
            </p>
            <div className="aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground">Map Display</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Camera Health Monitoring</h2>
            <p className="text-muted-foreground">
              Monitor camera status, battery levels, and connection strength.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Camera 1</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Battery: 85%</p>
                  <p className="text-sm text-muted-foreground">Signal: Strong</p>
                  <p className="text-sm text-muted-foreground">Status: Online</p>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Camera 2</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Battery: 62%</p>
                  <p className="text-sm text-muted-foreground">Signal: Medium</p>
                  <p className="text-sm text-muted-foreground">Status: Online</p>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Camera 3</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Battery: 24%</p>
                  <p className="text-sm text-muted-foreground">Signal: Weak</p>
                  <p className="text-sm text-muted-foreground">Status: Warning</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Wildlife Analytics</h2>
            <p className="text-muted-foreground mb-6">
              View trends, patterns and statistics from wildlife sightings.
            </p>
            <div className="aspect-[3/2] bg-gray-100 rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground">Analytics Charts</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 