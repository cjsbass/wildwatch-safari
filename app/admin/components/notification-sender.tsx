"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Send, CheckCircle, Camera, Users, UserCheck } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample data for wildlife options
const wildlifeOptions = [
  "Elephant",
  "Lion",
  "Rhino",
  "Giraffe",
  "Zebra",
  "Buffalo",
  "Leopard",
  "Cheetah"
];

// Sample data for lodges
const lodges = [
  { id: "1", name: "Savanna Sunrise Lodge" },
  { id: "2", name: "Riverside Retreat" }
];

// Sample data for guests
const guests = [
  { id: "1", name: "Sarah Johnson", lodge: "1", preferences: ["Elephant", "Lion", "Giraffe"], status: "active" },
  { id: "2", name: "Michael Chen", lodge: "1", preferences: ["Elephant", "Rhino"], status: "active" },
  { id: "3", name: "Emma Williams", lodge: "2", preferences: ["Lion", "Giraffe"], status: "active" },
  { id: "4", name: "James Smith", lodge: "2", preferences: ["Elephant", "Rhino", "Buffalo"], status: "active" },
];

// Sample data for staff
const staff = [
  { id: "1", name: "John Smith", role: "administrator", preferences: ["Elephant", "Lion", "Rhino"], status: "active" },
  { id: "2", name: "Sarah Johnson", role: "manager", preferences: ["Elephant", "Lion"], status: "active" },
  { id: "3", name: "Michael Chen", role: "ranger", preferences: ["Elephant"], status: "active" },
  { id: "4", name: "Emma Williams", role: "staff", preferences: ["Giraffe", "Zebra"], status: "inactive" },
];

interface NotificationRecipient {
  id: string;
  name: string;
  preferences: string[];
  status: string;
}

