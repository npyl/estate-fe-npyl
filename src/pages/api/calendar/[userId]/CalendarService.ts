import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { calendar_v3 } from "@googleapis/calendar";
import { OAuth2Client } from "google-auth-library";
import { calendar } from "@googleapis/calendar";

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

class CalendarService {
    private calendar: calendar_v3.Calendar;
    private userTokens: Map<number, OAuth2Client> = new Map();

    constructor() {
        this.calendar = calendar({ version: "v3" });
    }

    async getEvents(auth: OAuth2Client) {
        const events = await this.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
            auth,
        });

        return events;
    }

    // ------------------------------ Auth -----------------------------------

    /**
     * Authenticate or get auth object (a.k.a. when already authenticated)
     */
    async authenticateForUser(userId: number): Promise<OAuth2Client> {
        // Attempt to receive tokens from memory
        let auth = this.userTokens.get(userId);
        if (auth) {
            return auth;
        }

        // They didn't exist; Authenticate using google api
        auth = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });

        // Update Map
        this.userTokens.set(userId, auth);

        // Return auth
        return auth;
    }

    isAuthenticated(userId: number) {
        return this.userTokens.has(userId);
    }

    revokeAuthentication(userId: number) {
        this.userTokens.delete(userId);
    }
}

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

export default calendarService;
