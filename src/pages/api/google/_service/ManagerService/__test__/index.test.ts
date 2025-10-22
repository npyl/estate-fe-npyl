import { GoogleWorkspaceKeys } from "../../getCredentialsForUser";
import {
    AUTHORIZATION0,
    AUTHORIZATION1,
    WORKSPACE0,
    WORKSPACE1,
} from "./constants";
import {
    AuthorizationType,
    // ...
    setupMockGetCredentialsForUser,
    setupOAuth2Client,
} from "./mock";
import TestManagerService from "./TestManageService";

// ------------------------------------------------------------------

jest.mock("node:fs/promises");

setupOAuth2Client();

// ------------------------------------------------------------------

let ms: TestManagerService | undefined = undefined;

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

const WORKSPACE0_USERID = WORKSPACE0.userIds[0];
const WORKSPACE1_USERID = WORKSPACE1.userIds[0];

const addOneWorkspace = async () => {
    // Add DOMAIN0 workspace
    await addWorkspaceAndUser(ms!, AUTHORIZATION0, WORKSPACE0_USERID);
};

const addBothWorkspaces = async () => {
    // Add DOMAIN0 workspace
    await addOneWorkspace();

    // Add DOMAIN1 workspace
    await addWorkspaceAndUser(ms!, AUTHORIZATION1, WORKSPACE1_USERID);
};

// ------------------------------------------------------------------

const FAKE_WORKSPACE_UPDATE: GoogleWorkspaceKeys = {
    ...WORKSPACE0,
    domain: "domain2.com",
};

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
                await addOneWorkspace();

                ms?.expectUserAndWorkspaceBound(
                    WORKSPACE0_USERID,
                    WORKSPACE0.domain
                );
            });
            it("multiple", async () => {
                // Add DOMAIN0 & DOMAIN1 workspace
                await addBothWorkspaces();

                ms?.expectUserAndWorkspaceBound(
                    WORKSPACE0_USERID,
                    WORKSPACE0.domain
                );
                ms?.expectUserAndWorkspaceBound(
                    WORKSPACE1_USERID,
                    WORKSPACE1.domain
                );
            });
        });
    });

    it("dropWorkspace", async () => {
        // Add DOMAIN0 & DOMAIN1 workspace
        await addBothWorkspaces();

        await ms?.dropGoogleWorkspace(WORKSPACE0_USERID);
        ms?.expectUserAndWorkspaceUnbound(WORKSPACE0_USERID);

        await ms?.dropGoogleWorkspace(WORKSPACE1_USERID);
        ms?.expectUserAndWorkspaceUnbound(WORKSPACE1_USERID);
    });

    it("updateKeys", async () => {
        // Add DOMAIN0 & DOMAIN1 workspace
        await addBothWorkspaces();

        // Update Keys, Expect Old Workspace Dropped
        await ms?.updateKeysAndExpectOldWorkspaceDrop(
            WORKSPACE0_USERID,
            AUTHORIZATION0,
            FAKE_WORKSPACE_UPDATE
        );

        // Expect New Workspace Established
        ms?.expectOAuthClient(WORKSPACE0_USERID, FAKE_WORKSPACE_UPDATE);
    });
});
