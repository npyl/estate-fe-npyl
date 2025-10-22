import { OAuth2Client } from "google-auth-library";
import AuthService from "@/pages/api/google/_service/ManagerService/AuthService";
import { mockKeys, createMockUserToken, setupFsMocks, mockedFs } from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - Initialisation", () => {
    const mockUserId = 123;
    const mockUserToken = createMockUserToken();

    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("initialise", () => {
        it("should initialize AuthService with provided keys", async () => {
            const authService = new AuthService();
            await authService.initialise(mockKeys);

            expect(authService.getWorkspaceDomain()).toBe(mockKeys.domain);
            expect((authService as any).oauth2Client).toBeInstanceOf(
                OAuth2Client
            );
        });

        it("should read existing tokens from storage", async () => {
            const existingStore = {
                [mockKeys.domain]: [
                    {
                        userId: mockUserId,
                        ...mockUserToken,
                    },
                ],
            };

            mockedFs.readFile.mockResolvedValue(JSON.stringify(existingStore));

            const authService = new AuthService();
            await authService.initialise(mockKeys);

            const tokens = (authService as any).DOUBLE_get(mockUserId);
            expect(tokens).toEqual(mockUserToken);
        });

        it("should handle empty storage gracefully", async () => {
            mockedFs.readFile.mockResolvedValue(JSON.stringify({}));

            const authService = new AuthService();
            await authService.initialise(mockKeys);

            expect(authService.getWorkspaceDomain()).toBe(mockKeys.domain);
        });
    });

    describe("setOauth2ClientForKeys", () => {
        it("should update OAuth2Client with new keys", async () => {
            const authService = new AuthService();
            await authService.initialise(mockKeys);

            const newKeys = {
                clientId: "new-client-id",
                clientSecret: "new-client-secret",
                domain: "new-domain.com",
            };

            authService.setOauth2ClientForKeys(newKeys);

            expect(authService.getWorkspaceDomain()).toBe(newKeys.domain);
            expect((authService as any).oauth2Client).toBeInstanceOf(
                OAuth2Client
            );
        });
    });
});
