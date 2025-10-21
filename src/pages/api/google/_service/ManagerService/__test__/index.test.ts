import { ManagerService } from "@/pages/api/google/_service/ManagerService";
import getCredentialsForUser, {
    GoogleWorkspaceKeys,
} from "../../getCredentialsForUser";
import {
    AUTHORIZATION0,
    AUTHORIZATION1,
    WORKSPACE0,
    WORKSPACE1,
} from "./constants";

// ------------------------------------------------------------------

jest.mock("node:fs/promises");

// ------------------------------------------------------------------

type AuthorizationType = typeof AUTHORIZATION0 | typeof AUTHORIZATION1;

const AUTHORIZATION_DOMAIN_MAP: Record<AuthorizationType, GoogleWorkspaceKeys> =
    {
        [AUTHORIZATION0]: WORKSPACE0,
        [AUTHORIZATION1]: WORKSPACE1,
    };

const getKeysForAuthorization = (
    Authorization: AuthorizationType
): GoogleWorkspaceKeys => AUTHORIZATION_DOMAIN_MAP[Authorization];

// ------------------------------------------------------------------

jest.mock("@/pages/api/google/_service/getCredentialsForUser");

const mockGetCredentialsForUser = getCredentialsForUser as jest.MockedFunction<
    typeof getCredentialsForUser
>;

const setupMockGetCredentialsForUser = (Authorization: AuthorizationType) => {
    mockGetCredentialsForUser.mockResolvedValueOnce(
        getKeysForAuthorization(Authorization)
    );
};

// ------------------------------------------------------------------

class TestManagerService extends ManagerService {
    addWorkspace = (...args: Parameters<ManagerService["initialise"]>) =>
        this.initialise(...args);

    expectUserAndWorkspaceBind(userId: number, domain: string) {
        const s = this.authServiceFor(userId);
        expect(s?.getWorkspaceDomain()).toBe(domain);
    }
}

// ------------------------------------------------------------------

const addWorkspaceAndUser = async (
    ms: TestManagerService,
    Authorization: AuthorizationType,
    userId: number
) => {
    setupMockGetCredentialsForUser(Authorization);
    await ms.addWorkspace(userId, Authorization);
};

// ------------------------------------------------------------------

let ms: TestManagerService | undefined = undefined;

// ------------------------------------------------------------------

describe("ManagerService", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        ms = undefined;

        // initialise service
        ms = new TestManagerService();
    });

    describe("initialisation", () => {
        describe("domain(s)", () => {
            it("single", async () => {
                // Add DOMAIN0 workspace
                await addWorkspaceAndUser(
                    ms!,
                    AUTHORIZATION0,
                    WORKSPACE0.userIds[0]
                );

                ms?.expectUserAndWorkspaceBind(
                    WORKSPACE0.userIds[0],
                    WORKSPACE0.domain
                );
            });
            it("multiple", async () => {
                // Add DOMAIN0 workspace
                await addWorkspaceAndUser(
                    ms!,
                    AUTHORIZATION0,
                    WORKSPACE0.userIds[0]
                );

                // Add DOMAIN1 workspace
                await addWorkspaceAndUser(
                    ms!,
                    AUTHORIZATION1,
                    WORKSPACE1.userIds[0]
                );

                ms?.expectUserAndWorkspaceBind(
                    WORKSPACE0.userIds[0],
                    WORKSPACE0.domain
                );
                ms?.expectUserAndWorkspaceBind(
                    WORKSPACE1.userIds[0],
                    WORKSPACE1.domain
                );
            });
        });
    });
});
