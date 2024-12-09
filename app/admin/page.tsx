import {AdminDashboard} from "@/components/admin-dashboard";
import {SocietyEvent} from "@/app/types/SocietyEvent";
import {EventAnalyticsData} from "@/app/types/EventAnalyticsData";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {getEvents} from "@/app/api/events/rest";
import {getTickets} from "@/app/api/tickets/rest";
import {Ticket} from "@/app/types/Ticket";

export default async function AdminPage() {
    const initialEvents: SocietyEvent[] = await getEvents();
    const initialTickets: Ticket[] = await getTickets();

    const analyticsData: EventAnalyticsData[] = [
        { name: 'Jan', tickets: 400, revenue: 20000 },
        { name: 'Feb', tickets: 300, revenue: 15000 },
        { name: 'Mar', tickets: 200, revenue: 10000 },
        { name: 'Apr', tickets: 278, revenue: 13900 },
        { name: 'May', tickets: 189, revenue: 9450 },
        { name: 'Jun', tickets: 239, revenue: 11950 },
    ]

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('auth')
    const isAuthenticated = authCookie?.value === 'true'

    if (!isAuthenticated) {
        redirect('/signin')
    }

    return (
        <div>
            <AdminDashboard initialEvents={initialEvents} initialTickets={initialTickets} eventAnalyticsData={analyticsData}/>
        </div>
    )
}