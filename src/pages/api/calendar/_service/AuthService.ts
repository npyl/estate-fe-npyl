import { OAuth2Client } from "google-auth-library";
import { IsAuthenticatedRes } from "@/types/calendar/google";
import { TokenStorage } from "./TokenStorage";

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
    private tokenStorage: TokenStorage;

    constructor() {
        this.oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        this.tokenStorage = new TokenStorage();
        this.tokenStorage.initialize();
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

            // Store refresh token using TokenStorage
            await this.tokenStorage.saveToken(userId, tokens.refresh_token);

            return;
        }

        if (res?.data?.access_token && res?.data?.expiry_date) {
            // INFO: fetch refreshToken from our persistent storage so that we have up to date memory
            const refreshToken =
                (await this.tokenStorage.getToken(userId)) || "";

            console.log("recovered refreshToken: ", refreshToken);

            this.userTokens.set(userId, {
                accessToken: res.data.access_token,
                refreshToken,
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

        return this.oauth2Client;
    }

    async isAuthenticated(userId: number): Promise<IsAuthenticatedRes> {
        try {
            const auth = await this.getAuthForUser(userId);
            if (!auth) return { isAuthenticated: false };

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
            await this.tokenStorage.deleteToken(userId);
            this.userTokens.delete(userId);
        } catch (ex) {
            console.error(ex);
        }
    }
}
