import {SocietyEvent} from "@/app/types/SocietyEvent";
import {
    DELETE_EVENT_BY_ID_API,
    GET_EVENT_BY_ID_API,
    GET_EVENTS_API,
    UPDATE_EVENTS_API
} from "@/env";

export const prepareBase64Content = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            const base64Content = base64String.split(",")[1];
            resolve(base64Content);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

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

export const updateEventTicketsRemaining = async (event: SocietyEvent): Promise<string> => {
    return await updateEvent(event);
};

export const getEvents = async (): Promise<SocietyEvent[]> => {
    try {
        const response = await fetch(GET_EVENTS_API, {
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

export const getEventById = async (eventId: string): Promise<SocietyEvent> => {
    try {
        const response = await fetch(GET_EVENT_BY_ID_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-event-id': eventId,
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

export const deleteEventById = async (eventId: number): Promise<SocietyEvent> => {
    try {
        const response = await fetch(DELETE_EVENT_BY_ID_API, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-event-id': eventId.toString()
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


export async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type") || "application/octet-stream";
    const blob = await response.blob();
    return new File([blob], filename, { type: contentType });
}