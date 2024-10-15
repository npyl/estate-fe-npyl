import { promises as fs } from "fs";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { auth, calendar_v3 } from "@googleapis/calendar";
import { OAuth2Client } from "google-auth-library";
import { calendar } from "@googleapis/calendar";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

console.log("CREDENTIALS: ", CREDENTIALS_PATH);

class CalendarService {
    calendar: calendar_v3.Calendar;

    constructor() {
        console.log("Constructor!");
        this.calendar = calendar({ version: "v3" });
    }

    async getEvents(auth: OAuth2Client) {
        const events = await this.calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            // maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
            auth,
        });

        return events;
    }

    // ------------------------------ Auth -----------------------------------

    /**
     * Reads previously authorized credentials from the save file.
     */
    async loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
        try {
            const content = await fs.readFile(TOKEN_PATH, "utf8");
            const credentials = JSON.parse(content);
            return auth.fromJSON(credentials) as OAuth2Client;
        } catch (err) {
            return null;
        }
    }

    /**
     * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
     */
    async saveCredentials(client: OAuth2Client): Promise<void> {
        const content = await fs.readFile(CREDENTIALS_PATH, "utf8");
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: "authorized_user",
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);
    }

    /**
     * Load or request authorization to call APIs.
     */
    async authenticateForUser(userId: number): Promise<OAuth2Client> {
        let client = await this.loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await this.saveCredentials(client);
        }

        return client;
    }

    isAuthenticated(userId: number) {
        return false;
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
