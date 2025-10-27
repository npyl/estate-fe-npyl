import { setupFsMocks, createAuthServiceWithMocks } from "./utils";

jest.mock("node:fs/promises");

describe("AuthService - Auth URL", () => {
    const mockUserId = 123;

    beforeEach(() => {
        jest.clearAllMocks();
        setupFsMocks();
    });

    describe("getAuthUrl", () => {
        it("should generate auth URL with correct parameters", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const mockUrl = "https://accounts.google.com/o/oauth2/auth?...";
            mockOAuth2Client.generateAuthUrl = jest
                .fn()
                .mockReturnValue(mockUrl);

            const url = await authService.getAuthUrl(mockUserId);

            expect(url).toBe(mockUrl);
            expect(mockOAuth2Client.generateAuthUrl).toHaveBeenCalledWith({
                access_type: "offline",
                scope: expect.any(Array),
                state: mockUserId.toString(),
                prompt: "select_account",
            });
        });

        it("should include userId in state parameter", async () => {
            const { authService, mockOAuth2Client } =
                await createAuthServiceWithMocks();

            const differentUserId = 456;
            mockOAuth2Client.generateAuthUrl = jest
                .fn()
                .mockReturnValue("mock-url");

            await authService.getAuthUrl(differentUserId);

            expect(mockOAuth2Client.generateAuthUrl).toHaveBeenCalledWith(
                expect.objectContaining({
                    state: differentUserId.toString(),
                })
            );
        });
    });
});
