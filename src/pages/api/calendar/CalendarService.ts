import { calendar_v3 } from "@googleapis/calendar";
import { OAuth2Client } from "google-auth-library";
import { calendar } from "@googleapis/calendar";
import { IsAuthenticatedRes } from "@/types/calendar/google";

interface UserToken {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

/**
 * Receive profile of an authenticated user
 */
async function getUserInfo(auth: OAuth2Client) {
    try {
        const token = (await auth.getAccessToken()).token;

        const res = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
}

const SCOPES = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/userinfo.profile",
];

class CalendarService {
    private calendar: calendar_v3.Calendar;
    private userTokens: Map<number, UserToken> = new Map();
    private oauth2Client: OAuth2Client;

    constructor() {
        this.oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
        this.calendar = calendar({ version: "v3" });
    }

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

    async createEvent(userId: number, body: calendar_v3.Schema$Event) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) return null;

        return await this.calendar.events.insert({
            auth,
            calendarId: "primary",
            requestBody: body,
        });
    }

    async deleteEvent(userId: number, eventId: string) {
        const auth = await this.getAuthForUser(userId);
        if (!auth) throw new Error("Auth Error!");

        return await this.calendar.events.delete({
            calendarId: "primary",
            eventId,
            auth,
        });
    }

    // ------------------------------ Auth -----------------------------------

    async getAuthUrl(userId: number): Promise<string> {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
            state: userId.toString(), // Pass userId as state to identify the user after redirect
        });

        return authUrl;
    }

    async handleAuthCallback(code: string, state: string): Promise<void> {
        const userId = parseInt(state, 10);
        const { tokens, res } = await this.oauth2Client.getToken(code);

        // Case #1: Brand new login
        if (tokens.access_token && tokens.refresh_token && tokens.expiry_date) {
            this.userTokens.set(userId, {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiryDate: tokens.expiry_date,
            });

            return;
        }

        // TODO: check what about this refreshToken???

        // Case #2: Oauth login has happened before but nextjs server was restarted => tokens were lost from memory
        if (res?.data?.access_token && res?.data?.expiry_date) {
            this.userTokens.set(userId, {
                accessToken: res.data.access_token,
                refreshToken: "",
                expiryDate: res.data.expiry_date,
            });

            return;
        }

        throw new Error("Invalid token response");
    }

    private async getAuthForUser(userId: number): Promise<OAuth2Client | null> {
        const userToken = this.userTokens.get(userId);
        if (!userToken) return null;

        this.oauth2Client.setCredentials({
            access_token: userToken.accessToken,
            refresh_token: userToken.refreshToken,
            expiry_date: userToken.expiryDate,
        });

        // if (this.oauth2Client.isTokenExpiring()) {
        //     const { credentials } =
        //         await this.oauth2Client.refreshAccessToken();
        //     this.updateUserToken(userId, credentials);
        // }

        return this.oauth2Client;
    }

    async isAuthenticated(userId: number): Promise<IsAuthenticatedRes> {
        const userToken = this.userTokens.get(userId);
        if (!userToken) {
            return { isAuthenticated: false };
        }

        try {
            const auth = await this.getAuthForUser(userId);
            if (!auth) throw new Error("User is not authenticated!");

            const userInfo = await getUserInfo(auth);

            return { isAuthenticated: true, userInfo };
        } catch (ex) {
            console.error(ex);
            return { isAuthenticated: false };
        }
    }

    async revokeAuthentication(userId: number) {
        await this.oauth2Client.revokeCredentials();
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
