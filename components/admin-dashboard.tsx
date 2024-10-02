"use client"

import { useState, FC } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, QrCode, ClipboardList } from "lucide-react"
import { SocietyEvent } from "@/app/types/SocietyEvent";
import { EventAnalyticsData } from "@/app/types/EventAnalyticsData";
import {EventForm} from "@/components/event-form";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import Link from "next/link";
import {SignOutButton} from "@/components/sign-out-button";

interface AdminDashboardProps {
    initialEvents: SocietyEvent[]
    eventAnalyticsData: EventAnalyticsData[]
}

export const AdminDashboard: FC<AdminDashboardProps> = ({ initialEvents, eventAnalyticsData }) => {
    const [events, setEvents] = useState<SocietyEvent[]>(initialEvents)
    const [newEvent, setNewEvent] = useState<SocietyEvent | undefined>(undefined)
    const [editingEvent, setEditingEvent] = useState<SocietyEvent | undefined>(undefined)
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)
    const [isEditEventOpen, setIsEditEventOpen] = useState(false)

    const defaultEvent: SocietyEvent = {
        id: 12345,
        name: "",
        description: "",
        date: "",
        price: 0,
        location: "",
        ticketsLeft: 0,
        time: "",
        image: "",
        questions: [],
        attendees: []
    }

    const handleAddEvent = () => {
        if (newEvent) {
            setEvents([...events, newEvent])
            setNewEvent(undefined)
            setIsAddEventOpen(false)
        }

        else  {
        //     show error toast
        }
    }

    const handleEditEvent = (event: SocietyEvent) => {
        setEditingEvent(event)
        setIsEditEventOpen(true)
    }

    const handleUpdateEvent = () => {
        if (editingEvent) {
            setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event))
            setEditingEvent(undefined)
            setIsEditEventOpen(false)
        }
    }

    const handleDeleteEvent = (id: number) => {
        setEvents(events.filter(event => event.id !== id))
    }

    const handleShareEvent = (event: SocietyEvent) => {
        const eventUrl = `https://events.com/event/${event.id}`
        navigator.clipboard.writeText(eventUrl)
        alert(`Event URL copied to clipboard: ${eventUrl}`)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <SignOutButton/>
            <Button onClick={() => setIsAddEventOpen(true)} className="mb-4">Add New Event</Button>

            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                        <DialogDescription>Fill in the details for a new event</DialogDescription>
                    </DialogHeader>
                    <EventForm isEditing={false} event={newEvent ?? defaultEvent} setEditingEvent={setEditingEvent}
                               setNewEvent={setNewEvent}/>
                    <DialogFooter>
                        <Button onClick={handleAddEvent}>Add Event</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
                        <DialogDescription>Update the event details</DialogDescription>
                    </DialogHeader>
                    <EventForm isEditing={true} event={editingEvent ?? defaultEvent} setEditingEvent={setEditingEvent}
                               setNewEvent={setNewEvent}/>
                    <DialogFooter>
                        <Button onClick={handleUpdateEvent}>Update Event</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <CardTitle>Event List</CardTitle>
                    <CardDescription>Manage your events</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Tickets Left</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.time}</TableCell>
                                    <TableCell>£{event.price}</TableCell>
                                    <TableCell>{event.ticketsLeft}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={`/events/${event.id}`} rel="noopener noreferrer"
                                                  target="_blank">
                                                <Button variant="outline">View</Button>
                                            </Link>
                                            <Button variant="outline"
                                                    onClick={() => handleEditEvent(event)}>Edit</Button>
                                            <Button variant="outline" onClick={() => handleShareEvent(event)}><Share2
                                                className="h-4 w-4"/></Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="destructive">Delete</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete
                                                            the event.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => {
                                                        }}>Cancel</Button>
                                                        <Button variant="destructive"
                                                                onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>Manage individual event details</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="entry">
                        <TabsList>
                            <TabsTrigger value="entry">Entry Manager</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="attendees">Attendees</TabsTrigger>
                        </TabsList>
                        <TabsContent value="entry">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Entry Manager</CardTitle>
                                    <CardDescription>Scan QR codes to check ticket validity</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-2">
                                        <Input placeholder="Enter ticket ID or scan QR code"/>
                                        <Button><QrCode className="h-4 w-4 mr-2"/> Scan</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="analytics">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Analytics</CardTitle>
                                    <CardDescription>View ticket sales and revenue</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer
                                        className="h-[300px]"
                                        config={{
                                            tickets: {
                                                label: "Tickets Sold",
                                                color: "hsl(var(--primary))",
                                            },
                                            revenue: {
                                                label: "Revenue",
                                                color: "hsl(var(--secondary))",
                                            },
                                        }}
                                    >
                                        <LineChart data={eventAnalyticsData}>
                                            <XAxis
                                                dataKey="name"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${value}`}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `$${value}`}
                                            />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="tickets"
                                                strokeWidth={2}
                                                activeDot={{
                                                    r: 6,
                                                    style: {fill: "hsl(var(--primary))", opacity: 0.8},
                                                }}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="revenue"
                                                strokeWidth={2}
                                                activeDot={{
                                                    r: 6,
                                                    style: {fill: "hsl(var(--secondary))", opacity: 0.8},
                                                }}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent/>}/>
                                            <ChartLegend content={<ChartLegendContent/>}/>
                                        </LineChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="attendees">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Attendee List</CardTitle>
                                    <CardDescription>View and manage event attendees</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Ticket ID</TableHead>
                                                <TableHead>Questions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {events[0].attendees.map((attendee, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{attendee.name}</TableCell>
                                                    <TableCell>{attendee.email}</TableCell>
                                                    <TableCell>{attendee.ticketId}</TableCell>
                                                    <TableCell>
                                                        <Button variant="outline" size="sm">
                                                            <ClipboardList className="h-4 w-4 mr-2"/>
                                                            View Answers
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}