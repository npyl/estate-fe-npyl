import { OAuth2Client } from "google-auth-library";
import AuthService from "@/pages/api/google/_service/ManagerService/AuthService";
import { GoogleWorkspaceKeys } from "@/pages/api/google/_service/getCredentialsForUser";
import * as fs from "node:fs/promises";

export const mockedFs = fs as jest.Mocked<typeof fs>;

export const mockKeys: GoogleWorkspaceKeys = {
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    domain: "test-domain.com",
};

export const createMockUserToken = (overrides?: {
    accessToken?: string;
    refreshToken?: string;
    expiryDate?: number;
}) => ({
    accessToken: overrides?.accessToken ?? "mock-access-token",
    refreshToken: overrides?.refreshToken ?? "mock-refresh-token",
    expiryDate: overrides?.expiryDate ?? Date.now() + 3600000, // 1 hour from now
});

export const setupFsMocks = () => {
    mockedFs.access.mockResolvedValue(undefined);
    mockedFs.readFile.mockResolvedValue(JSON.stringify({}));
    mockedFs.writeFile.mockResolvedValue(undefined);
    mockedFs.mkdir.mockResolvedValue(undefined);
};

export const createAuthServiceWithMocks = async (
    keys: GoogleWorkspaceKeys = mockKeys
): Promise<{
    authService: AuthService;
    mockOAuth2Client: jest.Mocked<OAuth2Client>;
}> => {
    const authService = new AuthService();
    await authService.initialise(keys);

    const mockOAuth2Client = (authService as any)
        .oauth2Client as jest.Mocked<OAuth2Client>;

    return { authService, mockOAuth2Client };
};

export const setupFetchMock = (
    mockResponse: any,
    ok: boolean = true
): jest.Mock => {
    return (global.fetch = jest.fn().mockResolvedValue({
        ok,
        json: jest.fn().mockResolvedValue(mockResponse),
    }));
};
