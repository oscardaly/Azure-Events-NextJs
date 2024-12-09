"use client"

import { useState, FC } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { SocietyEvent } from "@/app/types/SocietyEvent";
import { EventAnalyticsData } from "@/app/types/EventAnalyticsData";
import {EventForm} from "@/components/event-form";
import Link from "next/link";
import {SignOutButton} from "@/components/sign-out-button";
import {deleteEventById, getEvents, updateEvent} from "@/app/api/events/rest";
import {Ticket} from "@/app/types/Ticket";

interface AdminDashboardProps {
    initialEvents: SocietyEvent[]
    eventAnalyticsData?: EventAnalyticsData[],
    initialTickets: Ticket[]
}

export const AdminDashboard: FC<AdminDashboardProps> = ({ initialEvents, initialTickets }) => {
    const [events, setEvents] = useState<SocietyEvent[]>(initialEvents);
    const [tickets] = useState<Ticket[]>(initialTickets);
    const [newEvent, setNewEvent] = useState<SocietyEvent | undefined>(undefined);
    const [editingEvent, setEditingEvent] = useState<SocietyEvent | undefined>(undefined);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [isEditEventOpen, setIsEditEventOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const defaultEvent: SocietyEvent = {
        id: 12345,
        name: "",
        description: "",
        date: "",
        price: 0,
        location: "",
        ticketsLeft: 0,
        time: "",
        filePath: "",
        fileLocator: "",
        questions: [],
        attendees: []
    }

    const handleAddEvent = async () => {
        if (newEvent) {
            await updateEvent(newEvent);
            setEvents(await getEvents());
            setNewEvent(undefined)
            setIsAddEventOpen(false)
        }

        else  {
            setEvents(await getEvents());
        }
    }

    const handleEditEvent = (event: SocietyEvent) => {
        setEditingEvent(event)
        setIsEditEventOpen(true)
    }

    const handleUpdateEvent = async () => {
        if (editingEvent?.id && editingEvent.filePath) {
            const event = events.find((event) => event.id === editingEvent.id)

            if (event) {
                console.log(event);
                await updateEvent(event);
            }

            setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event))
            setEditingEvent(undefined)
            setIsEditEventOpen(false)
        }
    }

    const handleDeleteEvent = async (id: number) => {
        await deleteEventById(id.toString());
        setEvents(await getEvents());
        setIsDeleteModalOpen(false);
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
                                            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
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
                                                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
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
            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Tickets List</CardTitle>
                    <CardDescription>Manage your Tickets</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Event Name</TableHead>
                                <TableHead>Event Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.userEmail}</TableCell>
                                    <TableCell>{ticket.eventName}</TableCell>
                                    <TableCell>{ticket.eventDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}