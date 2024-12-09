import {Attendee} from "@/app/types/Attendee";

export interface SocietyEvent {
    id: number;
    name: string;
    date: string;
    time: string;
    price: number;
    ticketsLeft: number;
    location: string;
    description: string;
    filePath: string;
    fileLocator: string;
    questions: string[];
    attendees: Attendee[];
}