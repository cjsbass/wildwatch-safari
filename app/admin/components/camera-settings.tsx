"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Camera, MapPin, Wifi, WifiOff, MoreHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

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
  },
]

interface CameraSettingsProps {
  initialLodgeId?: string
}

export function CameraSettings({ initialLodgeId }: CameraSettingsProps = {}) {
  const [cameras, setCameras] = useState(initialCameras)
  const [filteredCameras, setFilteredCameras] = useState(initialCameras)
  const [selectedLodge, setSelectedLodge] = useState<string>(initialLodgeId || "all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCamera, setCurrentCamera] = useState<any>(null)
  const [newCamera, setNewCamera] = useState({
    name: "",
    lodgeId: initialLodgeId || "",
    location: "",
    description: "",
    type: "standard",
    connectionType: "rtsp",
    rtspUrl: "",
    username: "admin",
    password: "",
    resolution: "1080p",
    frameRate: 15,
    nightVision: true,
    recordingEnabled: true,
    ptzEnabled: false,
    aiDetection: true,
    ipAddress: "",
    rtspPort: "554",
    streamPath: "stream1",
    onvifPort: "80",
    onvifProfile: "main",
    onvifUsername: "admin",
    onvifPassword: "",
    httpUrl: "",
    streamFormat: "mjpeg",
    authMethod: "none",
    httpUsername: "",
    httpPassword: "",
    integrationType: "hikvision",
    apiEndpoint: "",
    apiKey: "",
    customParams: "",
    wifiNetwork: "",
    wifiPassword: "",
    subnetMask: "",
    gateway: "",
    dns: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    if (selectedLodge === "all") {
      setFilteredCameras(cameras)
    } else {
      setFilteredCameras(cameras.filter((camera) => camera.lodgeId === selectedLodge))
    }
  }, [selectedLodge, cameras])

  useEffect(() => {
    if (initialLodgeId) {
      setSelectedLodge(initialLodgeId)
      setNewCamera((prev) => ({ ...prev, lodgeId: initialLodgeId }))
    }
  }, [initialLodgeId])

  const handleAddCamera = () => {
    const camera = {
      id: Date.now().toString(),
      name: newCamera.name,
      lodgeId: newCamera.lodgeId,
      location: newCamera.location,
      description: newCamera.description,
      type: newCamera.type,
      status: "online",
      lastActivity: new Date().toISOString(),
      batteryLevel: 100,
      connectionType: newCamera.connectionType,
      rtspUrl: newCamera.rtspUrl,
      username: newCamera.username,
      password: newCamera.password,
      resolution: newCamera.resolution,
      frameRate: newCamera.frameRate,
      nightVision: newCamera.nightVision,
      recordingEnabled: newCamera.recordingEnabled,
      ptzEnabled: newCamera.ptzEnabled,
      aiDetection: newCamera.aiDetection,
      ipAddress: newCamera.ipAddress,
      rtspPort: newCamera.rtspPort,
      streamPath: newCamera.streamPath,
      onvifPort: newCamera.onvifPort,
      onvifProfile: newCamera.onvifProfile,
      onvifUsername: newCamera.onvifUsername,
      onvifPassword: newCamera.onvifPassword,
      httpUrl: newCamera.httpUrl,
      streamFormat: newCamera.streamFormat,
      authMethod: newCamera.authMethod,
      httpUsername: newCamera.httpUsername,
      httpPassword: newCamera.httpPassword,
      integrationType: newCamera.integrationType,
      apiEndpoint: newCamera.apiEndpoint,
      apiKey: newCamera.apiKey,
      customParams: newCamera.customParams,
      wifiNetwork: newCamera.wifiNetwork,
      wifiPassword: newCamera.wifiPassword,
      subnetMask: newCamera.subnetMask,
      gateway: newCamera.gateway,
      dns: newCamera.dns,
    }
    setCameras([...cameras, camera])
    setNewCamera({
      name: "",
      lodgeId: initialLodgeId || "",
      location: "",
      description: "",
      type: "standard",
      connectionType: "rtsp",
      rtspUrl: "",
      username: "admin",
      password: "",
      resolution: "1080p",
      frameRate: 15,
      nightVision: true,
      recordingEnabled: true,
      ptzEnabled: false,
      aiDetection: true,
      ipAddress: "",
      rtspPort: "554",
      streamPath: "stream1",
      onvifPort: "80",
      onvifProfile: "main",
      onvifUsername: "admin",
      onvifPassword: "",
      httpUrl: "",
      streamFormat: "mjpeg",
      authMethod: "none",
      httpUsername: "",
      httpPassword: "",
      integrationType: "hikvision",
      apiEndpoint: "",
      apiKey: "",
      customParams: "",
      wifiNetwork: "",
      wifiPassword: "",
      subnetMask: "",
      gateway: "",
      dns: "",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Camera added",
      description: `${camera.name} has been added successfully.`,
    })
  }

  const handleEditCamera = () => {
    if (!currentCamera) return
    const updatedCameras = cameras.map((camera) => (camera.id === currentCamera.id ? { ...currentCamera } : camera))
    setCameras(updatedCameras)
    setIsEditDialogOpen(false)
    toast({
      title: "Camera updated",
      description: `${currentCamera.name} has been updated successfully.`,
    })
  }

  const handleDeleteCamera = () => {
    if (!currentCamera) return
    const updatedCameras = cameras.filter((camera) => camera.id !== currentCamera.id)
    setCameras(updatedCameras)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Camera deleted",
      description: `${currentCamera.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const resetAllCameras = () => {
    setCameras([])
    toast({
      title: "All cameras reset",
      description: "All camera data has been reset successfully.",
      variant: "destructive",
    })
  }

  const toggleCameraStatus = (id: string) => {
    const updatedCameras = cameras.map((camera) =>
      camera.id === id ? { ...camera, status: camera.status === "online" ? "offline" : "online" } : camera,
    )
    setCameras(updatedCameras)
    const camera = updatedCameras.find((c) => c.id === id)
    toast({
      title: `Camera ${camera?.status === "online" ? "activated" : "deactivated"}`,
      description: `${camera?.name} is now ${camera?.status}.`,
    })
  }

  const restartCamera = (id: string) => {
    const camera = cameras.find((c) => c.id === id)
    toast({
      title: "Camera restarting",
      description: `${camera?.name} is restarting. This may take a few minutes.`,
    })
  }

  const getLodgeName = (lodgeId: string) => {
    const lodge = lodges.find((l) => l.id === lodgeId)
    return lodge ? lodge.name : "Unknown Lodge"
  }

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Wildlife Cameras</h2>
          <p className="text-muted-foreground">Manage your wildlife detection cameras across all lodges</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {!initialLodgeId && (
            <Select value={selectedLodge} onValueChange={setSelectedLodge}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by lodge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lodges</SelectItem>
                {lodges.map((lodge) => (
                  <SelectItem key={lodge.id} value={lodge.id}>
                    {lodge.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Camera</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[650px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Camera</DialogTitle>
                <DialogDescription>Configure your wildlife detection camera settings.</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basic" className="mt-4">
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

                <TabsContent value="basic" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="camera-name">Camera Name</Label>
                      <Input
                        id="camera-name"
                        value={newCamera.name}
                        onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                        placeholder="e.g. Watering Hole East"
                      />
                    </div>

                    {!initialLodgeId && (
                      <div className="grid gap-2">
                        <Label htmlFor="camera-lodge">Lodge</Label>
                        <Select
                          value={newCamera.lodgeId}
                          onValueChange={(value) => setNewCamera({ ...newCamera, lodgeId: value })}
                        >
                          <SelectTrigger id="camera-lodge">
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
                      <Label htmlFor="camera-location">Location</Label>
                      <Input
                        id="camera-location"
                        value={newCamera.location}
                        onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                        placeholder="e.g. Eastern watering hole, 500m from main lodge"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="camera-type">Camera Type</Label>
                      <Select
                        value={newCamera.type}
                        onValueChange={(value) => setNewCamera({ ...newCamera, type: value })}
                      >
                        <SelectTrigger id="camera-type">
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

                    <div className="grid gap-2">
                      <Label htmlFor="camera-description">Description</Label>
                      <Textarea
                        id="camera-description"
                        value={newCamera.description}
                        onChange={(e) => setNewCamera({ ...newCamera, description: e.target.value })}
                        placeholder="Describe the camera's position and what wildlife it typically captures"
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="connection" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="connectionType">Connection Type</Label>
                      <Select
                        value={newCamera.connectionType}
                        onValueChange={(value) => setNewCamera({ ...newCamera, connectionType: value })}
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

                    {/* RTSP Connection Fields */}
                    {newCamera.connectionType === "rtsp" && (
                      <>
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="rtspUrl">RTSP URL</Label>
                            <div className="text-xs text-muted-foreground">
                              Format: rtsp://username:password@ip-address:port/stream
                            </div>
                          </div>
                          <Input
                            id="rtspUrl"
                            name="rtspUrl"
                            value={newCamera.rtspUrl || ""}
                            onChange={(e) => setNewCamera({ ...newCamera, rtspUrl: e.target.value })}
                            placeholder="rtsp://192.168.1.100:554/stream1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              name="username"
                              value={newCamera.username || "admin"}
                              onChange={(e) => setNewCamera({ ...newCamera, username: e.target.value })}
                              placeholder="admin"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              name="password"
                              value={newCamera.password || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, password: e.target.value })}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="rtspPort">Port</Label>
                            <Input
                              id="rtspPort"
                              name="rtspPort"
                              value={newCamera.rtspPort || "554"}
                              onChange={(e) => setNewCamera({ ...newCamera, rtspPort: e.target.value })}
                              placeholder="554"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="streamPath">Stream Path</Label>
                            <Input
                              id="streamPath"
                              name="streamPath"
                              value={newCamera.streamPath || "stream1"}
                              onChange={(e) => setNewCamera({ ...newCamera, streamPath: e.target.value })}
                              placeholder="stream1"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* ONVIF Connection Fields */}
                    {newCamera.connectionType === "onvif" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="ipAddress">IP Address</Label>
                          <Input
                            id="ipAddress"
                            name="ipAddress"
                            value={newCamera.ipAddress || ""}
                            onChange={(e) => setNewCamera({ ...newCamera, ipAddress: e.target.value })}
                            placeholder="192.168.1.100"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="onvifPort">Port</Label>
                            <Input
                              id="onvifPort"
                              name="onvifPort"
                              value={newCamera.onvifPort || "80"}
                              onChange={(e) => setNewCamera({ ...newCamera, onvifPort: e.target.value })}
                              placeholder="80"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="onvifProfile">Profile</Label>
                            <Select
                              value={newCamera.onvifProfile || "main"}
                              onValueChange={(value) => setNewCamera({ ...newCamera, onvifProfile: value })}
                            >
                              <SelectTrigger id="onvifProfile">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="main">Main Profile</SelectItem>
                                <SelectItem value="sub">Sub Profile</SelectItem>
                                <SelectItem value="third">Third Stream</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="onvifUsername">Username</Label>
                            <Input
                              id="onvifUsername"
                              name="onvifUsername"
                              value={newCamera.onvifUsername || "admin"}
                              onChange={(e) => setNewCamera({ ...newCamera, onvifUsername: e.target.value })}
                              placeholder="admin"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="onvifPassword">Password</Label>
                            <Input
                              id="onvifPassword"
                              type="password"
                              name="onvifPassword"
                              value={newCamera.onvifPassword || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, onvifPassword: e.target.value })}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* HTTP Stream Connection Fields */}
                    {newCamera.connectionType === "http" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="httpUrl">HTTP URL</Label>
                          <Input
                            id="httpUrl"
                            name="httpUrl"
                            value={newCamera.httpUrl || ""}
                            onChange={(e) => setNewCamera({ ...newCamera, httpUrl: e.target.value })}
                            placeholder="http://192.168.1.100/video.mjpg"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="streamFormat">Stream Format</Label>
                          <Select
                            value={newCamera.streamFormat || "mjpeg"}
                            onValueChange={(value) => setNewCamera({ ...newCamera, streamFormat: value })}
                          >
                            <SelectTrigger id="streamFormat">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mjpeg">MJPEG</SelectItem>
                              <SelectItem value="h264">H.264</SelectItem>
                              <SelectItem value="h265">H.265</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="authMethod">Authentication Method</Label>
                          <Select
                            value={newCamera.authMethod || "none"}
                            onValueChange={(value) => setNewCamera({ ...newCamera, authMethod: value })}
                          >
                            <SelectTrigger id="authMethod">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="basic">Basic Auth</SelectItem>
                              <SelectItem value="digest">Digest Auth</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {newCamera.authMethod && newCamera.authMethod !== "none" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="httpUsername">Username</Label>
                              <Input
                                id="httpUsername"
                                name="httpUsername"
                                value={newCamera.httpUsername || ""}
                                onChange={(e) => setNewCamera({ ...newCamera, httpUsername: e.target.value })}
                                placeholder="admin"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="httpPassword">Password</Label>
                              <Input
                                id="httpPassword"
                                type="password"
                                name="httpPassword"
                                value={newCamera.httpPassword || ""}
                                onChange={(e) => setNewCamera({ ...newCamera, httpPassword: e.target.value })}
                                placeholder="••••••••"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Custom Integration Fields */}
                    {newCamera.connectionType === "custom" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="integrationType">Integration Type</Label>
                          <Select
                            value={newCamera.integrationType || "hikvision"}
                            onValueChange={(value) => setNewCamera({ ...newCamera, integrationType: value })}
                          >
                            <SelectTrigger id="integrationType">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hikvision">Hikvision API</SelectItem>
                              <SelectItem value="dahua">Dahua API</SelectItem>
                              <SelectItem value="axis">Axis API</SelectItem>
                              <SelectItem value="custom">Custom API</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="apiEndpoint">API Endpoint</Label>
                          <Input
                            id="apiEndpoint"
                            name="apiEndpoint"
                            value={newCamera.apiEndpoint || ""}
                            onChange={(e) => setNewCamera({ ...newCamera, apiEndpoint: e.target.value })}
                            placeholder="https://api.example.com/cameras"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="apiKey">API Key/Token</Label>
                          <Input
                            id="apiKey"
                            name="apiKey"
                            value={newCamera.apiKey || ""}
                            onChange={(e) => setNewCamera({ ...newCamera, apiKey: e.target.value })}
                            placeholder="your-api-key-here"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="customParams">Custom Parameters</Label>
                          <Textarea
                            id="customParams"
                            name="customParams"
                            value={newCamera.customParams || ""}
                            onChange={(e) => setNewCamera({ ...newCamera, customParams: e.target.value })}
                            placeholder="param1=value1&#10;param2=value2"
                            rows={3}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter one parameter per line in key=value format
                          </p>
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
                              value={newCamera.wifiNetwork || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, wifiNetwork: e.target.value })}
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
                              value={newCamera.wifiPassword || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, wifiPassword: e.target.value })}
                              placeholder="••••••••"
                              className="w-2/3"
                            />
                          </div>

                          {newCamera.connectionType !== "onvif" && newCamera.connectionType !== "rtsp" && (
                            <div className="flex items-center justify-between">
                              <Label htmlFor="ipAddress" className="text-sm">
                                IP Address
                              </Label>
                              <Input
                                id="ipAddress"
                                name="ipAddress"
                                value={newCamera.ipAddress || ""}
                                onChange={(e) => setNewCamera({ ...newCamera, ipAddress: e.target.value })}
                                placeholder="192.168.1.100"
                                className="w-2/3"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <Label htmlFor="subnetMask" className="text-sm">
                              Subnet Mask
                            </Label>
                            <Input
                              id="subnetMask"
                              name="subnetMask"
                              value={newCamera.subnetMask || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, subnetMask: e.target.value })}
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
                              value={newCamera.gateway || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, gateway: e.target.value })}
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
                              value={newCamera.dns || ""}
                              onChange={(e) => setNewCamera({ ...newCamera, dns: e.target.value })}
                              placeholder="8.8.8.8"
                              className="w-2/3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="resolution">Video Resolution</Label>
                      <Select
                        value={newCamera.resolution || "1080p"}
                        onValueChange={(value) => setNewCamera({ ...newCamera, resolution: value })}
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
                      <Label htmlFor="frame-rate">Frame Rate</Label>
                      <Select
                        value={String(newCamera.frameRate || 15)}
                        onValueChange={(value) => setNewCamera({ ...newCamera, frameRate: Number.parseInt(value) })}
                      >
                        <SelectTrigger id="frame-rate">
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

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="night-vision">Night Vision</Label>
                        <p className="text-sm text-muted-foreground">Enable infrared night vision capability</p>
                      </div>
                      <Switch
                        id="night-vision"
                        checked={newCamera.nightVision !== undefined ? newCamera.nightVision : true}
                        onCheckedChange={(checked) => setNewCamera({ ...newCamera, nightVision: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="recording-enabled">Recording</Label>
                        <p className="text-sm text-muted-foreground">Enable continuous or motion-triggered recording</p>
                      </div>
                      <Switch
                        id="recording-enabled"
                        checked={newCamera.recordingEnabled !== undefined ? newCamera.recordingEnabled : true}
                        onCheckedChange={(checked) => setNewCamera({ ...newCamera, recordingEnabled: checked })}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ptz-enabled">PTZ Controls</Label>
                        <p className="text-sm text-muted-foreground">Enable Pan-Tilt-Zoom camera controls</p>
                      </div>
                      <Switch
                        id="ptz-enabled"
                        checked={newCamera.ptzEnabled || false}
                        onCheckedChange={(checked) => setNewCamera({ ...newCamera, ptzEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-detection">AI Wildlife Detection</Label>
                        <p className="text-sm text-muted-foreground">Use AI to detect and classify wildlife species</p>
                      </div>
                      <Switch
                        id="ai-detection"
                        checked={newCamera.aiDetection !== undefined ? newCamera.aiDetection : true}
                        onCheckedChange={(checked) => setNewCamera({ ...newCamera, aiDetection: checked })}
                      />
                    </div>

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
                        Set up custom notification rules based on animal species, time of day, and other factors. This
                        can be configured after adding the camera.
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
                  disabled={!newCamera.name || (!initialLodgeId && !newCamera.lodgeId) || !newCamera.location}
                >
                  Add Camera
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {cameras.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Camera className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No cameras added yet</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Add your first wildlife camera to start detecting animals.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Camera
            </Button>
          </CardContent>
        </Card>
      ) : filteredCameras.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Camera className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No cameras for this lodge</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">This lodge doesn't have any cameras yet.</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Camera
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="rounded-md border">
            <div className="divide-y">
              {filteredCameras.map((camera) => (
                <div key={camera.id} className="p-2 hover:bg-muted/50 flex gap-2">
                  {/* Video preview */}
                  <div className="relative w-24 h-16 bg-black rounded-sm overflow-hidden flex-shrink-0">
                    {camera.status === "online" ? (
                      <>
                        <img
                          src={`/placeholder.svg?height=64&width=96&text=Live`}
                          alt={`${camera.name} live stream`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0.5 left-0.5 bg-black/70 text-white text-[8px] px-1 py-0.5 rounded-sm flex items-center">
                          <span className="w-1 h-1 rounded-full bg-red-500 mr-0.5"></span>
                          LIVE
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-muted-foreground text-[10px]">Offline</div>
                      </div>
                    )}
                  </div>

                  {/* Camera info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-medium text-xs truncate">{camera.name}</h3>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1 py-0 ${
                            camera.status === "online"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                          }`}
                        >
                          {camera.status}
                        </Badge>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="text-xs"
                            onClick={() => {
                              setCurrentCamera(camera)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs" onClick={() => toggleCameraStatus(camera.id)}>
                            {camera.status === "online" ? (
                              <>
                                <WifiOff className="mr-2 h-3 w-3" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Wifi className="mr-2 h-3 w-3" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive text-xs"
                            onClick={() => {
                              setCurrentCamera(camera)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-start gap-1 mt-0.5">
                      <MapPin className="h-2.5 w-2.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-[10px] text-muted-foreground truncate">{camera.location}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="outline" className="bg-background capitalize text-[10px] px-1 py-0">
                        {camera.type}
                      </Badge>
                      <div className="text-[10px]">
                        <span className="text-muted-foreground">Batt:</span> {camera.batteryLevel}%
                      </div>
                      <div className="text-[10px] text-muted-foreground ml-auto">
                        {formatLastActivity(camera.lastActivity).split(" ")[0]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reset Camera Data</CardTitle>
              <CardDescription>Remove all cameras and their associated data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This action will permanently delete all your camera data and cannot be undone. All detection settings
                and historical data will also be removed.
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Reset All Cameras</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete all your camera data and remove all
                      associated detection settings.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive" onClick={resetAllCameras}>
                      Yes, Reset Everything
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </>
      )}

      {/* Edit Camera Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl h-[650px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Camera</DialogTitle>
            <DialogDescription>Update the details for your wildlife detection camera.</DialogDescription>
          </DialogHeader>
          {currentCamera && (
            <>
              <Tabs defaultValue="basic" className="mt-4">
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

                <TabsContent value="basic" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-camera-name">Camera Name</Label>
                      <Input
                        id="edit-camera-name"
                        value={currentCamera.name}
                        onChange={(e) => setCurrentCamera({ ...currentCamera, name: e.target.value })}
                      />
                    </div>

                    {!initialLodgeId && (
                      <div className="grid gap-2">
                        <Label htmlFor="edit-camera-lodge">Lodge</Label>
                        <Select
                          value={currentCamera.lodgeId}
                          onValueChange={(value) => setCurrentCamera({ ...currentCamera, lodgeId: value })}
                        >
                          <SelectTrigger id="edit-camera-lodge">
                            <SelectValue />
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
                      <Label htmlFor="edit-camera-location">Location</Label>
                      <Input
                        id="edit-camera-location"
                        value={currentCamera.location}
                        onChange={(e) => setCurrentCamera({ ...currentCamera, location: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-camera-type">Camera Type</Label>
                      <Select
                        value={currentCamera.type}
                        onValueChange={(value) => setCurrentCamera({ ...currentCamera, type: value })}
                      >
                        <SelectTrigger id="edit-camera-type">
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

                    <div className="grid gap-2">
                      <Label htmlFor="edit-camera-description">Description</Label>
                      <Textarea
                        id="edit-camera-description"
                        value={currentCamera.description}
                        onChange={(e) => setCurrentCamera({ ...currentCamera, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="connection" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-connectionType">Connection Type</Label>
                      <Select
                        value={currentCamera.connectionType || "rtsp"}
                        onValueChange={(value) => setCurrentCamera({ ...currentCamera, connectionType: value })}
                      >
                        <SelectTrigger id="edit-connectionType">
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

                    {/* RTSP Connection Fields */}
                    {currentCamera.connectionType === "rtsp" && (
                      <>
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="edit-rtspUrl">RTSP URL</Label>
                            <div className="text-xs text-muted-foreground">
                              Format: rtsp://username:password@ip-address:port/stream
                            </div>
                          </div>
                          <Input
                            id="edit-rtspUrl"
                            name="rtspUrl"
                            value={currentCamera.rtspUrl || ""}
                            onChange={(e) => setCurrentCamera({ ...currentCamera, rtspUrl: e.target.value })}
                            placeholder="rtsp://192.168.1.100:554/stream1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-username">Username</Label>
                            <Input
                              id="edit-username"
                              name="username"
                              value={currentCamera.username || "admin"}
                              onChange={(e) => setCurrentCamera({ ...currentCamera, username: e.target.value })}
                              placeholder="admin"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-password">Password</Label>
                            <Input
                              id="edit-password"
                              type="password"
                              name="password"
                              value={currentCamera.password || ""}
                              onChange={(e) => setCurrentCamera({ ...currentCamera, password: e.target.value })}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* ONVIF Connection Fields */}
                    {currentCamera.connectionType === "onvif" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-ipAddress">IP Address</Label>
                          <Input
                            id="edit-ipAddress"
                            name="ipAddress"
                            value={currentCamera.ipAddress || ""}
                            onChange={(e) => setCurrentCamera({ ...currentCamera, ipAddress: e.target.value })}
                            placeholder="192.168.1.100"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-onvifUsername">Username</Label>
                            <Input
                              id="edit-onvifUsername"
                              name="onvifUsername"
                              value={currentCamera.onvifUsername || "admin"}
                              onChange={(e) => setCurrentCamera({ ...currentCamera, onvifUsername: e.target.value })}
                              placeholder="admin"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-onvifPassword">Password</Label>
                            <Input
                              id="edit-onvifPassword"
                              type="password"
                              name="onvifPassword"
                              value={currentCamera.onvifPassword || ""}
                              onChange={(e) => setCurrentCamera({ ...currentCamera, onvifPassword: e.target.value })}
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* HTTP Stream Connection Fields */}
                    {currentCamera.connectionType === "http" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-httpUrl">HTTP URL</Label>
                          <Input
                            id="edit-httpUrl"
                            name="httpUrl"
                            value={currentCamera.httpUrl || ""}
                            onChange={(e) => setCurrentCamera({ ...currentCamera, httpUrl: e.target.value })}
                            placeholder="http://192.168.1.100/video.mjpg"
                          />
                        </div>
                      </>
                    )}

                    {/* Custom Integration Fields */}
                    {currentCamera.connectionType === "custom" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-apiEndpoint">API Endpoint</Label>
                          <Input
                            id="edit-apiEndpoint"
                            name="apiEndpoint"
                            value={currentCamera.apiEndpoint || ""}
                            onChange={(e) => setCurrentCamera({ ...currentCamera, apiEndpoint: e.target.value })}
                            placeholder="https://api.example.com/cameras"
                          />
                        </div>
                      </>
                    )}

                    <div className="grid gap-4 mt-4">
                      <div className="grid gap-2">
                        <Label>Network Configuration</Label>
                        <div className="rounded-md border p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="edit-wifiNetwork" className="text-sm">
                              WiFi Network
                            </Label>
                            <Input
                              id="edit-wifiNetwork"
                              name="wifiNetwork"
                              value={currentCamera.wifiNetwork || ""}
                              onChange={(e) => setCurrentCamera({ ...currentCamera, wifiNetwork: e.target.value })}
                              placeholder="Network SSID"
                              className="w-2/3"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="edit-wifiPassword" className="text-sm">
                              WiFi Password
                            </Label>
                            <Input
                              id="edit-wifiPassword"
                              name="wifiPassword"
                              type="password"
                              value={currentCamera.wifiPassword || ""}
                              onChange={(e) => setCurrentCamera({ ...currentCamera, wifiPassword: e.target.value })}
                              placeholder="••••••••"
                              className="w-2/3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-resolution">Video Resolution</Label>
                      <Select
                        value={currentCamera.resolution || "1080p"}
                        onChange={(value) => setCurrentCamera({ ...currentCamera, resolution: value })}
                      >
                        <SelectTrigger id="edit-resolution">
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
                      <Label htmlFor="edit-frameRate">Frame Rate</Label>
                      <Select
                        value={String(currentCamera.frameRate || 15)}
                        onValueChange={(value) =>
                          setCurrentCamera({ ...currentCamera, frameRate: Number.parseInt(value) })
                        }
                      >
                        <SelectTrigger id="edit-frameRate">
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

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="edit-nightVision">Night Vision</Label>
                        <p className="text-sm text-muted-foreground">Enable infrared night vision capability</p>
                      </div>
                      <Switch
                        id="edit-nightVision"
                        checked={currentCamera.nightVision !== undefined ? currentCamera.nightVision : true}
                        onCheckedChange={(checked) => setCurrentCamera({ ...currentCamera, nightVision: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="edit-recordingEnabled">Recording</Label>
                        <p className="text-sm text-muted-foreground">Enable continuous or motion-triggered recording</p>
                      </div>
                      <Switch
                        id="edit-recordingEnabled"
                        checked={currentCamera.recordingEnabled !== undefined ? currentCamera.recordingEnabled : true}
                        onCheckedChange={(checked) => setCurrentCamera({ ...currentCamera, recordingEnabled: checked })}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 min-h-[400px]">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="edit-ptzEnabled">PTZ Controls</Label>
                        <p className="text-sm text-muted-foreground">Enable Pan-Tilt-Zoom camera controls</p>
                      </div>
                      <Switch
                        id="edit-ptzEnabled"
                        checked={currentCamera.ptzEnabled || false}
                        onCheckedChange={(checked) => setCurrentCamera({ ...currentCamera, ptzEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="edit-aiDetection">AI Wildlife Detection</Label>
                        <p className="text-sm text-muted-foreground">Use AI to detect and classify wildlife species</p>
                      </div>
                      <Switch
                        id="edit-aiDetection"
                        checked={currentCamera.aiDetection !== undefined ? currentCamera.aiDetection : true}
                        onCheckedChange={(checked) => setCurrentCamera({ ...currentCamera, aiDetection: checked })}
                      />
                    </div>

                    <div className="rounded-md border p-4 space-y-4">
                      <h4 className="text-sm font-medium">Detection Zones</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure specific areas of the camera view to monitor for wildlife activity.
                      </p>
                    </div>

                    <div className="rounded-md border p-4 space-y-4">
                      <h4 className="text-sm font-medium">Notification Rules</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up custom notification rules based on animal species, time of day, and other factors.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditCamera}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Camera Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Camera</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this camera? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentCamera && (
            <div className="py-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">{currentCamera.name}</h4>
                {!initialLodgeId && (
                  <p className="text-sm text-muted-foreground">{getLodgeName(currentCamera.lodgeId)}</p>
                )}
                <p className="text-sm text-muted-foreground">{currentCamera.location}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCamera}>
              Delete Camera
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

