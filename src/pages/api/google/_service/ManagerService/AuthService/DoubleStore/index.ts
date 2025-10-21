import tokenService from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import { UserToken } from "@/pages/api/google/_service/ManagerService/AuthService/types";
import { StoredToken } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";

class DoubleStore {
    // e.g. npylarinos@digipath.gr -> digipath.gr
    protected WORKSPACE_DOMAIN: string | undefined;

    private readonly userTokens: Map<number, UserToken> = new Map();

    protected async DOUBLE_initialise() {
        // Initialise Store
        const res0 = await tokenService.initialize();
        if (!res0) return false;

        // Initialise this.userTokens
        const res = await tokenService.getAllTokens(this.WORKSPACE_DOMAIN!);
        const { tokens } = res;
        for (const { userId, ...t } of tokens) {
            this.userTokens.set(userId, t);
        }

        return true;
    }

    protected async DOUBLE_set(userId: number, token: UserToken) {
        const st: StoredToken = { userId, ...token };

        // Store
        const res = await tokenService.saveToken(this.WORKSPACE_DOMAIN!, st);
        if (!res) return false;

        this.userTokens.set(userId, token);

        return true;
    }

    protected async DOUBLE_delete(userId: number) {
        const res = await tokenService.deleteToken(
            this.WORKSPACE_DOMAIN!,
            userId
        );
        if (!res) return false;

        this.userTokens.delete(userId);

        return true;
    }

    /**
     * Remove all users from our storage (a.k.a log them out), clear our in-memory record of logged-in users
     */
    protected async DOUBLE_deleteAllTokens() {
        const res = await tokenService.deleteAllTokens(this.WORKSPACE_DOMAIN!);
        if (!res) return false;

        this.userTokens.clear();

        return true;
    }

    protected DOUBLE_get(userId: number) {
        return this.userTokens.get(userId);
    }

    protected DOUBLE_getAll() {
        return this.userTokens.values();
    }
}

export default DoubleStore;
