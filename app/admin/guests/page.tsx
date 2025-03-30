"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Plus, Search, Send, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample guest data
const guestData = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    checkIn: "2023-06-10",
    checkOut: "2023-06-15",
    status: "onboarded",
    preferences: ["Elephant", "Lion", "Giraffe"],
  },
  {
    id: "2",
    name: "Michael Chen",
    phone: "+1 (555) 987-6543",
    checkIn: "2023-06-12",
    checkOut: "2023-06-18",
    status: "onboarded",
    preferences: ["Elephant", "Rhino"],
  },
  {
    id: "3",
    name: "Emma Williams",
    phone: "+1 (555) 234-5678",
    checkIn: "2023-06-14",
    checkOut: "2023-06-20",
    status: "pending",
    preferences: [],
  },
  {
    id: "4",
    name: "James Smith",
    phone: "+1 (555) 876-5432",
    checkIn: "2023-06-15",
    checkOut: "2023-06-22",
    status: "onboarded",
    preferences: ["Lion", "Zebra", "Giraffe"],
  },
  {
    id: "5",
    name: "Olivia Brown",
    phone: "+1 (555) 345-6789",
    checkIn: "2023-06-18",
    checkOut: "2023-06-25",
    status: "pending",
    preferences: [],
  },
]

export default function GuestsPage() {
  const [guests, setGuests] = useState(guestData)
  const [searchQuery, setSearchQuery] = useState("")
  const [newGuestOpen, setNewGuestOpen] = useState(false)

  const filteredGuests = guests.filter(
    (guest) => guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || guest.phone.includes(searchQuery),
  )

  const handleSendInvite = (id: string) => {
    // Placeholder for sending invite via WhatsApp API
    alert(`Invite sent to guest with ID: ${id}`)
  }

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for adding a new guest
    setNewGuestOpen(false)
    // Would add the new guest to the guests array here
  }

  return (
    <div className="space-y-6">
      <Dialog open={newGuestOpen} onOpenChange={setNewGuestOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-safari-leaf text-safari-leaf hover:bg-safari-leaf/10 gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Guest
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Guest</DialogTitle>
            <DialogDescription>Create a new guest profile to send wildlife notifications</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddGuest}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="checkIn">Check-in Date</Label>
                  <Input id="checkIn" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="checkOut">Check-out Date</Label>
                  <Input id="checkOut" type="date" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room">Room/Lodge</Label>
                <Select>
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elephant-suite">Elephant Suite</SelectItem>
                    <SelectItem value="lion-lodge">Lion Lodge</SelectItem>
                    <SelectItem value="giraffe-view">Giraffe View</SelectItem>
                    <SelectItem value="rhino-retreat">Rhino Retreat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Guest</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="onboarded">Onboarded</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Check-in/out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Preferences</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No guests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>
                    {new Date(guest.checkIn).toLocaleDateString()} - {new Date(guest.checkOut).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {guest.status === "onboarded" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Onboarded
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {guest.preferences.length > 0 ? (
                        guest.preferences.map((pref) => (
                          <Badge key={pref} variant="secondary" className="text-xs">
                            {pref}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">None</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleSendInvite(guest.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Invite
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

