import { OAuth2Client } from "google-auth-library";
import {
    GoogleCalendarUserInfo,
    IsAuthenticatedRes,
} from "@/types/calendar/google";
import { GoogleWorkspaceKeys } from "@/pages/api/google/_service/getCredentialsForUser";
import toNumberSafe from "@/utils/toNumberSafe";
import SCOPE from "../SCOPE";
import { UserToken } from "./types";
import DoubleStore from "./DoubleStore";
import { getServiceLogger } from "@/pino";

/**
 * AuthService - OAuth & Users manager for a single workspace
 */

// ------------------------------------------------------------------------

const serviceLog = getServiceLogger("AuthService");

// ------------------------------------------------------------------------

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

class AuthService extends DoubleStore {
    private oauth2Client!: OAuth2Client;

    // --------------------------------------------------------------------------------------------

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
            const token = {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiryDate: tokens.expiry_date,
            };

            // Store refresh token using TokenStorage
            await this.DOUBLE_set(userId, token);

            return;
        }

        if (res?.data?.access_token && res?.data?.expiry_date) {
            // INFO: fetch refreshToken from our persistent storage so that we have up to date memory
            const refreshToken = this.DOUBLE_get(userId)?.refreshToken || "";

            // TODO: what should we do when we don't have refresh token but the user has an active oauth in his computer ??

            serviceLog.debug(refreshToken, "recovered refreshToken: ");

            await this.DOUBLE_set(userId, {
                accessToken: res.data.access_token,
                refreshToken,
                expiryDate: res.data.expiry_date,
            });

            return;
        }

        throw new Error("Invalid token response");
    }

    // -------------------------------------------------------------------------------

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

            // Update the tokens in memory
            await this.DOUBLE_set(userId, updatedToken);

            serviceLog.debug(updatedToken, "Expired! Got new: ");

            return updatedToken;
        } catch (error) {
            serviceLog.error("Error refreshing access token:", error);
            throw error;
        }
    }

    async getAuthForUser(userId: number): Promise<OAuth2Client | undefined> {
        const userTokens = this.DOUBLE_get(userId);
        if (!userTokens) return;

        // Check if the current token is expired
        if (isTokenExpired(userTokens.expiryDate)) {
            try {
                // Refresh the token
                await this.refreshAccessToken(userId, userTokens.refreshToken);
            } catch (error) {
                serviceLog.error("Token refresh failed:", error);

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

    // -------------------------------------------------------------------------------

    /**
     * Receive profile of an authenticated user
     */
    async getUserInfo(userId: number): Promise<GoogleCalendarUserInfo | null> {
        try {
            const tokens = this.DOUBLE_get(userId);
            if (!tokens) throw new Error("Could find token for userId");

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
            serviceLog.error(ex, "getUserInfo");
            return null;
        }
    }

    // -------------------------------------------------------------------------------

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

    private readonly getRevokeUserPromise = async (
        tokens: UserToken,
        i: number
    ) => {
        this.oauth2Client.setCredentials({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            expiry_date: tokens.expiryDate,
        });

        await this.oauth2Client.revokeCredentials();

        serviceLog.debug(`revoked[${i}]: `, tokens.accessToken);
    };

    /**
     * Invalidate oauth2Client instance so that when a pp-user (that is admin) changes his company's google workspace (or deletes it) a new one can be given upon request.
     * Considering our development is also our production and testing (uhhh) this is also helpful for testing.
     */
    async dropGoogleWorkspace() {
        serviceLog.info("revoking workspace access");
        const tokensList = Array.from(this.DOUBLE_getAll());
        const promises = tokensList.map(this.getRevokeUserPromise);
        await Promise.all(promises);

        await this.DOUBLE_deleteAllTokens();

        serviceLog.info("invalidating oauth2Client object");
        this.oauth2Client = undefined!;
    }

    getWorkspaceDomain() {
        return this.WORKSPACE_DOMAIN;
    }

    // ------------------------------------------------------------------------------------------------------

    async revokeAuthentication(userId: number) {
        try {
            await this.oauth2Client.revokeCredentials();
            await this.DOUBLE_delete(userId);
        } catch (ex) {
            serviceLog.error(ex);
        }
    }

    // -------------------------------------------------------------------------------

    setOauth2ClientForKeys = async (keys: GoogleWorkspaceKeys) => {
        serviceLog.info(keys);

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

    // -------------------------------------------------------------------------------

    async initialise(keys: GoogleWorkspaceKeys) {
        await this.setOauth2ClientForKeys(keys);
        await this.DOUBLE_initialise();
    }
}

export default AuthService;
