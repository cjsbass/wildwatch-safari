"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Edit, Trash2, Camera, Plus, X, PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for lodges
const initialLodges = [
  {
    id: "1",
    name: "Savanna Sunrise Lodge",
    location: "Serengeti National Park, Tanzania",
    description: "Our flagship property with 20 luxury tents overlooking the eastern plains.",
    cameraCount: 4,
  },
  {
    id: "2",
    name: "Riverside Retreat",
    location: "Kruger National Park, South Africa",
    description: "Boutique lodge with 12 rooms situated along the Sabie River.",
    cameraCount: 3,
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
  {
    id: "4",
    name: "Watering Hole West",
    lodgeId: "1",
    location: "Western watering hole, 800m from main lodge",
    description: "Popular spot for rhinos and buffalo in the late afternoon",
    type: "standard",
    status: "online",
    lastActivity: "2023-03-29T10:15:00Z",
    batteryLevel: 92,
  },
  {
    id: "5",
    name: "Unallocated Camera",
    lodgeId: null,
    location: "Not assigned to any lodge",
    description: "Camera ready to be assigned to a lodge",
    type: "standard",
    status: "offline",
    lastActivity: "2023-03-25T14:30:00Z",
    batteryLevel: 50,
  },
]

export function LodgeSettings() {
  const [lodges, setLodges] = useState(initialLodges)
  const [cameras, setCameras] = useState(initialCameras)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLodge, setCurrentLodge] = useState<any>(null)
  const [newLodge, setNewLodge] = useState({
    name: "",
    location: "",
    description: "",
  })
  const [activeTab, setActiveTab] = useState("details")
  const { toast } = useToast()

  const handleAddLodge = () => {
    const lodge = {
      id: Date.now().toString(),
      name: newLodge.name,
      location: newLodge.location,
      description: newLodge.description,
      cameraCount: 0,
    }
    setLodges([...lodges, lodge])
    setNewLodge({ name: "", location: "", description: "" })
    setIsAddDialogOpen(false)
    toast({
      title: "Lodge added",
      description: `${lodge.name} has been added successfully.`,
    })
  }

  const handleEditLodge = () => {
    if (!currentLodge) return
    const updatedLodges = lodges.map((lodge) => (lodge.id === currentLodge.id ? { ...currentLodge } : lodge))
    setLodges(updatedLodges)
    setIsEditDialogOpen(false)
    toast({
      title: "Lodge updated",
      description: `${currentLodge.name} has been updated successfully.`,
    })
  }

  const handleDeleteLodge = () => {
    if (!currentLodge) return

    // Unassign all cameras from this lodge
    const updatedCameras = cameras.map((camera) =>
      camera.lodgeId === currentLodge.id ? { ...camera, lodgeId: null } : camera,
    )
    setCameras(updatedCameras)

    // Delete the lodge
    const updatedLodges = lodges.filter((lodge) => lodge.id !== currentLodge.id)
    setLodges(updatedLodges)
    setIsDeleteDialogOpen(false)
    toast({
      title: "Lodge deleted",
      description: `${currentLodge.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const resetAllLodges = () => {
    // Unassign all cameras
    const resetCameras = cameras.map((camera) => ({ ...camera, lodgeId: null }))
    setCameras(resetCameras)

    // Remove all lodges
    setLodges([])
    toast({
      title: "All lodges reset",
      description: "All lodge data has been reset successfully.",
      variant: "destructive",
    })
  }

  const getLodgeCameras = (lodgeId) => {
    return cameras.filter((camera) => camera.lodgeId === lodgeId)
  }

  const getUnallocatedCameras = () => {
    return cameras.filter((camera) => camera.lodgeId === null)
  }

  const assignCameraToLodge = (cameraId, lodgeId) => {
    const updatedCameras = cameras.map((camera) => (camera.id === cameraId ? { ...camera, lodgeId } : camera))
    setCameras(updatedCameras)

    // Update camera count for lodges
    updateLodgeCameraCounts(updatedCameras)

    toast({
      title: "Camera assigned",
      description: `Camera has been assigned to the lodge successfully.`,
    })
  }

  const unassignCameraFromLodge = (cameraId, lodgeName) => {
    const updatedCameras = cameras.map((camera) => (camera.id === cameraId ? { ...camera, lodgeId: null } : camera))
    setCameras(updatedCameras)

    // Update camera count for lodges
    updateLodgeCameraCounts(updatedCameras)

    toast({
      title: "Camera unassigned",
      description: `Camera has been removed from ${lodgeName}.`,
    })
  }

  const updateLodgeCameraCounts = (updatedCameras) => {
    const newLodges = lodges.map((lodge) => {
      const count = updatedCameras.filter((camera) => camera.lodgeId === lodge.id).length
      return { ...lodge, cameraCount: count }
    })
    setLodges(newLodges)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Lodges</h2>
          <p className="text-muted-foreground">Manage your safari lodges and their details</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Lodge</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lodge</DialogTitle>
              <DialogDescription>Enter the details for your new safari lodge.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Lodge Name</Label>
                <Input
                  id="name"
                  value={newLodge.name}
                  onChange={(e) => setNewLodge({ ...newLodge, name: e.target.value })}
                  placeholder="e.g. Savanna Sunrise Lodge"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newLodge.location}
                  onChange={(e) => setNewLodge({ ...newLodge, location: e.target.value })}
                  placeholder="e.g. Serengeti National Park, Tanzania"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newLodge.description}
                  onChange={(e) => setNewLodge({ ...newLodge, description: e.target.value })}
                  placeholder="Describe your lodge, its features, and surroundings..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLodge} disabled={!newLodge.name || !newLodge.location}>
                Add Lodge
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {lodges.length === 0 ? (
        <div className="rounded-md border border-dashed p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <MapPin className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No lodges added yet</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Add your first safari lodge to start setting up wildlife cameras.
          </p>
          <Button
            variant="outline"
            className="border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Lodge
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {lodges.map((lodge) => (
              <Card key={lodge.id} className="overflow-hidden border">
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{lodge.name}</h3>
                    <div className="flex gap-2">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          setCurrentLodge(lodge)
                          setIsEditDialogOpen(true)
                          setActiveTab("details")
                        }}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setCurrentLodge(lodge)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{lodge.location}</span>
                  </div>

                  <p className="mb-6 text-sm text-muted-foreground">{lodge.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="rounded-md bg-muted px-3 py-1 text-sm">
                      {lodge.cameraCount} {lodge.cameraCount === 1 ? "Camera" : "Cameras"}
                    </div>
                    <a
                      href={`/admin/settings/cameras?lodge=${lodge.id}`}
                      className="flex items-center gap-2 rounded-md bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-200"
                    >
                      <Camera className="h-4 w-4" />
                      Manage Cameras
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-md border p-6">
            <h3 className="text-xl font-bold">Reset Lodge Data</h3>
            <p className="mt-2 text-muted-foreground">Remove all lodges and their associated camera data</p>

            <p className="mt-4 text-sm text-muted-foreground">
              This action will permanently delete all your lodge data and cannot be undone. All associated cameras will
              also be removed.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="mt-6">
                  Reset All Lodges
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete all your lodge data and remove all
                    associated cameras.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={resetAllLodges}>
                    Yes, Reset Everything
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}

      {/* Edit Lodge Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Lodge</DialogTitle>
            <DialogDescription>Update the details for your safari lodge.</DialogDescription>
          </DialogHeader>
          {currentLodge && (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-2 mb-4 bg-muted/50 p-1">
                  <TabsTrigger value="details" className="data-[state=active]:bg-background">
                    Lodge Details
                  </TabsTrigger>
                  <TabsTrigger value="cameras" className="data-[state=active]:bg-background">
                    Manage Cameras
                  </TabsTrigger>
                </TabsList>

                <div className="h-[450px] overflow-auto">
                  <TabsContent value="details" className="mt-0 h-full">
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Lodge Name</Label>
                        <Input
                          id="edit-name"
                          value={currentLodge.name}
                          onChange={(e) => setCurrentLodge({ ...currentLodge, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                          id="edit-location"
                          value={currentLodge.location}
                          onChange={(e) => setCurrentLodge({ ...currentLodge, location: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={currentLodge.description}
                          onChange={(e) => setCurrentLodge({ ...currentLodge, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <Separator className="my-2" />

                      <div>
                        <h3 className="text-lg font-medium mb-2">View Cameras</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Cameras currently assigned to {currentLodge.name}
                        </p>

                        <div className="rounded-md border">
                          {getLodgeCameras(currentLodge.id).length === 0 ? (
                            <div className="text-center py-2 text-muted-foreground text-xs">
                              No cameras assigned to this lodge yet
                            </div>
                          ) : (
                            <div className="divide-y">
                              {getLodgeCameras(currentLodge.id).map((camera) => (
                                <div key={camera.id} className="p-2 flex gap-2">
                                  {/* Video preview */}
                                  <div className="relative w-20 h-12 bg-black rounded-sm overflow-hidden flex-shrink-0">
                                    {camera.status === "online" ? (
                                      <>
                                        <img
                                          src={`/placeholder.svg?height=48&width=80&text=Live`}
                                          alt={`${camera.name} live stream`}
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-0.5 left-0.5 bg-black/70 text-white text-[8px] px-1 py-0 rounded-sm flex items-center">
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
                                    <div className="flex items-center gap-1">
                                      <h4 className="font-medium text-xs">{camera.name}</h4>
                                      <Badge variant="outline" className="capitalize text-[10px] px-1 py-0">
                                        {camera.type}
                                      </Badge>
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
                                    <p className="text-[10px] text-muted-foreground truncate">{camera.location}</p>
                                  </div>

                                  <a
                                    href={`/admin/settings/cameras?lodge=${currentLodge.id}`}
                                    className="text-safari-leaf hover:underline text-[10px] font-medium self-center"
                                  >
                                    View
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveTab("cameras")}
                            className="text-safari-leaf border-safari-leaf hover:bg-safari-leaf/10"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Manage Cameras
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cameras" className="mt-0 h-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Assigned Cameras</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Cameras currently assigned to {currentLodge.name}
                        </p>

                        <div className="rounded-md border">
                          {getLodgeCameras(currentLodge.id).length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              No cameras assigned to this lodge yet
                            </div>
                          ) : (
                            <div className="divide-y">
                              {getLodgeCameras(currentLodge.id).map((camera) => (
                                <div key={camera.id} className="p-4 flex items-center justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium">{camera.name}</h4>
                                      <Badge variant="outline" className="capitalize">
                                        {camera.type}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={
                                          camera.status === "online"
                                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                                        }
                                      >
                                        {camera.status}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{camera.location}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => unassignCameraFromLodge(camera.id, currentLodge.name)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Unallocated Cameras</h3>
                        <p className="text-sm text-muted-foreground mb-4">Cameras not assigned to any lodge</p>

                        <div className="rounded-md border">
                          {getUnallocatedCameras().length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              No unallocated cameras available
                            </div>
                          ) : (
                            <div className="divide-y">
                              {getUnallocatedCameras().map((camera) => (
                                <div key={camera.id} className="p-4 flex items-center justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium">{camera.name}</h4>
                                      <Badge variant="outline" className="capitalize">
                                        {camera.type}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={
                                          camera.status === "online"
                                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                                        }
                                      >
                                        {camera.status}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{camera.location}</p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-safari-leaf border-safari-leaf hover:bg-safari-leaf/10"
                                    onClick={() => assignCameraToLodge(camera.id, currentLodge.id)}
                                  >
                                    <PlusCircle className="h-4 w-4 mr-1" />
                                    Assign
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditLodge}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Lodge Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lodge</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lodge? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentLodge && (
            <div className="py-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">{currentLodge.name}</h4>
                <p className="text-sm text-muted-foreground">{currentLodge.location}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="rounded-md bg-muted px-2 py-1 text-xs">
                    {currentLodge.cameraCount} {currentLodge.cameraCount === 1 ? "Camera" : "Cameras"}
                  </div>
                  {currentLodge.cameraCount > 0 && (
                    <div className="rounded-md bg-amber-100 px-2 py-1 text-xs text-amber-700">
                      Will be unassigned (not deleted)
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLodge}>
              Delete Lodge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

