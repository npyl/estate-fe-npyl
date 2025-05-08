import { OAuth2Client } from "google-auth-library";
import {
    GoogleCalendarUserInfo,
    IsAuthenticatedRes,
} from "@/types/calendar/google";
import { GoogleWorkspaceKeys } from "@/pages/api/google/_service/getCredentialsForUser";
import tokenService from "./TokenStorage";
import { toNumberSafe } from "@/utils/toNumber";
import SCOPE from "./SCOPE";

/**
 * AuthService - OAuth & Users manager for a single workspace
 */

// ------------------------------------------------------------------------

const serviceLog = (...s: any) => console.log(`[AuthService]: `, ...s);

// ------------------------------------------------------------------------

interface UserToken {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

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
    private userTokens: Map<number, UserToken> = new Map();
    private oauth2Client!: OAuth2Client;

    // e.g. npylarinos@digipath.gr -> digipath.gr
    WORKSPACE_DOMAIN: string | undefined;

    constructor(keys: GoogleWorkspaceKeys) {
        // Construct singleton
        tokenService;

        this.setOauth2ClientForKeys(keys);
    }

    async getAuthUrl(userId: number) {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPE,
            state: userId.toString(),
            prompt: "select_account",
        });
        return authUrl;
    }

    async handleAuthCallback(code: string, state: string) {
        const userId = toNumberSafe(state);

        const { tokens, res } = await this.oauth2Client.getToken(code);

        if (tokens.access_token && tokens.refresh_token && tokens.expiry_date) {
            this.userTokens.set(userId, {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiryDate: tokens.expiry_date,
            });

            // Store refresh token using TokenStorage
            await tokenService.saveToken(userId, tokens.refresh_token);

            return;
        }

        if (res?.data?.access_token && res?.data?.expiry_date) {
            // INFO: fetch refreshToken from our persistent storage so that we have up to date memory
            const refreshToken = (await tokenService.getToken(userId)) || "";

            // TODO: what should we do when we don't have refresh token but the user has an active oauth in his computer ??

            serviceLog("recovered refreshToken: ", refreshToken);

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

    async getAuthForUser(userId: number): Promise<OAuth2Client | undefined> {
        let userTokens = this.userTokens.get(userId);
        if (!userTokens) return;

        // Check if the current token is expired
        if (isTokenExpired(userTokens.expiryDate)) {
            try {
                // Refresh the token
                await this.refreshAccessToken(userId, userTokens.refreshToken);
            } catch (error) {
                console.error("Token refresh failed:", error);

                // If refresh fails, delete the tokens and return null
                await this.revokeAuthentication(userId);
                return;
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
    async getUserInfo(userId: number): Promise<GoogleCalendarUserInfo | null> {
        try {
            const tokens = this.userTokens.get(userId);
            if (!tokens) throw "Could find token for userId";

            const { accessToken } = tokens;

            const res = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "GET",
                }
            );

            if (!res.ok) throw await res.json();

            return await res.json();
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async isAuthenticated(userId: number): Promise<IsAuthenticatedRes> {
        try {
            const userInfo = await this.getUserInfo(userId);
            if (!userInfo) return { isAuthenticated: false };

            return { isAuthenticated: true, userInfo };
        } catch (ex) {
            console.error(ex);
            return { isAuthenticated: false };
        }
    }

    // ------------------------------------------------------------------------------------------------------

    /**
     * Remove all users from our storage (a.k.a log them out), clear our in-memory record of logged-in users
     */
    private async logoutAllUsers() {
        serviceLog("removing all user tokens (in-memory)");
        this.userTokens.clear();
        serviceLog("removing all user tokens (disk)");
        await tokenService.deleteAllTokens();
    }

    private getRevokeUserPromise = async (tokens: UserToken, i: number) => {
        this.oauth2Client.setCredentials({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            expiry_date: tokens.expiryDate,
        });

        await this.oauth2Client.revokeCredentials();

        serviceLog(`revoked[${i}]: `, tokens.accessToken);
    };

    /**
     * Invalidate oauth2Client instance so that when a pp-user (that is admin) changes his company's google workspace (or deletes it) a new one can be given upon request.
     * Considering our development is also our production and testing (uhhh) this is also helpful for testing.
     */
    async dropGoogleWorkspace() {
        await this.logoutAllUsers();

        serviceLog("revoking workspace access");
        const tokensList = Array.from(this.userTokens.values());
        const promises = tokensList.map(this.getRevokeUserPromise);
        await Promise.all(promises);

        serviceLog("invalidating oauth2Client object");
        this.oauth2Client = undefined!;
    }

    // ------------------------------------------------------------------------------------------------------

    async revokeAuthentication(userId: number) {
        try {
            await this.oauth2Client.revokeCredentials();
            await tokenService.deleteToken(userId);
            this.userTokens.delete(userId);
        } catch (ex) {
            console.error(ex);
        }
    }

    // -------------------------------------------------------------------------------

    setOauth2ClientForKeys = async (keys: GoogleWorkspaceKeys) => {
        serviceLog(keys);

        // INFO: keep this for workspace-related higher-level apis (like calendar)
        this.WORKSPACE_DOMAIN = keys.domain;

        const res = new OAuth2Client(
            keys.clientId,
            keys.clientSecret,
            REDIRECT_URI
        );
        if (!res) return;

        this.oauth2Client = res;
    };

    // ---------------------------------------------------------------------------------

    async initialise() {
        await tokenService.initialize();
    }
}

export default AuthService;
