import { calendar, calendar_v3 } from "@googleapis/calendar";
import { admin, admin_directory_v1 } from "@googleapis/admin";
import AuthService from "./AuthService";

// e.g. npylarinos@digipath.gr -> digipath.gr
const WORKSPACE_DOMAIN = process.env.GOOGLE_WORKSPACE_DOMAIN;

class CalendarService extends AuthService {
    private calendar: calendar_v3.Calendar;
    private directory: admin_directory_v1.Admin;

    constructor() {
        super();
        this.calendar = calendar({ version: "v3" });
        this.directory = admin({ version: "directory_v1" });
    }

    async getUsers(userId: number) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) return { data: { items: [] } };

        const response = await this.directory.users.list({
            domain: WORKSPACE_DOMAIN,
            auth,
        });

        return response?.data?.users;
    }

    // --------------------------------------------------------------------

    async getEvents(userId: number, startDate: string, endDate: string) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) return { data: { items: [] } };

        return await this.calendar.events.list({
            calendarId: "primary",
            timeMin: startDate,
            timeMax: endDate,
            auth,
        });
    }

    async searchEvents(
        userId: number,
        query: string,
        startDate: string | undefined,
        endDate: string | undefined
    ) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) return { data: { items: [] } };

        return await this.calendar.events.list({
            calendarId: "primary",
            timeMin: startDate,
            timeMax: endDate,
            q: query,
            auth,
        });
    }

    async createEvent(userId: number, body: calendar_v3.Schema$Event) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) throw new Error("Could not find user!");

        const res = await this.calendar.events.insert({
            auth,
            calendarId: "primary",
            requestBody: body,
        });

        if (res.status !== 200) throw new Error("Failed to create event");

        // return id
        return res.data.id;
    }

    async updateEvent(userId: number, body: calendar_v3.Schema$Event) {
        if (!body.id) throw new Error("Event ID is required!");

        const auth = await this.getAuthForUser(userId);
        if (!auth) throw new Error("Could not find user!");

        return await this.calendar.events.update({
            auth,
            calendarId: "primary",
            eventId: body.id,
            requestBody: body,
        });
    }

    async deleteEvent(userId: number, eventId: string) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) throw new Error("Could not find user!");

        return await this.calendar.events.delete({
            calendarId: "primary",
            eventId,
            auth,
        });
    }
}

// ------------------------------------------------------------------------------

// singleton.ts
const CalendarServiceSingleton = () => {
    return new CalendarService();
};

declare global {
    // eslint-disable-next-line no-var
    var calendarGlobal: undefined | ReturnType<typeof CalendarServiceSingleton>;
}

const calendarService = globalThis.calendarGlobal ?? CalendarServiceSingleton();

if (process.env.NODE_ENV !== "production")
    globalThis.calendarGlobal = calendarService;

// ------------------------------------------------------------------------------

export default calendarService;
