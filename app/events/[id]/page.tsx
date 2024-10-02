import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { events } from "@/app/types/SocietyEvent";

export default function EventPage({ params }: { params: { id: string } }) {
    const event = events.find(e => e.id.toString() === params.id)

    if (!event) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>{event.date} at {event.time}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video mb-4">
                        {/*<Image*/}
                        {/*    src={event.image}*/}
                        {/*    alt={event.name}*/}
                        {/*    fill={true}*/}
                        {/*    className="rounded-lg object-cover w-full h-full"*/}
                        {/*/>*/}
                    </div>
                    <p className="text-muted-foreground mb-2">{event.description}</p>
                    <p className="font-semibold">Location: {event.location}</p>
                    <p className="font-semibold">Price: ${event.price}</p>
                    <p className="text-sm text-muted-foreground">Tickets left: {event.ticketsLeft}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Buy Tickets</Button>
                </CardFooter>
            </Card>
        </div>
    )
}