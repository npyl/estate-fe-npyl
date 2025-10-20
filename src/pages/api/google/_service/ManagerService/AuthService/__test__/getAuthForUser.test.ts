import "@/_private/JSON";
import {
    setupFsMocks,
    createAuthServiceWithMocks,
    createMockUserToken,
} from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - Get Auth For User", () => {
    const mockUserId = 123;
    const mockUserToken = createMockUserToken();

    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("getAuthForUser", () => {
        it("should return OAuth2Client when token is valid", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            mockOAuth2Client.setCredentials = jest.fn();

            const client = await authService.getAuthForUser(mockUserId);

            expect(client).toBe(mockOAuth2Client);
            expect(mockOAuth2Client.setCredentials).toHaveBeenCalledWith({
                access_token: mockUserToken.accessToken,
                refresh_token: mockUserToken.refreshToken,
                expiry_date: mockUserToken.expiryDate,
            });
        });

        it("should return undefined when user has no tokens", async () => {
            const { authService } = await createAuthServiceWithMocks();

            const client = await authService.getAuthForUser(999);
            expect(client).toBeUndefined();
        });

        it("should refresh token when expired", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const expiredToken = createMockUserToken({
                expiryDate: Date.now() - 1000, // Expired 1 second ago
            });

            await (authService as any).DOUBLE_set(mockUserId, expiredToken);

            const newTokens = {
                access_token: "refreshed-access-token",
                expiry_date: Date.now() + 3600000,
            };

            mockOAuth2Client.refreshAccessToken = jest.fn().mockResolvedValue({
                credentials: newTokens,
            });

            const client = await authService.getAuthForUser(mockUserId);

            expect(client).toBe(mockOAuth2Client);
            expect(mockOAuth2Client.refreshAccessToken).toHaveBeenCalled();

            const updatedTokens = (authService as any).DOUBLE_get(mockUserId);
            expect(updatedTokens.accessToken).toBe(newTokens.access_token);
        });

        it("should revoke authentication when refresh fails", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const expiredToken = createMockUserToken({
                expiryDate: Date.now() - 1000,
            });

            await (authService as any).DOUBLE_set(mockUserId, expiredToken);

            mockOAuth2Client.refreshAccessToken = jest
                .fn()
                .mockRejectedValue(new Error("Refresh failed"));
            mockOAuth2Client.revokeCredentials = jest
                .fn()
                .mockResolvedValue(undefined);

            const client = await authService.getAuthForUser(mockUserId);

            expect(client).toBeUndefined();
            expect(mockOAuth2Client.revokeCredentials).toHaveBeenCalled();
        });

        it("should handle token refresh with 5-minute buffer", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            // Token expires in 4 minutes (less than 5-minute buffer)
            const almostExpiredToken = createMockUserToken({
                expiryDate: Date.now() + 4 * 60 * 1000,
            });

            await (authService as any).DOUBLE_set(
                mockUserId,
                almostExpiredToken
            );

            const newTokens = {
                access_token: "refreshed-access-token",
                expiry_date: Date.now() + 3600000,
            };

            mockOAuth2Client.refreshAccessToken = jest.fn().mockResolvedValue({
                credentials: newTokens,
            });

            await authService.getAuthForUser(mockUserId);

            expect(mockOAuth2Client.refreshAccessToken).toHaveBeenCalled();
        });
    });
});
