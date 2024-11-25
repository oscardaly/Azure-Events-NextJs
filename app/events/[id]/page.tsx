import {notFound} from 'next/navigation'
import image from "@/image.png"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {events} from "@/app/types/SocietyEvent";
import Image from "next/image";

export default function EventPage({params}: { params: { id: string } }) {
    const event = events.find(e => e.id.toString() === params.id)

    if (!event) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <div className="hero min-h-screen">
                        <Image
                            src={image}
                            alt={event.name}
                            fill={false}
                            className="rounded-lg object-cover w-full h-full"
                        />
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-md">
                                <CardTitle className="mb-5 text-5xl font-bold">{event.name}</CardTitle>
                                <CardDescription className="mb-5">{event.date} at {event.time}</CardDescription>
                                <Button className="w-full">Buy Tickets</Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-2">{event.description}</p>
                    <p className="font-semibold">Location: {event.location}</p>
                    <p className="font-semibold">Price: ${event.price}</p>
                    <p className="text-sm text-muted-foreground">Tickets left: {event.ticketsLeft}</p>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}