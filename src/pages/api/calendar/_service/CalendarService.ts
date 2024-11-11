import { calendar, calendar_v3 } from "@googleapis/calendar";
import { admin, admin_directory_v1 } from "@googleapis/admin";
import AuthService from "./AuthService";
import { GoogleCalendarUserInfo } from "@/types/calendar/google";

interface CalendarService$IsAdminRes {
    isAdmin: boolean;
    user?: admin_directory_v1.Schema$User;
    userInfo?: GoogleCalendarUserInfo;
}

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

    // ------------------------------------------------------------------

    /**
     * isAdmin
     * @param userId propertypro user id
     * @returns whether the property-pro user happens to be the google workspace's admin + returns the google workspace user anyway to support ui functions
     */
    async isAdmin(userId: number): Promise<CalendarService$IsAdminRes> {
        const auth = await this.getAuthForUser(userId);
        if (!auth) return { isAdmin: false };

        const userInfo = await this.getUserInfo(auth);
        if (!userInfo) return { isAdmin: false };

        try {
            const res = await this.directory.users.get({
                userKey: userInfo.email,
                auth,
            });

            const isAdmin = res?.data?.isAdmin ?? false;

            return { isAdmin, user: res?.data };
        } catch (ex) {
            console.error("Error checking admin status:", ex);
            return { isAdmin: false, userInfo };
        }
    }

    async getUsers(userId: number) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) return [];

        const response = await this.directory.users.list({
            domain: WORKSPACE_DOMAIN,
            auth,
            fields: "users(id,name,primaryEmail,thumbnailPhotoUrl)",
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

    /**
     * createEvent
     * @param userId propertypro user id
     * @param body google calendar event
     * @param userKey google workspace user's email (used to denote a calendar). Leave undefined if you want to create an event for your own calendar
     * @returns created event's id
     */
    async createEvent(
        userId: number,
        body: calendar_v3.Schema$Event,
        userKey?: string
    ) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) throw new Error("Could not find user!");

        const res = await this.calendar.events.insert({
            auth,
            calendarId: userKey || "primary",
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
