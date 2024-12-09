import {SocietyEvent} from "@/app/types/SocietyEvent";
import {
    DELETE_EVENT_BY_ID_API,
    GET_TICKET_BY_ID,
    GET_TICKETS_API,
    UPDATE_EVENTS_API
} from "@/env";
import {Ticket} from "@/app/types/Ticket";

export const updateEvent = async (event: SocietyEvent): Promise<string> => {
    try {
        const response = await fetch(UPDATE_EVENTS_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending request:', error);
        throw new Error('Failed to send request');
    }
};

export const getTickets = async (): Promise<Ticket[]> => {
    try {
        const response = await fetch(GET_TICKETS_API, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(await response.text());
    } catch (error) {
        console.error('Error sending request:', error);
        throw new Error('Failed to send request');
    }
};

export const getTicketById = async (ticketId: string): Promise<Ticket> => {
    try {
        const response = await fetch(GET_TICKET_BY_ID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-ticket-id': ticketId,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(await response.text());
    } catch (error) {
        console.error('Error sending request:', error);
        throw new Error('Failed to send request');
    }
};

export const deleteEventById = async (eventId: string): Promise<SocietyEvent> => {
    try {
        const response = await fetch(DELETE_EVENT_BY_ID_API, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-event-id': eventId
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(await response.text());
    } catch (error) {
        console.error('Error sending request:', error);
        throw new Error('Failed to send request');
    }
};