"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, UserPlus, UserMinus, Shield, Edit, Trash2, Plus, X, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// First, define the User interface at the top of the file
interface UserPermissions {
  manageUsers: boolean;
  manageLodges: boolean;
  manageCameras: boolean;
  manageGuests: boolean;
  sendNotifications: boolean;
  receiveNotifications: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string | null;
  permissions: UserPermissions;
  notificationPreferences?: string[];
  phone?: string;
}

interface NewUser {
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: UserPermissions;
  notificationPreferences: string[];
  phone: string;
}

// Mock data for users
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@safari.com",
    role: "administrator",
    status: "active",
    lastLogin: "2023-03-29T10:15:00Z",
    permissions: {
      manageUsers: true,
      manageLodges: true,
      manageCameras: true,
      manageGuests: true,
      sendNotifications: true,
      receiveNotifications: true
    },
    notificationPreferences: ["Elephant", "Lion", "Rhino"],
    phone: "+1 (555) 111-2222"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@safari.com",
    role: "manager",
    status: "active",
    lastLogin: "2023-03-28T16:45:00Z",
    permissions: {
      manageUsers: false,
      manageLodges: true,
      manageCameras: true,
      manageGuests: true,
      sendNotifications: true,
      receiveNotifications: true
    },
    notificationPreferences: ["Elephant", "Lion"],
    phone: "+1 (555) 333-4444"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@safari.com",
    role: "ranger",
    status: "active",
    lastLogin: "2023-03-29T08:30:00Z",
    permissions: {
      manageUsers: false,
      manageLodges: false,
      manageCameras: true,
      manageGuests: false,
      sendNotifications: true,
      receiveNotifications: true
    },
    notificationPreferences: ["Elephant"],
    phone: "+1 (555) 555-6666"
  },
  {
    id: "4",
    name: "Emma Williams",
    email: "emma.williams@safari.com",
    role: "staff",
    status: "inactive",
    lastLogin: "2023-03-25T14:20:00Z",
    permissions: {
      manageUsers: false,
      manageLodges: false,
      manageCameras: false,
      manageGuests: true,
      sendNotifications: true,
      receiveNotifications: true
    },
    notificationPreferences: ["Elephant"],
    phone: "+1 (555) 777-8888"
  },
];

// Predefined roles and their default permissions
const roles = [
  {
    id: "administrator",
    name: "Administrator",
    description: "Full access to all system features",
    defaultPermissions: {
      manageUsers: true,
      manageLodges: true,
      manageCameras: true,
      manageGuests: true,
      sendNotifications: true,
      receiveNotifications: true
    }
  },
  {
    id: "manager",
    name: "Manager",
    description: "Access to most features except user management",
    defaultPermissions: {
      manageUsers: false,
      manageLodges: true,
      manageCameras: true,
      manageGuests: true,
      sendNotifications: true,
      receiveNotifications: true
    }
  },
  {
    id: "ranger",
    name: "Ranger",
    description: "Field staff with camera management access",
    defaultPermissions: {
      manageUsers: false,
      manageLodges: false,
      manageCameras: true,
      manageGuests: false,
      sendNotifications: true,
      receiveNotifications: true
    }
  },
  {
    id: "staff",
    name: "Staff",
    description: "General staff with guest management access",
    defaultPermissions: {
      manageUsers: false,
      manageLodges: false,
      manageCameras: false,
      manageGuests: true,
      sendNotifications: true,
      receiveNotifications: true
    }
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to the system",
    defaultPermissions: {
      manageUsers: false,
      manageLodges: false,
      manageCameras: false,
      manageGuests: false,
      sendNotifications: false,
      receiveNotifications: false
    }
  }
];

// Add wildlife notification options
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

