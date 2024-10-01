import {EventsDashboard} from "@/components/events-dashboard";
import {SocietyEvent} from "@/app/types/SocietyEvent";

export default function Page() {
  const events: SocietyEvent[] = [
    { id: 1, name: 'Summer Music Festival', date: '2023-07-15', time: '14:00', price: 50, ticketsLeft: 1000, location: 'Central Park, New York', description: 'Join us for a day of amazing music performances across multiple stages in the heart of New York City.', image: '/placeholder.svg?height=400&width=600', questions: [], attendees: [] },
    { id: 2, name: 'Tech Conference 2023', date: '2023-08-22', time: '09:00', price: 100, ticketsLeft: 200, location: 'Convention Center, San Francisco', description: 'Explore the latest in technology trends, hear from industry leaders, and network with professionals from around the world.', image: '/placeholder.svg?height=400&width=600', questions: [], attendees: [] },
    { id: 3, name: 'Food & Wine Expo', date: '2023-09-10', time: '11:00', price: 75, ticketsLeft: 500, location: 'Exhibition Hall, Chicago', description: 'Indulge in a culinary adventure featuring top chefs, wine tastings, and gourmet food samples from around the globe.', image: '/placeholder.svg?height=400&width=600', questions: [], attendees: [] },
  ]

  return <EventsDashboard events={events}/>
}