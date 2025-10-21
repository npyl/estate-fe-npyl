import {
    setupFsMocks,
    createAuthServiceWithMocks,
    createMockUserToken,
    setupFetchMock,
} from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - User Info", () => {
    const mockUserId = 123;
    const mockUserToken = createMockUserToken();

    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("getUserInfo", () => {
        it("should return user info when authenticated", async () => {
            const { authService } = await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            const mockUserInfo = {
                email: "test@test-domain.com",
                name: "Test User",
                picture: "https://example.com/picture.jpg",
            };

            setupFetchMock(mockUserInfo);

            const userInfo = await authService.getUserInfo(mockUserId);

            expect(userInfo).toEqual(mockUserInfo);
            expect(fetch).toHaveBeenCalledWith(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${mockUserToken.accessToken}`,
                    },
                    method: "GET",
                }
            );
        });

        it("should return null when user has no tokens", async () => {
            const { authService } = await createAuthServiceWithMocks();

            const userInfo = await authService.getUserInfo(999);
            expect(userInfo).toBeNull();
        });

        it("should return null when API call fails", async () => {
            const { authService } = await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            setupFetchMock({ error: "Unauthorized" }, false);

            const userInfo = await authService.getUserInfo(mockUserId);
            expect(userInfo).toBeNull();
        });

        it("should use correct access token in request", async () => {
            const { authService } = await createAuthServiceWithMocks();

            const customToken = createMockUserToken({
                accessToken: "custom-access-token",
            });

            await (authService as any).DOUBLE_set(mockUserId, customToken);

            setupFetchMock({ email: "test@test.com" });

            await authService.getUserInfo(mockUserId);

            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: {
                        Authorization: `Bearer custom-access-token`,
                    },
                })
            );
        });
    });

    describe("isAuthenticated", () => {
        it("should return authenticated status with user info", async () => {
            const { authService } = await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            const mockUserInfo = {
                email: "test@test-domain.com",
                name: "Test User",
            };

            setupFetchMock(mockUserInfo);

            const result = await authService.isAuthenticated(mockUserId);

            expect(result).toEqual({
                isAuthenticated: true,
                userInfo: mockUserInfo,
            });
        });

        it("should return not authenticated when getUserInfo fails", async () => {
            const { authService } = await createAuthServiceWithMocks();

            const result = await authService.isAuthenticated(999);

            expect(result).toEqual({
                isAuthenticated: false,
            });
        });

        it("should return not authenticated when API returns error", async () => {
            const { authService } = await createAuthServiceWithMocks();

            await (authService as any).DOUBLE_set(mockUserId, mockUserToken);

            setupFetchMock({ error: "Unauthorized" }, false);

            const result = await authService.isAuthenticated(mockUserId);

            expect(result).toEqual({
                isAuthenticated: false,
            });
        });
    });
});
