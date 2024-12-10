import {SocietyEvent} from "@/app/types/SocietyEvent";
import {
    CREATE_TICKET_API,
    DELETE_TICKET_BY_ID_API,
    GET_TICKET_BY_ID,
    GET_TICKETS_API, SEND_EMAIL_CONFIRMATION_API,
} from "@/env";
import {Ticket} from "@/app/types/Ticket";

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
    try {
        const response = await fetch(CREATE_TICKET_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
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

export const sendEmailConfirmation = async (ticket: Ticket): Promise<Ticket> => {
    try {
        const response = await fetch(SEND_EMAIL_CONFIRMATION_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
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

export const deleteTicketById = async (ticketId: string): Promise<SocietyEvent> => {
    try {
        const response = await fetch(DELETE_TICKET_BY_ID_API, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-ticket-id': ticketId
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