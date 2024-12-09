import {AdminDashboard} from "@/components/admin-dashboard";
import {SocietyEvent} from "@/app/types/SocietyEvent";
import {EventAnalyticsData} from "@/app/types/EventAnalyticsData";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {getEvents} from "@/app/api/events/rest";

export default async function AdminPage() {
    const initialEvents: SocietyEvent[] = await getEvents();

    const analyticsData: EventAnalyticsData[] = [
        { name: 'Jan', tickets: 400, revenue: 20000 },
        { name: 'Feb', tickets: 300, revenue: 15000 },
        { name: 'Mar', tickets: 200, revenue: 10000 },
        { name: 'Apr', tickets: 278, revenue: 13900 },
        { name: 'May', tickets: 189, revenue: 9450 },
        { name: 'Jun', tickets: 239, revenue: 11950 },
    ]

    const cookieStore = cookies()
    const isAuthenticated = cookieStore.get('auth')?.value === 'true'

    if (!isAuthenticated) {
        redirect('/signin')
    }

    return (
        <div>
            <AdminDashboard initialEvents={initialEvents} eventAnalyticsData={analyticsData}/>
        </div>
    )
}