import {
    setupFsMocks,
    createAuthServiceWithMocks,
    createMockUserToken,
} from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - Auth Callback", () => {
    const mockUserId = 123;
    const mockUserToken = createMockUserToken();

    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("handleAuthCallback", () => {
        it("should store tokens when all token data is present", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const mockTokens = {
                access_token: "new-access-token",
                refresh_token: "new-refresh-token",
                expiry_date: Date.now() + 3600000,
            };

            mockOAuth2Client.getToken = jest.fn().mockResolvedValue({
                tokens: mockTokens,
                res: null,
            });

            await authService.handleAuthCallback(
                "auth-code",
                mockUserId.toString()
            );

            const storedTokens = (authService as any).DOUBLE_get(mockUserId);
            expect(storedTokens).toEqual({
                accessToken: mockTokens.access_token,
                refreshToken: mockTokens.refresh_token,
                expiryDate: mockTokens.expiry_date,
            });
        });

        it("should handle callback with existing refresh token", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            // First, store a token with refresh token
            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            const mockResponse = {
                data: {
                    access_token: "updated-access-token",
                    expiry_date: Date.now() + 3600000,
                },
            };

            mockOAuth2Client.getToken = jest.fn().mockResolvedValue({
                tokens: {},
                res: mockResponse,
            });

            await authService.handleAuthCallback(
                "auth-code",
                mockUserId.toString()
            );

            const storedTokens = (authService as any).DOUBLE_get(mockUserId);
            expect(storedTokens.accessToken).toBe(
                mockResponse.data.access_token
            );
            expect(storedTokens.refreshToken).toBe(mockUserToken.refreshToken);
        });

        it("should throw error when token response is invalid", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            mockOAuth2Client.getToken = jest.fn().mockResolvedValue({
                tokens: {},
                res: null,
            });

            await expect(
                authService.handleAuthCallback(
                    "auth-code",
                    mockUserId.toString()
                )
            ).rejects.toThrow("Invalid token response");
        });

        it("should parse userId from state parameter", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const mockTokens = {
                access_token: "new-access-token",
                refresh_token: "new-refresh-token",
                expiry_date: Date.now() + 3600000,
            };

            mockOAuth2Client.getToken = jest.fn().mockResolvedValue({
                tokens: mockTokens,
                res: null,
            });

            const differentUserId = 789;
            await authService.handleAuthCallback(
                "auth-code",
                differentUserId.toString()
            );

            const storedTokens = (authService as any).DOUBLE_get(
                differentUserId
            );
            expect(storedTokens).toBeDefined();
        });
    });
});
