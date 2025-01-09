import { CalendarEventReq } from "@/types/calendar";
import { GUserMini } from "@/types/user";

interface EventFilters {
    calendarId?: string;
}

interface BasicEventReq {
    userId: number;
}

interface GetEventsReq extends BasicEventReq {
    startDate: string;
    endDate: string;
    filters?: Partial<EventFilters>;
}

interface SearchEventsReq extends BasicEventReq {
    query: string;
    startDate?: string;
    endDate?: string;
    filters?: Partial<EventFilters>;
}

interface DeleteEventReq extends BasicEventReq {
    eventId: string;
}

interface CreateUpdateEventReq extends BasicEventReq {
    body: CalendarEventReq;
}

interface IsAdminRes {
    isAdmin: boolean;
    user?: GUserMini;
}

export type {
    EventFilters,
    GetEventsReq,
    SearchEventsReq,
    DeleteEventReq,
    CreateUpdateEventReq,
    IsAdminRes,
};
