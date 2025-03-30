"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, MapPin, MoreHorizontal, Plus, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Mock data for lodges
const lodges = [
  {
    id: "1",
    name: "Savanna Sunrise Lodge",
    location: "Serengeti National Park, Tanzania",
  },
  {
    id: "2",
    name: "Riverside Retreat",
    location: "Kruger National Park, South Africa",
  },
]

// Mock data for cameras
const initialCameras = [
  {
    id: "1",
    name: "Watering Hole East",
    lodgeId: "1",
    location: "Eastern watering hole, 500m from main lodge",
    description: "Covers the main elephant gathering spot, active mostly at dawn and dusk",
    type: "thermal",
    status: "online",
    lastActivity: "2023-03-28T14:30:00Z",
    batteryLevel: 85,
    connectionType: "rtsp",
    rtspUrl: "rtsp://192.168.1.100:554/stream1",
    username: "admin",
    password: "••••••••",
    resolution: "1080p",
    frameRate: 15,
    motionSensitivity: 70,
    nightVision: true,
    recordingEnabled: true,
    recordingRetention: 7,
    ptzEnabled: false,
  },
  {
    id: "2",
    name: "Acacia Tree View",
    lodgeId: "1",
    location: "Large acacia near the southern boundary",
    description: "Excellent for spotting leopards and other tree-climbing predators",
    type: "standard",
    status: "online",
    lastActivity: "2023-03-29T08:15:00Z",
    batteryLevel: 72,
    connectionType: "rtsp",
    rtspUrl: "rtsp://192.168.1.101:554/stream1",
    username: "admin",
    password: "••••••••",
    resolution: "720p",
    frameRate: 10,
    motionSensitivity: 60,
    nightVision: true,
    recordingEnabled: true,
    recordingRetention: 5,
    ptzEnabled: false,
  },
  {
    id: "3",
    name: "River Crossing",
    lodgeId: "2",
    location: "Main river crossing point, 1.2km west",
    description: "Positioned to capture wildebeest and zebra crossings during migration season",
    type: "thermal",
    status: "offline",
    lastActivity: "2023-03-27T19:45:00Z",
    batteryLevel: 12,
    connectionType: "rtsp",
    rtspUrl: "rtsp://192.168.1.102:554/stream1",
    username: "admin",
    password: "••••••••",
    resolution: "1080p",
    frameRate: 15,
    motionSensitivity: 80,
    nightVision: true,
    recordingEnabled: true,
    recordingRetention: 7,
    ptzEnabled: true,
  },
]

// New camera default values
const defaultNewCamera = {
  name: "",
  lodgeId: "",
  location: "",
  description: "",
  type: "standard",
  connectionType: "rtsp",
  rtspUrl: "",
  username: "admin",
  password: "",
  resolution: "1080p",
  frameRate: 15,
  motionSensitivity: 70,
  nightVision: true,
  recordingEnabled: true,
  recordingRetention: 7,
  ptzEnabled: false,
  aiDetection: true,
  aiSensitivity: 75,
  wifiNetwork: "",
  wifiPassword: "",
  ipAddress: "",
  subnetMask: "",
  gateway: "",
  dns: "",
}