export function UserSettings() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  
  // Make sure newUser has all the required properties
  const defaultPermissions: UserPermissions = {
    manageUsers: false,
    manageLodges: false,
    manageCameras: false,
    manageGuests: true,
    sendNotifications: true,
    receiveNotifications: true
  };
  
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    role: "staff",
    status: "active",
    permissions: { ...defaultPermissions },
    notificationPreferences: [],
    phone: ""
  });
  
  const { toast } = useToast();

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      lastLogin: null,
      permissions: { ...newUser.permissions },
      notificationPreferences: newUser.notificationPreferences,
      phone: newUser.phone
    };
    setUsers([...users, user]);
    setNewUser({
      name: "",
      email: "",
      role: "staff",
      status: "active",
      permissions: { ...defaultPermissions },
      notificationPreferences: [],
      phone: ""
    });
    setIsAddDialogOpen(false);
    toast({
      title: "User added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleEditUser = () => {
    if (!currentUser) return;
    const updatedUsers = users.map((user) => (user.id === currentUser.id ? { ...currentUser } : user));
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    toast({
      title: "User updated",
      description: `${currentUser.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;
    const updatedUsers = users.filter((user) => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    toast({
      title: "User deleted",
      description: `${currentUser.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const handleRoleChange = (role: string, isNewUser = false) => {
    const selectedRole = roles.find(r => r.id === role);
    if (!selectedRole) return;
    
    if (isNewUser) {
      setNewUser((prev: NewUser) => ({
        ...prev,
        role,
        permissions: { 
          manageUsers: !!selectedRole.defaultPermissions.manageUsers,
          manageLodges: !!selectedRole.defaultPermissions.manageLodges,
          manageCameras: !!selectedRole.defaultPermissions.manageCameras,
          manageGuests: !!selectedRole.defaultPermissions.manageGuests,
          sendNotifications: !!selectedRole.defaultPermissions.sendNotifications,
          receiveNotifications: !!selectedRole.defaultPermissions.receiveNotifications
        }
      }));
    } else if (currentUser) {
      setCurrentUser((prev: User) => ({
        ...prev,
        role,
        permissions: { 
          manageUsers: !!selectedRole.defaultPermissions.manageUsers,
          manageLodges: !!selectedRole.defaultPermissions.manageLodges,
          manageCameras: !!selectedRole.defaultPermissions.manageCameras,
          manageGuests: !!selectedRole.defaultPermissions.manageGuests,
          sendNotifications: !!selectedRole.defaultPermissions.sendNotifications,
          receiveNotifications: !!selectedRole.defaultPermissions.receiveNotifications
        }
      }));
    }
  };

  const formatLastLogin = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", "");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "administrator":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "manager":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "ranger":
        return "bg-green-50 text-green-700 border-green-200";
      case "staff":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "viewer":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRoleName = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.name || roleId;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-muted-foreground mb-4">Manage staff accounts and permissions</p>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2 mb-4">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account and set their permissions.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid grid-cols-2 mb-4 bg-muted/50 p-1 sticky top-0 z-10">
              <TabsTrigger value="details" className="data-[state=active]:bg-background">
                User Details
              </TabsTrigger>
              <TabsTrigger value="permissions" className="data-[state=active]:bg-background">
                Permissions
              </TabsTrigger>
            </TabsList>
            <div className="overflow-y-auto">
              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="e.g. John Smith"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="e.g. john.smith@safari.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) => handleRoleChange(value, true)}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {roles.find(r => r.id === newUser.role)?.description}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newUser.status}
                      onValueChange={(value) => setNewUser({ ...newUser, status: value })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="permissions" className="space-y-4">
                <div className="rounded-md border p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Manage Users</h4>
                      <p className="text-sm text-muted-foreground">Add, edit and remove user accounts</p>
                    </div>
                    <Switch
                      checked={newUser.permissions?.manageUsers}
                      onCheckedChange={(checked) =>
                        setNewUser(prev => ({
                          ...prev,
                          permissions: { ...prev.permissions, manageUsers: checked }
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Manage Lodges</h4>
                      <p className="text-sm text-muted-foreground">Add, edit and remove lodge information</p>
                    </div>
                    <Switch
                      checked={newUser.permissions?.manageLodges}
                      onCheckedChange={(checked) =>
                        setNewUser(prev => ({
                          ...prev,
                          permissions: { ...prev.permissions, manageLodges: checked }
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Manage Cameras</h4>
                      <p className="text-sm text-muted-foreground">Configure and monitor wildlife cameras</p>
                    </div>
                    <Switch
                      checked={newUser.permissions?.manageCameras}
                      onCheckedChange={(checked) =>
                        setNewUser(prev => ({
                          ...prev,
                          permissions: { ...prev.permissions, manageCameras: checked }
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Manage Guests</h4>
                      <p className="text-sm text-muted-foreground">Add and manage guest information</p>
                    </div>
                    <Switch
                      checked={newUser.permissions?.manageGuests}
                      onCheckedChange={(checked) =>
                        setNewUser(prev => ({
                          ...prev,
                          permissions: { ...prev.permissions, manageGuests: checked }
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Send Notifications</h4>
                      <p className="text-sm text-muted-foreground">Send wildlife notifications to guests</p>
                    </div>
                    <Switch
                      checked={newUser.permissions?.sendNotifications}
                      onCheckedChange={(checked) =>
                        setNewUser(prev => ({
                          ...prev,
                          permissions: { ...prev.permissions, sendNotifications: checked }
                        }))
                      }
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Receive Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get wildlife sighting notifications like guests</p>
                    </div>
                    <Switch
                      checked={newUser.permissions?.receiveNotifications}
                      onCheckedChange={(checked) =>
                        setNewUser(prev => ({
                          ...prev,
                          permissions: { ...prev.permissions, receiveNotifications: checked }
                        }))
                      }
                    />
                  </div>
                </div>
                
                {/* Add wildlife notification preferences */}
                {newUser.permissions?.receiveNotifications && (
                  <div className="rounded-md border p-4 space-y-4">
                    <div>
                      <h4 className="font-medium">Notification Preferences</h4>
                      <p className="text-sm text-muted-foreground">Select which wildlife sightings to be notified about</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {wildlifeOptions.map((animal) => (
                        <div key={animal} className="flex items-center space-x-2">
                          <Switch
                            id={`animal-${animal}`}
                            checked={newUser.notificationPreferences.includes(animal)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewUser(prev => ({
                                  ...prev,
                                  notificationPreferences: [...prev.notificationPreferences, animal]
                                }));
                              } else {
                                setNewUser(prev => ({
                                  ...prev,
                                  notificationPreferences: prev.notificationPreferences.filter(a => a !== animal)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={`animal-${animal}`}>{animal}</Label>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">WhatsApp/Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        placeholder="e.g. +1 (555) 123-4567"
                      />
                      <p className="text-xs text-muted-foreground">
                        Required for receiving wildlife notifications
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
          <DialogFooter className="sticky bottom-0 pt-2 bg-background border-t mt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddUser} 
              disabled={!newUser.name || !newUser.email}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id} className="overflow-hidden border">
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setCurrentUser(user);
                      setIsEditDialogOpen(true);
                      setActiveTab("details");
                    }}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setCurrentUser(user);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={`${getRoleBadgeColor(user.role)}`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleName(user.role)}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    user.status === "active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }
                >
                  {user.status === "active" ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <X className="h-3 w-3 mr-1" />
                  )}
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Last Login:</p>
                  <p>{formatLastLogin(user.lastLogin)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Permissions:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.permissions.manageUsers && (
                      <Badge variant="secondary" className="text-xs">Users</Badge>
                    )}
                    {user.permissions.manageLodges && (
                      <Badge variant="secondary" className="text-xs">Lodges</Badge>
                    )}
                    {user.permissions.manageCameras && (
                      <Badge variant="secondary" className="text-xs">Cameras</Badge>
                    )}
                    {user.permissions.manageGuests && (
                      <Badge variant="secondary" className="text-xs">Guests</Badge>
                    )}
                    {user.permissions.sendNotifications && (
                      <Badge variant="secondary" className="text-xs">Send</Badge>
                    )}
                    {user.permissions.receiveNotifications && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Receive</Badge>
                    )}
                  </div>
                </div>
              </div>

              {user.permissions.receiveNotifications && (
                <div className="mt-2">
                  <p className="text-muted-foreground">Wildlife Interests:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.notificationPreferences && user.notificationPreferences.length > 0 ? (
                      user.notificationPreferences.map(pref => (
                        <Badge key={pref} variant="outline" className="text-xs bg-amber-50 text-amber-800">
                          {pref}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update the user's details and permissions.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-2 mb-4 bg-muted/50 p-1 sticky top-0 z-10">
                  <TabsTrigger value="details" className="data-[state=active]:bg-background">
                    User Details
                  </TabsTrigger>
                  <TabsTrigger value="permissions" className="data-[state=active]:bg-background">
                    Permissions
                  </TabsTrigger>
                </TabsList>
                <div className="overflow-y-auto">
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input
                          id="edit-name"
                          value={currentUser.name}
                          onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-email">Email Address</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={currentUser.email}
                          onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-role">Role</Label>
                        <Select
                          value={currentUser.role}
                          onValueChange={(value) => handleRoleChange(value)}
                        >
                          <SelectTrigger id="edit-role">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {roles.find(r => r.id === currentUser.role)?.description}
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select
                          value={currentUser.status}
                          onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                        >
                          <SelectTrigger id="edit-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="permissions" className="space-y-4">
                    <div className="rounded-md border p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Manage Users</h4>
                          <p className="text-sm text-muted-foreground">Add, edit and remove user accounts</p>
                        </div>
                        <Switch
                          checked={currentUser.permissions?.manageUsers}
                          onCheckedChange={(checked) =>
                            setCurrentUser(prev => ({
                              ...prev,
                              permissions: { ...prev.permissions, manageUsers: checked }
                            }))
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Manage Lodges</h4>
                          <p className="text-sm text-muted-foreground">Add, edit and remove lodge information</p>
                        </div>
                        <Switch
                          checked={currentUser.permissions?.manageLodges}
                          onCheckedChange={(checked) =>
                            setCurrentUser(prev => ({
                              ...prev,
                              permissions: { ...prev.permissions, manageLodges: checked }
                            }))
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Manage Cameras</h4>
                          <p className="text-sm text-muted-foreground">Configure and monitor wildlife cameras</p>
                        </div>
                        <Switch
                          checked={currentUser.permissions?.manageCameras}
                          onCheckedChange={(checked) =>
                            setCurrentUser(prev => ({
                              ...prev,
                              permissions: { ...prev.permissions, manageCameras: checked }
                            }))
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Manage Guests</h4>
                          <p className="text-sm text-muted-foreground">Add and manage guest information</p>
                        </div>
                        <Switch
                          checked={currentUser.permissions?.manageGuests}
                          onCheckedChange={(checked) =>
                            setCurrentUser(prev => ({
                              ...prev,
                              permissions: { ...prev.permissions, manageGuests: checked }
                            }))
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Send Notifications</h4>
                          <p className="text-sm text-muted-foreground">Send wildlife notifications to guests</p>
                        </div>
                        <Switch
                          checked={currentUser.permissions?.sendNotifications}
                          onCheckedChange={(checked) =>
                            setCurrentUser(prev => ({
                              ...prev,
                              permissions: { ...prev.permissions, sendNotifications: checked }
                            }))
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Receive Notifications</h4>
                          <p className="text-sm text-muted-foreground">Get wildlife sighting notifications like guests</p>
                        </div>
                        <Switch
                          checked={currentUser.permissions?.receiveNotifications}
                          onCheckedChange={(checked) =>
                            setCurrentUser(prev => {
                              if (prev === null) return null;
                              return {
                                ...prev,
                                permissions: { ...prev.permissions, receiveNotifications: checked }
                              };
                            })
                          }
                        />
                      </div>
                    </div>
                    
                    {/* Add wildlife notification preferences */}
                    {currentUser.permissions?.receiveNotifications && (
                      <div className="rounded-md border p-4 space-y-4">
                        <div>
                          <h4 className="font-medium">Notification Preferences</h4>
                          <p className="text-sm text-muted-foreground">Select which wildlife sightings to be notified about</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {wildlifeOptions.map((animal) => (
                            <div key={animal} className="flex items-center space-x-2">
                              <Switch
                                id={`edit-animal-${animal}`}
                                checked={currentUser.notificationPreferences?.includes(animal) || false}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setCurrentUser(prev => {
                                      if (prev === null) return null;
                                      return {
                                        ...prev,
                                        notificationPreferences: [...(prev.notificationPreferences || []), animal]
                                      };
                                    });
                                  } else {
                                    setCurrentUser(prev => {
                                      if (prev === null) return null;
                                      return {
                                        ...prev,
                                        notificationPreferences: (prev.notificationPreferences || []).filter(a => a !== animal)
                                      };
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`edit-animal-${animal}`}>{animal}</Label>
                            </div>
                          ))}
                        </div>
                        
                        <Separator />
                        
                        <div className="grid gap-2">
                          <Label htmlFor="edit-phone">WhatsApp/Phone Number</Label>
                          <Input
                            id="edit-phone"
                            type="tel"
                            value={currentUser.phone || ""}
                            onChange={(e) => setCurrentUser(prev => {
                              if (prev === null) return null;
                              return { ...prev, phone: e.target.value };
                            })}
                            placeholder="e.g. +1 (555) 123-4567"
                          />
                          <p className="text-xs text-muted-foreground">
                            Required for receiving wildlife notifications
                          </p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
              <DialogFooter className="sticky bottom-0 pt-2 bg-background border-t mt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleEditUser} 
                  disabled={!currentUser.name || !currentUser.email}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">{currentUser.name}</h4>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className={`${getRoleBadgeColor(currentUser.role)}`}>
                    {getRoleName(currentUser.role)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

