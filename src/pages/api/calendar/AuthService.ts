import { OAuth2Client } from "google-auth-library";
import { IsAuthenticatedRes } from "@/types/calendar/google";

interface UserToken {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

const SCOPES = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/userinfo.profile",
];

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

export class AuthService {
    protected userTokens: Map<number, UserToken> = new Map();
    protected oauth2Client: OAuth2Client;

    constructor() {
        this.oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
    }

    async getAuthUrl(userId: number): Promise<string> {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
            state: userId.toString(),
        });

        return authUrl;
    }

    async handleAuthCallback(code: string, state: string): Promise<void> {
        const userId = parseInt(state, 10);
        const { tokens, res } = await this.oauth2Client.getToken(code);

        if (tokens.access_token && tokens.refresh_token && tokens.expiry_date) {
            this.userTokens.set(userId, {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiryDate: tokens.expiry_date,
            });
            return;
        }

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

    protected async getAuthForUser(
        userId: number
    ): Promise<OAuth2Client | null> {
        const userToken = this.userTokens.get(userId);
        if (!userToken) return null;

        this.oauth2Client.setCredentials({
            access_token: userToken.accessToken,
            refresh_token: userToken.refreshToken,
            expiry_date: userToken.expiryDate,
        });

        // Uncomment if you want to handle token refresh
        // if (this.oauth2Client.isTokenExpiring()) {
        //     const { credentials } = await this.oauth2Client.refreshAccessToken();
        //     this.updateUserToken(userId, credentials);
        // }

        return this.oauth2Client;
    }

    async isAuthenticated(userId: number): Promise<IsAuthenticatedRes> {
        const userToken = this.userTokens.get(userId);
        if (!userToken) return { isAuthenticated: false };

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
        try {
            await this.oauth2Client.revokeCredentials();
            this.userTokens.delete(userId);
        } catch (ex) {
            console.error(ex);
        }
    }
}