export default function CamerasPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const lodgeId = searchParams.get("lodge")
  const [lodge, setLodge] = useState<any>(null)
  const [cameras, setCameras] = useState(initialCameras)
  const [filteredCameras, setFilteredCameras] = useState<any[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCamera, setNewCamera] = useState({ ...defaultNewCamera })
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    if (lodgeId) {
      const foundLodge = lodges.find((l) => l.id === lodgeId)
      setLodge(foundLodge || null)
      setFilteredCameras(cameras.filter((camera) => camera.lodgeId === lodgeId))
      setNewCamera((prev) => ({ ...prev, lodgeId: lodgeId }))
    } else {
      setFilteredCameras(cameras)
    }
  }, [lodgeId, cameras])

  const handleBack = () => {
    router.push("/admin/settings")
  }

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString)
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "")
  }

  const handleAddCamera = () => {
    const camera = {
      id: Date.now().toString(),
      ...newCamera,
      status: "online",
      lastActivity: new Date().toISOString(),
      batteryLevel: 100,
    }
    setCameras([...cameras, camera])
    setNewCamera({ ...defaultNewCamera, lodgeId: lodgeId || "" })
    setIsAddDialogOpen(false)
    setActiveTab("basic")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCamera((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewCamera((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setNewCamera((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setNewCamera((prev) => ({ ...prev, [name]: value[0] }))
  }

  if (lodgeId && !lodge) {
    return (
      <div className="py-6">
        <div className="rounded-md bg-muted/50 p-8 text-center">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h2 className="mt-4 text-xl font-semibold">No Lodge Selected</h2>
          <p className="mt-2 text-muted-foreground">Please select a lodge to manage its cameras</p>
          <Button className="mt-6" onClick={handleBack}>
            Go to Lodge Settings
          </Button>
        </div>
      </div>
    )
  }

  const getLodgeName = (lodgeId: string | null) => {
    if (!lodgeId) return "Unassigned";
    const lodge = lodges.find(l => l.id === lodgeId);
    return lodge ? lodge.name : "Unknown";
  }

  if (lodge) {
    return (
      <div className="py-6">
        <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 mb-8">
          <Camera className="h-4 w-4" />
          {lodge.name}
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold">{lodge.name} Cameras</h2>
          <p className="text-muted-foreground mt-2">
            Manage cameras for {lodge.name} at {lodge.location}
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Wildlife Cameras</h3>
            <p className="text-muted-foreground">Manage your wildlife detection cameras across all lodges</p>
          </div>
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) {
                setActiveTab("basic")
                setNewCamera({ ...defaultNewCamera, lodgeId: lodgeId || "" })
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Camera
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Camera</DialogTitle>
                <DialogDescription>Configure your wildlife detection camera settings.</DialogDescription>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-4 mb-4 bg-muted/50 p-1">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-background">
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="connection" className="data-[state=active]:bg-background">
                    Connection
                  </TabsTrigger>
                  <TabsTrigger value="video" className="data-[state=active]:bg-background">
                    Video Settings
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
                    Advanced
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Camera Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newCamera.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Watering Hole East"
                      />
                    </div>

                    {!lodgeId && (
                      <div className="grid gap-2">
                        <Label htmlFor="lodgeId">Lodge</Label>
                        <Select value={newCamera.lodgeId} onValueChange={(value) => handleSelectChange("lodgeId", value)}>
                          <SelectTrigger id="lodgeId">
                            <SelectValue placeholder="Select a lodge" />
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
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={newCamera.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Eastern watering hole, 500m from main lodge"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newCamera.description}
                        onChange={handleInputChange}
                        placeholder="Describe the camera's position and what wildlife it typically captures"
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="type">Camera Type</Label>
                      <Select value={newCamera.type} onValueChange={(value) => handleSelectChange("type", value)}>
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="thermal">Thermal</SelectItem>
                          <SelectItem value="infrared">Infrared</SelectItem>
                          <SelectItem value="ptz">PTZ (Pan-Tilt-Zoom)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="connection" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="connectionType">Connection Type</Label>
                      <Select
                        value={newCamera.connectionType}
                        onValueChange={(value) => handleSelectChange("connectionType", value)}
                      >
                        <SelectTrigger id="connectionType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rtsp">RTSP (IP Camera)</SelectItem>
                          <SelectItem value="onvif">ONVIF</SelectItem>
                          <SelectItem value="http">HTTP Stream</SelectItem>
                          <SelectItem value="custom">Custom Integration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {newCamera.connectionType === "rtsp" && (
                      <>
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="rtspUrl">RTSP URL</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The RTSP URL format is typically: rtsp://username:password@ip-address:port/stream
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Input
                            id="rtspUrl"
                            name="rtspUrl"
                            value={newCamera.rtspUrl}
                            onChange={handleInputChange}
                            placeholder="rtsp://192.168.1.100:554/stream1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              name="username"
                              value={newCamera.username}
                              onChange={handleInputChange}
                              placeholder="admin"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={newCamera.password}
                              onChange={handleInputChange}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="grid gap-4 mt-4">
                      <div className="grid gap-2">
                        <Label>Network Configuration</Label>
                        <div className="rounded-md border p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="wifiNetwork" className="text-sm">
                              WiFi Network
                            </Label>
                            <Input
                              id="wifiNetwork"
                              name="wifiNetwork"
                              value={newCamera.wifiNetwork}
                              onChange={handleInputChange}
                              placeholder="Network SSID"
                              className="w-2/3"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="wifiPassword" className="text-sm">
                              WiFi Password
                            </Label>
                            <Input
                              id="wifiPassword"
                              name="wifiPassword"
                              type="password"
                              value={newCamera.wifiPassword}
                              onChange={handleInputChange}
                              placeholder="••••••••"
                              className="w-2/3"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="ipAddress" className="text-sm">
                              IP Address
                            </Label>
                            <Input
                              id="ipAddress"
                              name="ipAddress"
                              value={newCamera.ipAddress}
                              onChange={handleInputChange}
                              placeholder="192.168.1.100"
                              className="w-2/3"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="subnetMask" className="text-sm">
                              Subnet Mask
                            </Label>
                            <Input
                              id="subnetMask"
                              name="subnetMask"
                              value={newCamera.subnetMask}
                              onChange={handleInputChange}
                              placeholder="255.255.255.0"
                              className="w-2/3"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="gateway" className="text-sm">
                              Gateway
                            </Label>
                            <Input
                              id="gateway"
                              name="gateway"
                              value={newCamera.gateway}
                              onChange={handleInputChange}
                              placeholder="192.168.1.1"
                              className="w-2/3"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="dns" className="text-sm">
                              DNS Server
                            </Label>
                            <Input
                              id="dns"
                              name="dns"
                              value={newCamera.dns}
                              onChange={handleInputChange}
                              placeholder="8.8.8.8"
                              className="w-2/3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="resolution">Video Resolution</Label>
                      <Select
                        value={newCamera.resolution}
                        onValueChange={(value) => handleSelectChange("resolution", value)}
                      >
                        <SelectTrigger id="resolution">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="480p">480p (SD)</SelectItem>
                          <SelectItem value="720p">720p (HD)</SelectItem>
                          <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                          <SelectItem value="1440p">1440p (2K)</SelectItem>
                          <SelectItem value="2160p">2160p (4K)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="frameRate">Frame Rate (FPS)</Label>
                      <Select
                        value={newCamera.frameRate.toString()}
                        onValueChange={(value) => handleSelectChange("frameRate", value)}
                      >
                        <SelectTrigger id="frameRate">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 FPS (Low bandwidth)</SelectItem>
                          <SelectItem value="10">10 FPS</SelectItem>
                          <SelectItem value="15">15 FPS (Recommended)</SelectItem>
                          <SelectItem value="24">24 FPS</SelectItem>
                          <SelectItem value="30">30 FPS (High quality)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="motionSensitivity">Motion Detection Sensitivity</Label>
                        <span className="text-sm">{newCamera.motionSensitivity}%</span>
                      </div>
                      <Slider
                        id="motionSensitivity"
                        min={0}
                        max={100}
                        step={5}
                        value={[newCamera.motionSensitivity]}
                        onValueChange={(value) => handleSliderChange("motionSensitivity", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low (fewer alerts)</span>
                        <span>High (more alerts)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="nightVision">Night Vision</Label>
                        <p className="text-sm text-muted-foreground">Enable infrared night vision capability</p>
                      </div>
                      <Switch
                        id="nightVision"
                        checked={newCamera.nightVision}
                        onCheckedChange={(checked) => handleSwitchChange("nightVision", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="recordingEnabled">Recording</Label>
                        <p className="text-sm text-muted-foreground">Enable continuous or motion-triggered recording</p>
                      </div>
                      <Switch
                        id="recordingEnabled"
                        checked={newCamera.recordingEnabled}
                        onCheckedChange={(checked) => handleSwitchChange("recordingEnabled", checked)}
                      />
                    </div>

                    {newCamera.recordingEnabled && (
                      <div className="grid gap-2">
                        <Label htmlFor="recordingRetention">Recording Retention (days)</Label>
                        <Select
                          value={newCamera.recordingRetention.toString()}
                          onValueChange={(value) => handleSelectChange("recordingRetention", value)}
                        >
                          <SelectTrigger id="recordingRetention">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ptzEnabled">PTZ Controls</Label>
                        <p className="text-sm text-muted-foreground">Enable Pan-Tilt-Zoom camera controls</p>
                      </div>
                      <Switch
                        id="ptzEnabled"
                        checked={newCamera.ptzEnabled}
                        onCheckedChange={(checked) => handleSwitchChange("ptzEnabled", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="aiDetection">AI Wildlife Detection</Label>
                        <p className="text-sm text-muted-foreground">Use AI to detect and classify wildlife species</p>
                      </div>
                      <Switch
                        id="aiDetection"
                        checked={newCamera.aiDetection}
                        onCheckedChange={(checked) => handleSwitchChange("aiDetection", checked)}
                      />
                    </div>

                    {newCamera.aiDetection && (
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="aiSensitivity">AI Detection Sensitivity</Label>
                          <span className="text-sm">{newCamera.aiSensitivity}%</span>
                        </div>
                        <Slider
                          id="aiSensitivity"
                          min={0}
                          max={100}
                          step={5}
                          value={[newCamera.aiSensitivity]}
                          onValueChange={(value) => handleSliderChange("aiSensitivity", value)}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Conservative (fewer false positives)</span>
                          <span>Aggressive (catch more animals)</span>
                        </div>
                      </div>
                    )}

                    <div className="rounded-md border p-4 space-y-4">
                      <h4 className="text-sm font-medium">Detection Zones</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure specific areas of the camera view to monitor for wildlife activity. This can be set up
                        after adding the camera.
                      </p>
                    </div>

                    <div className="rounded-md border p-4 space-y-4">
                      <h4 className="text-sm font-medium">Notification Rules</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up custom notification rules based on animal species, time of day, and other factors. This can
                        be configured after adding the camera.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCamera}
                  disabled={
                    !newCamera.name ||
                    (!lodgeId && !newCamera.lodgeId) ||
                    !newCamera.location ||
                    (newCamera.connectionType === "rtsp" && !newCamera.rtspUrl)
                  }
                >
                  Add Camera
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {filteredCameras.length === 0 ? (
          <div className="rounded-md border border-dashed p-8 text-center">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No cameras for this lodge</h3>
            <p className="mt-2 text-muted-foreground">This lodge doesn't have any cameras yet.</p>
            <Button
              variant="outline"
              className="mt-6 border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Camera
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredCameras.map((camera) => (
              <div key={camera.id} className="rounded-md border overflow-hidden">
                <div className="p-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-medium">{camera.name}</h3>
                      {camera.status === "online" ? (
                        <div className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0 text-[10px] font-medium text-green-800">
                          Online
                        </div>
                      ) : (
                        <div className="inline-flex items-center rounded-full bg-red-100 px-1.5 py-0 text-[10px] font-medium text-red-800">
                          Offline
                        </div>
                      )}
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        // Open camera details dialog or navigate to camera detail page
                        router.push(`/admin/settings/cameras/${camera.id}?lodge=${lodgeId}`)
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-start gap-1 text-[10px] mb-1.5">
                    <MapPin className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground truncate">{camera.location}</span>
                  </div>

                  {camera.status === "online" ? (
                    <div className="mb-1.5 relative h-24 bg-black rounded-sm overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=96&width=170&text=Live`}
                        alt={`${camera.name} live stream`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0.5 left-0.5 bg-black/70 text-white text-[8px] px-1 py-0.5 rounded-sm flex items-center">
                        <span className="w-1 h-1 rounded-full bg-red-500 mr-0.5"></span>
                        LIVE
                      </div>
                    </div>
                  ) : (
                    <div className="mb-1.5 relative h-24 bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden flex items-center justify-center">
                      <div className="text-muted-foreground text-[10px]">Camera offline</div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <div className="font-medium">{camera.type === "thermal" ? "Thermal" : "Standard"}</div>
                      <div className="text-muted-foreground">Battery: {camera.batteryLevel}%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Last activity:</div>
                      <div className="text-muted-foreground">{formatLastActivity(camera.lastActivity)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-md border p-6">
          <h3 className="text-xl font-bold">Reset Camera Data</h3>
          <p className="mt-2 text-muted-foreground">Remove all cameras and their associated data</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="mt-6">
                Reset All Cameras
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete all your camera data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Yes, Reset Everything</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }

  // If no lodge is selected, show all cameras
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">All Wildlife Cameras</h3>
          <p className="text-muted-foreground">Manage your wildlife detection cameras across all lodges</p>
        </div>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open)
            if (!open) {
              setActiveTab("basic")
              setNewCamera({ ...defaultNewCamera, lodgeId: lodgeId || "" })
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add New Camera
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Camera</DialogTitle>
              <DialogDescription>Configure your wildlife detection camera settings.</DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid grid-cols-4 mb-4 bg-muted/50 p-1">
                <TabsTrigger value="basic" className="data-[state=active]:bg-background">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="connection" className="data-[state=active]:bg-background">
                  Connection
                </TabsTrigger>
                <TabsTrigger value="video" className="data-[state=active]:bg-background">
                  Video Settings
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Camera Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newCamera.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Watering Hole East"
                    />
                  </div>

                  {!lodgeId && (
                    <div className="grid gap-2">
                      <Label htmlFor="lodgeId">Lodge</Label>
                      <Select value={newCamera.lodgeId} onValueChange={(value) => handleSelectChange("lodgeId", value)}>
                        <SelectTrigger id="lodgeId">
                          <SelectValue placeholder="Select a lodge" />
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
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newCamera.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Eastern watering hole, 500m from main lodge"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newCamera.description}
                      onChange={handleInputChange}
                      placeholder="Describe the camera's position and what wildlife it typically captures"
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="type">Camera Type</Label>
                    <Select value={newCamera.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="thermal">Thermal</SelectItem>
                        <SelectItem value="infrared">Infrared</SelectItem>
                        <SelectItem value="ptz">PTZ (Pan-Tilt-Zoom)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="connection" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="connectionType">Connection Type</Label>
                    <Select
                      value={newCamera.connectionType}
                      onValueChange={(value) => handleSelectChange("connectionType", value)}
                    >
                      <SelectTrigger id="connectionType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rtsp">RTSP (IP Camera)</SelectItem>
                        <SelectItem value="onvif">ONVIF</SelectItem>
                        <SelectItem value="http">HTTP Stream</SelectItem>
                        <SelectItem value="custom">Custom Integration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newCamera.connectionType === "rtsp" && (
                    <>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="rtspUrl">RTSP URL</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  The RTSP URL format is typically: rtsp://username:password@ip-address:port/stream
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="rtspUrl"
                          name="rtspUrl"
                          value={newCamera.rtspUrl}
                          onChange={handleInputChange}
                          placeholder="rtsp://192.168.1.100:554/stream1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={newCamera.username}
                            onChange={handleInputChange}
                            placeholder="admin"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={newCamera.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid gap-4 mt-4">
                    <div className="grid gap-2">
                      <Label>Network Configuration</Label>
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="wifiNetwork" className="text-sm">
                            WiFi Network
                          </Label>
                          <Input
                            id="wifiNetwork"
                            name="wifiNetwork"
                            value={newCamera.wifiNetwork}
                            onChange={handleInputChange}
                            placeholder="Network SSID"
                            className="w-2/3"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="wifiPassword" className="text-sm">
                            WiFi Password
                          </Label>
                          <Input
                            id="wifiPassword"
                            name="wifiPassword"
                            type="password"
                            value={newCamera.wifiPassword}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="w-2/3"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="ipAddress" className="text-sm">
                            IP Address
                          </Label>
                          <Input
                            id="ipAddress"
                            name="ipAddress"
                            value={newCamera.ipAddress}
                            onChange={handleInputChange}
                            placeholder="192.168.1.100"
                            className="w-2/3"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="subnetMask" className="text-sm">
                            Subnet Mask
                          </Label>
                          <Input
                            id="subnetMask"
                            name="subnetMask"
                            value={newCamera.subnetMask}
                            onChange={handleInputChange}
                            placeholder="255.255.255.0"
                            className="w-2/3"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="gateway" className="text-sm">
                            Gateway
                          </Label>
                          <Input
                            id="gateway"
                            name="gateway"
                            value={newCamera.gateway}
                            onChange={handleInputChange}
                            placeholder="192.168.1.1"
                            className="w-2/3"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="dns" className="text-sm">
                            DNS Server
                          </Label>
                          <Input
                            id="dns"
                            name="dns"
                            value={newCamera.dns}
                            onChange={handleInputChange}
                            placeholder="8.8.8.8"
                            className="w-2/3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="resolution">Video Resolution</Label>
                    <Select
                      value={newCamera.resolution}
                      onValueChange={(value) => handleSelectChange("resolution", value)}
                    >
                      <SelectTrigger id="resolution">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="480p">480p (SD)</SelectItem>
                        <SelectItem value="720p">720p (HD)</SelectItem>
                        <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                        <SelectItem value="1440p">1440p (2K)</SelectItem>
                        <SelectItem value="2160p">2160p (4K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="frameRate">Frame Rate (FPS)</Label>
                    <Select
                      value={newCamera.frameRate.toString()}
                      onValueChange={(value) => handleSelectChange("frameRate", value)}
                    >
                      <SelectTrigger id="frameRate">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 FPS (Low bandwidth)</SelectItem>
                        <SelectItem value="10">10 FPS</SelectItem>
                        <SelectItem value="15">15 FPS (Recommended)</SelectItem>
                        <SelectItem value="24">24 FPS</SelectItem>
                        <SelectItem value="30">30 FPS (High quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="motionSensitivity">Motion Detection Sensitivity</Label>
                      <span className="text-sm">{newCamera.motionSensitivity}%</span>
                    </div>
                    <Slider
                      id="motionSensitivity"
                      min={0}
                      max={100}
                      step={5}
                      value={[newCamera.motionSensitivity]}
                      onValueChange={(value) => handleSliderChange("motionSensitivity", value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low (fewer alerts)</span>
                      <span>High (more alerts)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="nightVision">Night Vision</Label>
                      <p className="text-sm text-muted-foreground">Enable infrared night vision capability</p>
                    </div>
                    <Switch
                      id="nightVision"
                      checked={newCamera.nightVision}
                      onCheckedChange={(checked) => handleSwitchChange("nightVision", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="recordingEnabled">Recording</Label>
                      <p className="text-sm text-muted-foreground">Enable continuous or motion-triggered recording</p>
                    </div>
                    <Switch
                      id="recordingEnabled"
                      checked={newCamera.recordingEnabled}
                      onCheckedChange={(checked) => handleSwitchChange("recordingEnabled", checked)}
                    />
                  </div>

                  {newCamera.recordingEnabled && (
                    <div className="grid gap-2">
                      <Label htmlFor="recordingRetention">Recording Retention (days)</Label>
                      <Select
                        value={newCamera.recordingRetention.toString()}
                        onValueChange={(value) => handleSelectChange("recordingRetention", value)}
                      >
                        <SelectTrigger id="recordingRetention">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="5">5 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ptzEnabled">PTZ Controls</Label>
                      <p className="text-sm text-muted-foreground">Enable Pan-Tilt-Zoom camera controls</p>
                    </div>
                    <Switch
                      id="ptzEnabled"
                      checked={newCamera.ptzEnabled}
                      onCheckedChange={(checked) => handleSwitchChange("ptzEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="aiDetection">AI Wildlife Detection</Label>
                      <p className="text-sm text-muted-foreground">Use AI to detect and classify wildlife species</p>
                    </div>
                    <Switch
                      id="aiDetection"
                      checked={newCamera.aiDetection}
                      onCheckedChange={(checked) => handleSwitchChange("aiDetection", checked)}
                    />
                  </div>

                  {newCamera.aiDetection && (
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="aiSensitivity">AI Detection Sensitivity</Label>
                        <span className="text-sm">{newCamera.aiSensitivity}%</span>
                      </div>
                      <Slider
                        id="aiSensitivity"
                        min={0}
                        max={100}
                        step={5}
                        value={[newCamera.aiSensitivity]}
                        onValueChange={(value) => handleSliderChange("aiSensitivity", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Conservative (fewer false positives)</span>
                        <span>Aggressive (catch more animals)</span>
                      </div>
                    </div>
                  )}

                  <div className="rounded-md border p-4 space-y-4">
                    <h4 className="text-sm font-medium">Detection Zones</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure specific areas of the camera view to monitor for wildlife activity. This can be set up
                      after adding the camera.
                    </p>
                  </div>

                  <div className="rounded-md border p-4 space-y-4">
                    <h4 className="text-sm font-medium">Notification Rules</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up custom notification rules based on animal species, time of day, and other factors. This can
                      be configured after adding the camera.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddCamera}
                disabled={
                  !newCamera.name ||
                  (!lodgeId && !newCamera.lodgeId) ||
                  !newCamera.location ||
                  (newCamera.connectionType === "rtsp" && !newCamera.rtspUrl)
                }
              >
                Add Camera
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cameras.map((camera) => (
          <div key={camera.id} className="rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-full h-2.5 w-2.5 ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                <h3 className="font-medium">{camera.name}</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                {camera.type}
              </Badge>
            </div>
            <div className="p-4">
              <div className="mb-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground/70" />
                  <span>{camera.location}</span>
                </div>
                <div>Lodge: <span className="font-medium">{getLodgeName(camera.lodgeId)}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Battery</p>
                  <p className="font-medium">{camera.batteryLevel}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Activity</p>
                  <p className="font-medium">{formatLastActivity(camera.lastActivity)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t p-4">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

