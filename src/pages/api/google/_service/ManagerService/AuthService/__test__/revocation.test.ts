import {
    setupFsMocks,
    createAuthServiceWithMocks,
    createMockUserToken,
} from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - Revocation", () => {
    const mockUserId = 123;
    const mockUserToken = createMockUserToken();

    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("revokeAuthentication", () => {
        it("should revoke credentials and delete tokens", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockResolvedValue(undefined);

            await authService.revokeAuthentication(mockUserId);

            expect(mockOAuth2Client.revokeCredentials).toHaveBeenCalled();
            expect((authService as any).DOUBLE_get(mockUserId)).toBeUndefined();
        });

        it("should handle errors gracefully", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockRejectedValue(new Error("Revoke failed"));

            await expect(
                authService.revokeAuthentication(mockUserId)
            ).resolves.not.toThrow();
        });

        it("should remove tokens from storage", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockResolvedValue(undefined);

            await authService.revokeAuthentication(mockUserId);

            const tokens = (authService as any).DOUBLE_get(mockUserId);
            expect(tokens).toBeUndefined();
        });
    });

    describe("dropGoogleWorkspace", () => {
        it("should revoke all user credentials and clear storage", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const userId1 = 1;
            const userId2 = 2;

            await (authService as any).DOUBLE_set(userId1, mockUserToken);
            await (authService as any).DOUBLE_set(userId2, {
                ...mockUserToken,
                accessToken: "token2",
            });

            mockOAuth2Client.setCredentials = jest.fn();
            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockResolvedValue(undefined);

            await authService.dropGoogleWorkspace();

            expect(mockOAuth2Client.revokeCredentials).toHaveBeenCalledTimes(2);
            expect((authService as any).DOUBLE_get(userId1)).toBeUndefined();
            expect((authService as any).DOUBLE_get(userId2)).toBeUndefined();
        });

        it("should invalidate oauth2Client", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            mockOAuth2Client.setCredentials = jest.fn();
            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockResolvedValue(undefined);

            await authService.dropGoogleWorkspace();

            expect((authService as any).oauth2Client).toBeUndefined();
        });

        it("should handle revocation errors for individual users", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const userId1 = 1;
            const userId2 = 2;

            await (authService as any).DOUBLE_set(userId1, mockUserToken);
            await (authService as any).DOUBLE_set(userId2, {
                ...mockUserToken,
                accessToken: "token2",
            });

            mockOAuth2Client.setCredentials = jest.fn();
            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockRejectedValueOnce(new Error("Revoke failed for user 1"))
                .mockResolvedValueOnce(undefined);

            await expect(authService.dropGoogleWorkspace()).rejects.toThrow();
        });
    });
});
