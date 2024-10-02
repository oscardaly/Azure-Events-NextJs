import {EventsDashboard} from "@/components/events-dashboard";
import {events} from "@/app/types/SocietyEvent";

export default function Page() {
  return <EventsDashboard events={events}/>
}