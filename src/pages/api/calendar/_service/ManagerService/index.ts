import {
    GoogleCalendarUserInfo,
    IsAuthenticatedRes,
} from "@/types/calendar/google";
import getCredentialsForUser, {
    GoogleWorkspaceKeys,
} from "@/pages/api/google/_service/getCredentialsForUser";
import { OAuth2Client } from "google-auth-library";
import AuthService from "./AuthService";
import tokenService from "./TokenStorage";
import { toNumberSafe } from "@/utils/toNumber";

type TUserId = number;
type TWorkspaceDomain = string;

/**
 * ManagerService - Manage oath of multiple workspaces (a.k.a. AuthService)
 */

class ManagerService {
    private domains: Map<TUserId, TWorkspaceDomain>;
    private workspaces: Map<TWorkspaceDomain, AuthService>;

    constructor() {
        // Initialise singleton instance
        tokenService;

        this.domains = new Map();
        this.workspaces = new Map();
    }

    // ------------------------------------------------------------------------------------------------------
    // INTERNAL

    private authServiceFor(userId: number) {
        const domain = this.domains.get(userId);
        if (!domain) return;
        return this.workspaces.get(domain);
    }

    private async establishDomainAuthServiceRelationship(
        domain: TWorkspaceDomain,
        keys: GoogleWorkspaceKeys
    ) {
        if (this.workspaces.has(domain)) return;

        const authService = new AuthService(keys);
        await authService.initialise();

        this.workspaces.set(domain, authService);
    }

    /**
     * initialise
     * @param Authorization `Bearer ${...}`
     * @returns Receive google workspace credentials from backend
     */
    private async initialise(userId: number, Authorization: string) {
        const keys = await getCredentialsForUser(Authorization);
        if (!keys) return null;

        const { domain } = keys;

        // Establish (user, domain) relationship; if not already
        this.domains.set(userId, domain);

        // Establish (domain, AuthService) relationship if not already
        await this.establishDomainAuthServiceRelationship(domain, keys);
    }

    // ------------------------------------------------------------------------------------------------------
    // USER RELATED

    async getAuthForUser(userId: number): Promise<OAuth2Client | undefined> {
        return await this.authServiceFor(userId)?.getAuthForUser(userId);
    }

    async getAuthUrl(userId: number) {
        return await this.authServiceFor(userId)?.getAuthUrl(userId);
    }

    async handleAuthCallback(code: string, state: string) {
        const userId = toNumberSafe(state);

        return await this.authServiceFor(userId)?.handleAuthCallback(
            code,
            state
        );
    }

    async getUserInfo(userId: number): Promise<GoogleCalendarUserInfo | null> {
        const res = await this.authServiceFor(userId)?.getUserInfo(userId);
        if (!res) return null;
        return res;
    }

    async isAuthenticated(
        Authorization: string,
        userId: number
    ): Promise<IsAuthenticatedRes> {
        await this.initialise(userId, Authorization);

        const res = await this.authServiceFor(userId)?.isAuthenticated(userId);
        if (!res) return { isAuthenticated: false };

        return res;
    }

    async revokeAuthentication(userId: number) {
        await this.authServiceFor(userId)?.revokeAuthentication(userId);
    }

    // ---------------------------------------------------------------------------------------------------------
    // WORKSPACE

    getWorkspaceDomain(userId: number) {
        return this.authServiceFor(userId)?.WORKSPACE_DOMAIN;
    }

    async dropGoogleWorkspace(userId: number) {
        return await this.authServiceFor(userId)?.dropGoogleWorkspace();
    }

    async updateKeys(Authorization: string, keys: GoogleWorkspaceKeys) {
        const res = await getCredentialsForUser(Authorization);
        if (!res) return null;

        const { domain } = res;

        this.workspaces.get(domain)?.setOauth2ClientForKeys(keys);
    }
}

// ---------------------------------------------------------------------

const ManagerServiceSingleton = () => {
    return new ManagerService();
};

declare global {
    // eslint-disable-next-line no-var
    var managerGlobal: undefined | ReturnType<typeof ManagerServiceSingleton>;
}

const managerService = globalThis.managerGlobal ?? ManagerServiceSingleton();

if (process.env.NODE_ENV !== "production")
    globalThis.managerGlobal = managerService;

// ------------------------------------------------------------------------------

export default managerService;
