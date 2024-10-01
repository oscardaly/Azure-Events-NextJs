import {AdminDashboard} from "@/components/admin-dashboard";
import {SocietyEvent} from "@/app/types/SocietyEvent";
import {EventAnalyticsData} from "@/app/types/EventAnalyticsData";

export default function AdminPage() {
    const initialEvents: SocietyEvent[] = [
        { id: 1, name: 'Summer Music Festival', date: '2023-07-15', time: '14:00', price: 50, ticketsLeft: 1000, location: 'Central Park, New York', description: 'Join us for a day of amazing music performances across multiple stages in the heart of New York City.', image: '/placeholder.svg?height=400&width=600', questions: ['Dietary requirements?'], attendees: [] },
        { id: 2, name: 'Tech Conference 2023', date: '2023-08-22', time: '09:00', price: 100, ticketsLeft: 200, location: 'Convention Center, San Francisco', description: 'Explore the latest in technology trends, hear from industry leaders, and network with professionals from around the world.', image: '/placeholder.svg?height=400&width=600', questions: ['T-shirt size?'], attendees: [] },
        { id: 3, name: 'Food & Wine Expo', date: '2023-09-10', time: '11:00', price: 75, ticketsLeft: 500, location: 'Exhibition Hall, Chicago', description: 'Indulge in a culinary adventure featuring top chefs, wine tastings, and gourmet food samples from around the globe.', image: '/placeholder.svg?height=400&width=600', questions: ['Favorite cuisine?'], attendees: [] },
    ]

    const analyticsData: EventAnalyticsData[] = [
        { name: 'Jan', tickets: 400, revenue: 20000 },
        { name: 'Feb', tickets: 300, revenue: 15000 },
        { name: 'Mar', tickets: 200, revenue: 10000 },
        { name: 'Apr', tickets: 278, revenue: 13900 },
        { name: 'May', tickets: 189, revenue: 9450 },
        { name: 'Jun', tickets: 239, revenue: 11950 },
    ]

    return (
        <div>
            <AdminDashboard initialEvents={initialEvents} eventAnalyticsData={analyticsData}/>
        </div>
    )
}