export function NotificationSender() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("compose");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLodge, setSelectedLodge] = useState<string>("");
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [includeStaff, setIncludeStaff] = useState<boolean>(false);
  const [includeGuests, setIncludeGuests] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([]);
  const [attachPhoto, setAttachPhoto] = useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  // Sample cameras for the current lodge
  const cameras = [
    { id: "1", name: "Watering Hole East", lodge: "1" },
    { id: "2", name: "Acacia Tree View", lodge: "1" },
    { id: "3", name: "River Crossing", lodge: "2" },
  ];

  // Update recipients when criteria change
  useEffect(() => {
    let eligibleRecipients: NotificationRecipient[] = [];
    
    // Add eligible guests
    if (includeGuests) {
      eligibleRecipients = [
        ...eligibleRecipients,
        ...guests.filter(guest => 
          guest.status === "active" && 
          guest.preferences.includes(selectedAnimal) && 
          (selectedLodge === "" || guest.lodge === selectedLodge)
        )
      ];
    }
    
    // Add eligible staff
    if (includeStaff) {
      eligibleRecipients = [
        ...eligibleRecipients,
        ...staff.filter(staffMember => 
          staffMember.status === "active" && 
          staffMember.preferences.includes(selectedAnimal)
        )
      ];
    }
    
    setRecipients(eligibleRecipients);
  }, [selectedLodge, selectedAnimal, includeStaff, includeGuests]);

  const handleSendNotification = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Notification sent!",
        description: `Sent to ${recipients.length} recipients.`,
      });
      
      // Reset form
      setMessage("");
      setLocation("");
      setAttachPhoto(false);
      setSelectedCamera("");
      setShowPreview(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Wildlife Notifications</h2>
        <p className="text-muted-foreground">Notify guests and staff about wildlife sightings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="space-y-4">
          <Card className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="animal">Wildlife</Label>
                <Select
                  value={selectedAnimal}
                  onValueChange={setSelectedAnimal}
                >
                  <SelectTrigger id="animal">
                    <SelectValue placeholder="Select animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {wildlifeOptions.map((animal) => (
                      <SelectItem key={animal} value={animal}>
                        {animal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lodge">Lodge (Optional)</Label>
                <Select
                  value={selectedLodge}
                  onValueChange={setSelectedLodge}
                >
                  <SelectTrigger id="lodge">
                    <SelectValue placeholder="All lodges" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All lodges</SelectItem>
                    {lodges.map((lodge) => (
                      <SelectItem key={lodge.id} value={lodge.id}>
                        {lodge.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Near watering hole"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="camera">Attach Camera Photo</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="attachPhoto" 
                    checked={attachPhoto} 
                    onCheckedChange={(checked) => {
                      if (typeof checked === 'boolean') setAttachPhoto(checked);
                    }}
                  />
                  <label
                    htmlFor="attachPhoto"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include latest photo
                  </label>
                </div>
                
                {attachPhoto && (
                  <Select
                    value={selectedCamera}
                    onValueChange={setSelectedCamera}
                    disabled={!selectedLodge}
                  >
                    <SelectTrigger id="camera">
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {cameras
                        .filter(camera => selectedLodge === "" || camera.lodge === selectedLodge)
                        .map((camera) => (
                          <SelectItem key={camera.id} value={camera.id}>
                            {camera.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the wildlife sighting..."
                rows={3}
              />
            </div>
            
            <div className="mt-4 flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notifyGuests" 
                  checked={includeGuests} 
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') setIncludeGuests(checked);
                  }}
                />
                <label
                  htmlFor="notifyGuests"
                  className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <UserCheck className="h-4 w-4" />
                  Notify Guests
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notifyStaff" 
                  checked={includeStaff} 
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') setIncludeStaff(checked);
                  }}
                />
                <label
                  htmlFor="notifyStaff"
                  className="text-sm font-medium leading-none flex items-center gap-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Users className="h-4 w-4" />
                  Notify Staff
                </label>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Recipients:</p>
                <p className="text-sm text-muted-foreground">
                  {selectedAnimal ? (
                    recipients.length > 0 ? 
                      `${recipients.length} recipient${recipients.length === 1 ? '' : 's'} selected` :
                      "No recipients match these criteria"
                  ) : (
                    "Select an animal to see potential recipients"
                  )}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                  disabled={!selectedAnimal || !message || recipients.length === 0}
                >
                  Preview
                </Button>
                <Button
                  onClick={handleSendNotification}
                  disabled={!selectedAnimal || !message || recipients.length === 0 || isLoading}
                >
                  {isLoading ? "Sending..." : "Send Notification"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Preview dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Preview Notification</DialogTitle>
                <DialogDescription>
                  This is how your notification will appear to recipients
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        {selectedAnimal} Sighting
                      </Badge>
                      <h3 className="text-xl font-semibold">Wildlife Alert</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-5 w-5 text-green-800" />
                    </div>
                  </div>
                  
                  <p className="mt-3">{message}</p>
                  
                  {location && (
                    <p className="mt-2 text-sm font-medium">
                      Location: {location}
                    </p>
                  )}
                  
                  {attachPhoto && selectedCamera && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Latest Camera Image:</p>
                      <div className="relative aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                        <Camera className="h-10 w-10 text-muted-foreground opacity-50" />
                        <p className="text-sm text-muted-foreground mt-2">Camera image preview</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        From: {cameras.find(c => c.id === selectedCamera)?.name}
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Recipients:</h4>
                  <div className="max-h-40 overflow-y-auto border rounded-md">
                    <div className="p-2">
                      {recipients.map(recipient => (
                        <div key={recipient.id} className="py-1 px-2 text-sm flex justify-between">
                          <span>{recipient.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {staff.some(s => s.id === recipient.id) ? "Staff" : "Guest"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Back to Edit
                </Button>
                <Button onClick={handleSendNotification} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Notification"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">Notification History</h3>
              <p className="text-muted-foreground mt-2">Coming soon...</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 