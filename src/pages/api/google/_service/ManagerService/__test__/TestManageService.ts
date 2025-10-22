import { ManagerService } from "@/pages/api/google/_service/ManagerService";
import DoubleStore from "../AuthService/DoubleStore";
import { GoogleWorkspaceKeys } from "../../getCredentialsForUser";
import AuthService from "../AuthService";

class AuthServiceFriend extends AuthService {
    getOAuth2Client() {
        return super.getOAuth2Client();
    }
}

class DoubleStoreFriend extends DoubleStore {
    DOUBLE_getAll() {
        return super.DOUBLE_getAll();
    }
}

class TestManagerService extends ManagerService {
    addWorkspace = (...args: Parameters<ManagerService["initialise"]>) =>
        this.initialise(...args);

    //----------------------------------------------------------------------------------------------
    // HELPERS

    /**
     * Receive all tokens of the current AuthService and expect them to be an empty array
     */
    private expectNobodyLoggedIn(s: AuthService) {
        const t = (s as unknown as DoubleStoreFriend).DOUBLE_getAll();
        expect(t).not.toBe({});
        const tokens = Array.from(t);
        expect(tokens.length).toBe(0);
    }

    expectOAuthClient = (userId: number, w: GoogleWorkspaceKeys) => {
        const s = this.authServiceFor(userId);
        expect(s).not.toBe(undefined);

        const OAuthClient = (s as AuthServiceFriend).getOAuth2Client();
        expect(OAuthClient).not.toBe(undefined);
        expect(OAuthClient?._clientId).toBe(w.clientId);
        expect(OAuthClient?._clientSecret).toBe(w.clientSecret);
        expect(s?.getWorkspaceDomain()).toBe(w.domain);
    };

    //----------------------------------------------------------------------------------------------

    expectUserAndWorkspaceBound(userId: number, domain: string) {
        const s = this.authServiceFor(userId);
        expect(s?.getWorkspaceDomain()).toBe(domain);
    }

    expectUserAndWorkspaceUnbound(userId: number) {
        const s = this.authServiceFor(userId);
        expect(s).not.toBe(undefined);

        this.expectNobodyLoggedIn(s!);
    }

    //----------------------------------------------------------------------------------------------

    private readonly expectOldWorkspaceDropped =
        (userId: number) => async () => {
            const s = this.authServiceFor(userId);
            expect(s).not.toBe(undefined);

            this.expectNobodyLoggedIn(s!);
        };

    updateKeysAndExpectOldWorkspaceDrop = (
        userId: number,
        // ...
        Authorization: string,
        keys: GoogleWorkspaceKeys
    ) =>
        this._updateKeys(
            Authorization,
            keys,
            this.expectOldWorkspaceDropped(userId)
        );
}

export default TestManagerService;
