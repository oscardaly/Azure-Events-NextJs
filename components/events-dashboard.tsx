"use client"

import { FC } from 'react'
import {SocietyEvent} from "@/app/types/SocietyEvent";
// import { QRCodeSVG } from 'qrcode.react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Mail, Calendar, Share2 } from "lucide-react"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Skeleton } from "@/components/ui/skeleton"

interface EventsDashboardProps {
  events: SocietyEvent[]
}

export const EventsDashboard: FC<EventsDashboardProps> = ({ events }) => {
  events.map(events => events.id)
  // const [basket, setBasket] = useState([])
  // const [tickets, setTickets] = useState([])
  // const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  // const [email, setEmail] = useState('')
  // const [selectedEvent, setSelectedEvent] = useState(null)
  // const [loading, setLoading] = useState(true)
  //
  // useEffect(() => {
  //   // Simulate loading delay
  //   const timer = setTimeout(() => setLoading(false), 2000)
  //   return () => clearTimeout(timer)
  // }, [])
  //
  // const addToBasket = (eventId: number) => {
  //   const event = events.find(e => e.id === eventId)
  //   if (event && event.ticketsLeft > 0) {
  //     const existingItem = basket.find(item => item.eventId === eventId)
  //     if (existingItem) {
  //       setBasket(basket.map(item =>
  //         item.eventId === eventId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       ))
  //     } else {
  //       setBasket([...basket, { eventId, quantity: 1, name: event.name, price: event.price }])
  //     }
  //     event.ticketsLeft--
  //   }
  // }
  //
  // const removeFromBasket = (eventId) => {
  //   const event = events.find(e => e.id === eventId)
  //   const existingItem = basket.find(item => item.eventId === eventId)
  //   if (existingItem) {
  //     if (existingItem.quantity > 1) {
  //       setBasket(basket.map(item =>
  //         item.eventId === eventId
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       ))
  //     } else {
  //       setBasket(basket.filter(item => item.eventId !== eventId))
  //     }
  //     event.ticketsLeft++
  //   }
  // }
  //
  // const clearBasket = () => {
  //   basket.forEach(item => {
  //     const event = events.find(e => e.id === item.eventId)
  //     event.ticketsLeft += item.quantity
  //   })
  //   setBasket([])
  // }
  //
  // const sendEmail = (ticket) => {
  //   const event = events.find(e => e.id === ticket.eventId)
  //   const emailContent = `
  //     Dear Attendee,
  //
  //     Thank you for purchasing a ticket to ${ticket.eventName}!
  //
  //     Event Details:
  //     Date: ${event.date}
  //     Time: ${event.time}
  //     Location: ${event.location}
  //
  //     Your ticket ID is: ${ticket.id}
  //
  //     Please find attached your QR code ticket and calendar invite.
  //
  //     We look forward to seeing you at the event!
  //
  //     Best regards,
  //     Event Organizers
  //   `
  //   console.log('Sending email:', emailContent)
  // }
  //
  // const createCalendarInvite = (ticket) => {
  //   const event = events.find(e => e.id === ticket.eventId)
  //   const calendarEvent = {
  //     title: event.name,
  //     description: `Your ticket ID is: ${ticket.id}`,
  //     location: event.location,
  //     start: new Date(`${event.date}T${event.time}`),
  //     end: new Date(`${event.date}T${event.time}`),
  //   }
  //   console.log('Creating calendar invite:', calendarEvent)
  // }
  //
  // const checkout = () => {
  //   const newTickets = basket.flatMap(item =>
  //     Array.from({ length: item.quantity }, (_, i) => ({
  //       id: `${item.eventId}-${Date.now()}-${i}`,
  //       eventId: item.eventId,
  //       eventName: item.name,
  //       eventDate: events.find(e => e.id === item.eventId).date,
  //     }))
  //   )
  //   setTickets([...tickets, ...newTickets])
  //   newTickets.forEach(ticket => {
  //     sendEmail(ticket)
  //     createCalendarInvite(ticket)
  //   })
  //   clearBasket()
  //   setIsCheckoutOpen(false)
  // }
  //
  // const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0)
  //
  return (
      <h1>Working</h1>
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-3xl font-bold mb-6">Events Dashboard</h1>
  //
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
  //       {loading ? (
  //         Array(3).fill(0).map((_, index) => (
  //           <Card key={index}>
  //             <CardHeader>
  //               <Skeleton className="h-6 w-3/4 mb-2" />
  //               <Skeleton className="h-4 w-1/2" />
  //             </CardHeader>
  //             <CardContent>
  //               <Skeleton className="h-40 w-full mb-2" />
  //               <Skeleton className="h-4 w-1/4 mb-2" />
  //               <Skeleton className="h-4 w-3/4 mb-2" />
  //               <Skeleton className="h-4 w-1/2" />
  //             </CardContent>
  //             <CardFooter className="flex justify-between">
  //               <Skeleton className="h-10 w-24" />
  //               <Skeleton className="h-10 w-24" />
  //             </CardFooter>
  //           </Card>
  //         ))
  //       ) : (
  //         events.map((event) => (
  //           <Card key={event.id} className="cursor-pointer" onClick={() => setSelectedEvent(event)}>
  //             <CardHeader>
  //               <CardTitle>{event.name}</CardTitle>
  //               <CardDescription>{event.date} at {event.time}</CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <img src={event.image} alt={event.name} className="w-full h-40 object-cover mb-4 rounded" />
  //               <p>Price: ${event.price}</p>
  //               <p>Location: {event.location}</p>
  //               <p>Tickets Left: {event.ticketsLeft}</p>
  //             </CardContent>
  //             <CardFooter className="flex justify-between">
  //               <Button onClick={(e) => {
  //                 e.stopPropagation();
  //                 setSelectedEvent(event);
  //               }}>
  //                 View Details
  //               </Button>
  //               <Button onClick={(e) => {
  //                 e.stopPropagation();
  //                 addToBasket(event.id);
  //               }} disabled={event.ticketsLeft === 0}>
  //                 Add to Basket
  //               </Button>
  //             </CardFooter>
  //           </Card>
  //         ))
  //       )}
  //     </div>
  //
  //     <Sheet>
  //       <SheetTrigger asChild>
  //         <Button className="fixed bottom-4 right-4 z-10">
  //           <ShoppingCart className="mr-2 h-4 w-4" />
  //           Basket ({basket.reduce((total, item) => total + item.quantity, 0)})
  //         </Button>
  //       </SheetTrigger>
  //       <SheetContent>
  //         <SheetHeader>
  //           <SheetTitle>Your Basket</SheetTitle>
  //           <SheetDescription>
  //             Review your selected tickets before checkout.
  //           </SheetDescription>
  //         </SheetHeader>
  //         {basket.map((item) => (
  //           <div key={item.eventId} className="flex justify-between items-center py-4">
  //             <div>
  //               <h3 className="font-semibold">{item.name}</h3>
  //               <p className="text-sm text-gray-500">${item.price} per ticket</p>
  //             </div>
  //             <div className="flex items-center">
  //               <Button variant="outline" size="icon" onClick={() => removeFromBasket(item.eventId)}>
  //                 <Minus className="h-4 w-4" />
  //               </Button>
  //               <span className="mx-2">{item.quantity}</span>
  //               <Button variant="outline" size="icon" onClick={() => addToBasket(item.eventId)}>
  //                 <Plus className="h-4 w-4" />
  //               </Button>
  //             </div>
  //           </div>
  //         ))}
  //         <Separator className="my-4" />
  //         <div className="flex justify-between items-center py-4">
  //           <span className="font-semibold">Total:</span>
  //           <span>${totalPrice}</span>
  //         </div>
  //         <div className="flex justify-end space-x-2 mt-4">
  //           <Button variant="outline" onClick={clearBasket}>
  //             <Trash2 className="mr-2 h-4 w-4" />
  //             Clear Basket
  //           </Button>
  //           <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
  //             <DialogTrigger asChild>
  //               <Button disabled={basket.length === 0}>
  //                 <CreditCard className="mr-2 h-4 w-4" />
  //                 Checkout
  //               </Button>
  //             </DialogTrigger>
  //             <DialogContent>
  //               <DialogHeader>
  //                 <DialogTitle>Checkout</DialogTitle>
  //                 <DialogDescription>
  //                   Enter your details to complete your purchase.
  //                 </DialogDescription>
  //               </DialogHeader>
  //               <form onSubmit={(e) => { e.preventDefault(); checkout(); }}>
  //                 <div className="grid gap-4 py-4">
  //                   <div className="grid grid-cols-4 items-center gap-4">
  //                     <Label htmlFor="name" className="text-right">
  //                       Name
  //                     </Label>
  //                     <Input id="name" className="col-span-3" />
  //                   </div>
  //                   <div className="grid grid-cols-4 items-center gap-4">
  //                     <Label htmlFor="email" className="text-right">
  //                       Email
  //                     </Label>
  //                     <Input
  //                       id="email"
  //                       type="email"
  //                       className="col-span-3"
  //                       value={email}
  //                       onChange={(e) => setEmail(e.target.value)}
  //                       required
  //                     />
  //                   </div>
  //                   <div className="grid grid-cols-4 items-center gap-4">
  //                     <Label htmlFor="card" className="text-right">
  //                       Card Number
  //                     </Label>
  //                     <Input id="card" className="col-span-3" />
  //                   </div>
  //                 </div>
  //                 <DialogFooter>
  //                   <Button type="submit">Complete Purchase</Button>
  //                 </DialogFooter>
  //               </form>
  //             </DialogContent>
  //           </Dialog>
  //         </div>
  //       </SheetContent>
  //     </Sheet>
  //
  //     <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //       {tickets.map((ticket) => (
  //         <Card key={ticket.id}>
  //           <CardHeader>
  //             <CardTitle>{ticket.eventName}</CardTitle>
  //             <CardDescription>{ticket.eventDate}</CardDescription>
  //           </CardHeader>
  //           <CardContent className="flex flex-col items-center">
  //             <QRCodeSVG value={ticket.id} size={128} />
  //             <div className="mt-4 flex space-x-2">
  //               <Button variant="outline" size="sm" onClick={() => sendEmail(ticket)}>
  //                 <Mail className="mr-2 h-4 w-4" />
  //                 Resend Email
  //               </Button>
  //               <Button variant="outline" size="sm" onClick={() => createCalendarInvite(ticket)}>
  //                 <Calendar className="mr-2 h-4 w-4" />
  //                 Add to Calendar
  //               </Button>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>
  //
  //     <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>{selectedEvent?.name}</DialogTitle>
  //           <DialogDescription>
  //             {selectedEvent?.date} at {selectedEvent?.time}
  //           </DialogDescription>
  //         </DialogHeader>
  //         <div className="mt-4">
  //           <img src={selectedEvent?.image} alt={selectedEvent?.name} className="w-full h-48 object-cover rounded mb-4" />
  //           <p><strong>Location:</strong> {selectedEvent?.location}</p>
  //           <p><strong>Price:</strong> ${selectedEvent?.price}</p>
  //           <p><strong>Tickets Left:</strong> {selectedEvent?.ticketsLeft}</p>
  //           <p className="mt-4">{selectedEvent?.description}</p>
  //         </div>
  //         <DialogFooter>
  //           <Button onClick={() => setSelectedEvent(null)}>Close</Button>
  //           <Button onClick={() => {
  //             addToBasket(selectedEvent.id)
  //             setSelectedEvent(null)
  //           }} disabled={selectedEvent?.ticketsLeft === 0}>
  //             Add to Basket
  //           </Button>
  //         </DialogFooter>
  //       </DialogContent>
  //     </Dialog>
  //   </div>
  )
}