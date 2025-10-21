import { mockKeys, setupFsMocks, createAuthServiceWithMocks } from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - Workspace", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("getWorkspaceDomain", () => {
        it("should return the workspace domain", async () => {
            const { authService } = await createAuthServiceWithMocks();

            const domain = authService.getWorkspaceDomain();
            expect(domain).toBe(mockKeys.domain);
        });

        it("should return correct domain after key update", async () => {
            const { authService } = await createAuthServiceWithMocks();

            const newKeys = {
                clientId: "new-client-id",
                clientSecret: "new-client-secret",
                domain: "updated-domain.com",
            };

            await authService.setOauth2ClientForKeys(newKeys);

            const domain = authService.getWorkspaceDomain();
            expect(domain).toBe(newKeys.domain);
        });
    });
});
