import { ManagerService } from "@/pages/api/google/_service/ManagerService";
import DoubleStore from "../AuthService/DoubleStore";
import { UserToken } from "../AuthService/types";

class DoubleStoreFriend extends DoubleStore {
    DOUBLE_getAll(): MapIterator<UserToken> {
        return this.DOUBLE_getAll();
    }
}

class TestManagerService extends ManagerService {
    addWorkspace = (...args: Parameters<ManagerService["initialise"]>) =>
        this.initialise(...args);

    //----------------------------------------------------------------------------------------------

    expectUserAndWorkspaceBound(userId: number, domain: string) {
        const s = this.authServiceFor(userId);
        expect(s?.getWorkspaceDomain()).toBe(domain);
    }

    expectUserAndWorkspaceUnbound(userId: number) {
        const s = this.authServiceFor(userId);
        expect(s).not.toBe(undefined);

        const t = (s as unknown as DoubleStoreFriend).DOUBLE_getAll();
        expect(t).not.toBe({});
        const tokens = Array.from(t);
        expect(tokens.length).toBe(0);
    }

    //----------------------------------------------------------------------------------------------
}

export default TestManagerService;
