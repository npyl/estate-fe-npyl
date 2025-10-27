import {
    GoogleCalendarUserInfo,
    IsAuthenticatedRes,
} from "@/types/calendar/google";
import getCredentialsForUser, {
    GoogleWorkspaceKeys,
} from "@/pages/api/google/_service/getCredentialsForUser";
import { OAuth2Client } from "google-auth-library";
import AuthService from "./AuthService";
import toNumberSafe from "@/utils/toNumberSafe";

type TUserId = number;
type TWorkspaceDomain = string;

/**
 * ManagerService - Manage oath of multiple workspaces (a.k.a. AuthService)
 */

class ManagerService {
    private readonly domains: Map<TUserId, TWorkspaceDomain>;
    protected readonly workspaces: Map<TWorkspaceDomain, AuthService>;

    constructor() {
        this.domains = new Map();
        this.workspaces = new Map();
    }

    // ------------------------------------------------------------------------------------------------------
    // INTERNAL

    private _dropGoogleWorkspace(s: AuthService) {
        return s.dropGoogleWorkspace();
    }

    protected async _updateKeys(
        Authorization: string,
        keys: GoogleWorkspaceKeys,
        onOldWorkspaceDrop?: () => Promise<void>
    ) {
        const res = await getCredentialsForUser(Authorization);
        if (!res) return null;

        const { domain } = res;

        // Get authService for domain
        const s = this.workspaces.get(domain);
        if (!s) return;

        // 0: drop (disconnect users & remove tokens) existing workspace
        await this._dropGoogleWorkspace(s);

        await onOldWorkspaceDrop?.();

        // 1: update with new keys
        s.setOauth2ClientForKeys(keys);

        // Rename
        this.workspaces.set(keys.domain, s);
        this.workspaces.delete(domain);
    }

    protected authServiceFor(userId: number) {
        const domain = this.domains.get(userId);
        if (!domain) return;
        return this.workspaces.get(domain);
    }

    private async establishDomainAuthServiceRelationship(
        domain: TWorkspaceDomain,
        keys: GoogleWorkspaceKeys
    ) {
        if (this.workspaces.has(domain)) return;

        const authService = new AuthService();
        await authService.initialise(keys);

        this.workspaces.set(domain, authService);
    }

    /**
     * initialise
     * @param Authorization `Bearer ${...}`
     * @returns Receive google workspace credentials from backend
     */
    protected async initialise(userId: number, Authorization: string) {
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
        return this.authServiceFor(userId)?.getWorkspaceDomain();
    }

    async dropGoogleWorkspace(userId: number) {
        const s = this.authServiceFor(userId);
        if (!s) return;
        return await this._dropGoogleWorkspace(s);
    }

    updateKeys(...args: Parameters<typeof this._updateKeys>) {
        return this._updateKeys(...args);
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

export { ManagerService };
export default managerService;
