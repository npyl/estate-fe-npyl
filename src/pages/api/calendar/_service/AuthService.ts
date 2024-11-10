import { OAuth2Client } from "google-auth-library";
import { IsAuthenticatedRes } from "@/types/calendar/google";
import { TokenStorage } from "./TokenStorage";

interface UserToken {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

const SCOPES = [
    // calendar
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    // profile (w/ email)
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    // office users list
    "https://www.googleapis.com/auth/admin.directory.user.readonly",
];

/**
 * Check if the current access token is expired
 * @param expiryDate Token expiry timestamp
 * @returns boolean indicating if token is expired
 */
function isTokenExpired(expiryDate: number): boolean {
    // Add a 5-minute buffer to ensure we refresh slightly before expiration
    const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    return Date.now() >= expiryDate - bufferTime;
}

class AuthService {
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

            // TODO: what should we do when we don't have refresh token but the user has an active oauth in his computer ??

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

    /**
     * Refresh the access token using the refresh token
     * @param userId User ID
     * @param refreshToken Refresh token
     * @returns Updated UserToken object
     */
    private async refreshAccessToken(
        userId: number,
        refreshToken: string
    ): Promise<UserToken> {
        try {
            const { credentials } =
                await this.oauth2Client.refreshAccessToken();

            if (!credentials.access_token || !credentials.expiry_date) {
                throw new Error("Failed to refresh access token");
            }

            const updatedToken: UserToken = {
                accessToken: credentials.access_token,
                refreshToken: refreshToken, // Keep the existing refresh token
                expiryDate: credentials.expiry_date,
            };

            console.log("Expired! Got new: ", updatedToken);

            // Update the tokens in memory
            this.userTokens.set(userId, updatedToken);

            return updatedToken;
        } catch (error) {
            console.error("Error refreshing access token:", error);
            throw error;
        }
    }

    protected async getAuthForUser(
        userId: number
    ): Promise<OAuth2Client | null> {
        let userTokens = this.userTokens.get(userId);
        if (!userTokens) return null;

        // Check if the current token is expired
        if (isTokenExpired(userTokens.expiryDate)) {
            try {
                // Refresh the token
                const updatedTokens = await this.refreshAccessToken(
                    userId,
                    userTokens.refreshToken
                );
            } catch (error) {
                console.error("Token refresh failed:", error);

                // If refresh fails, delete the tokens and return null
                await this.revokeAuthentication(userId);
                return null;
            }
        } else {
            // Set credentials
            this.oauth2Client.setCredentials({
                access_token: userTokens.accessToken,
                refresh_token: userTokens.refreshToken,
                expiry_date: userTokens.expiryDate,
            });
        }

        return this.oauth2Client;
    }

    /**
     * Receive profile of an authenticated user
     */
    protected async getUserInfo(auth: OAuth2Client) {
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

    async isAuthenticated(userId: number): Promise<IsAuthenticatedRes> {
        try {
            const auth = await this.getAuthForUser(userId);
            if (!auth) return { isAuthenticated: false };

            const userInfo = await this.getUserInfo(auth);
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

export default AuthService;
