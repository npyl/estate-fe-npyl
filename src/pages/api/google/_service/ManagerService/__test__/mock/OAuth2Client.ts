// At the top of your test file or in a setup file
jest.mock("google-auth-library");

import { OAuth2Client } from "google-auth-library";

const mockOAuth2Client = OAuth2Client as jest.MockedClass<typeof OAuth2Client>;

const setupOAuth2Client = () => {
    mockOAuth2Client.mockImplementation(
        jest.fn().mockImplementation((clientId, clientSecret) => ({
            _clientId: clientId,
            _clientSecret: clientSecret,
            setCredentials: jest.fn(),
            generateAuthUrl: jest.fn(),
            getToken: jest.fn(),
            refreshAccessToken: jest.fn(),
            revokeCredentials: jest.fn(),
        }))
    );
};

export { setupOAuth2Client };
