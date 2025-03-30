"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { Bell, Lock, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AccountSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@safari.com",
    role: "Administrator",
    avatar: "/placeholder.svg"
  }
  
  const handleSaveProfile = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      })
    }, 1000)
  }
  
  const handleSavePassword = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully."
      })
    }, 1000)
  }
  
  const handleSaveNotifications = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved."
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="password" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
      </TabsList>
      
      {/* Profile Tab */}
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account information and profile settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              
              <div className="grid gap-4 flex-1">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div>
                  <Label>Role</Label>
                  <p className="text-sm font-medium mt-1">{user.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Password Tab */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSavePassword} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications about wildlife sightings and system updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Wildlife Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive email alerts about wildlife sightings</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive mobile push notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">System Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-muted-foreground text-sm">Notifications about system updates and maintenance</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-muted-foreground text-sm">Important security-related notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Wildlife Interests</h3>
              <p className="text-muted-foreground text-sm">Select which wildlife species you're interested in receiving notifications about</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="elephant" defaultChecked />
                  <Label htmlFor="elephant">Elephant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="lion" defaultChecked />
                  <Label htmlFor="lion">Lion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="rhino" defaultChecked />
                  <Label htmlFor="rhino">Rhino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="buffalo" />
                  <Label htmlFor="buffalo">Buffalo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="leopard" />
                  <Label htmlFor="leopard">Leopard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="giraffe" />
                  <Label htmlFor="giraffe">Giraffe</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveNotifications} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 