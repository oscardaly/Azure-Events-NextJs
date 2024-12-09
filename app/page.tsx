import {EventsDashboard} from "@/components/events-dashboard";
import {getEvents} from "@/app/api/events/rest";

export default async function Page() {
  return <EventsDashboard events={await getEvents()}/>
}