import fs from "node:fs/promises";
import { TOKEN_FILE_PATH } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/constants";
import {
    StoredToken,
    Store,
} from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import { GetAllTokensRes } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";

const mockedFs = fs as jest.Mocked<typeof fs>;

// -------------------------------------------------------------------------------
// Test Data Constants
// -------------------------------------------------------------------------------

export const TEST_DOMAIN = "example.com";
export const OTHER_DOMAIN = "other.com";

export const SAMPLE_TOKENS: StoredToken[] = [
    {
        userId: 1,
        accessToken: "access1",
        refreshToken: "refresh1",
        expiryDate: 1000,
    },
    {
        userId: 2,
        accessToken: "access2",
        refreshToken: "refresh2",
        expiryDate: 2000,
    },
];

export const SINGLE_TOKEN: StoredToken[] = [
    {
        userId: 1,
        accessToken: "access1",
        refreshToken: "refresh1",
        expiryDate: 1000,
    },
];

export const THREE_TOKENS: StoredToken[] = [
    {
        userId: 1,
        accessToken: "access1",
        refreshToken: "refresh1",
        expiryDate: 1000,
    },
    {
        userId: 2,
        accessToken: "access2",
        refreshToken: "refresh2",
        expiryDate: 2000,
    },
    {
        userId: 3,
        accessToken: "access3",
        refreshToken: "refresh3",
        expiryDate: 3000,
    },
];

export const EMPTY_TOKENS: StoredToken[] = [];

export const NON_EXISTENT_USER_ID = 999;

export const UPDATED_TOKEN: StoredToken = {
    userId: 1,
    accessToken: "newAccess1",
    refreshToken: "newRefresh1",
    expiryDate: 5000,
};

export const NEW_TOKEN: StoredToken = {
    userId: 2,
    accessToken: "access2",
    refreshToken: "refresh2",
    expiryDate: 2000,
};

export const ERRORS = {
    READ: new Error("Read error"),
    WRITE: new Error("Write error"),
    DELETE: new Error("Delete error"),
    PERMISSION_DENIED: new Error("Permission denied"),
    FILE_NOT_EXIST: new Error("File does not exist"),
    UNEXPECTED: new Error("Unexpected error"),
};

// -------------------------------------------------------------------------------
// Mock Helpers
// -------------------------------------------------------------------------------

export const mockStoreData = (store: Store) =>
    mockedFs.readFile.mockResolvedValue(JSON.stringify(store));

export const mockFileReadError = (error: Error = ERRORS.READ) => {
    mockedFs.readFile.mockRejectedValue(error);
};

export const mockFileWriteError = (error: Error = ERRORS.WRITE) => {
    mockedFs.writeFile.mockRejectedValue(error);
};

// -------------------------------------------------------------------------------
// Assertion Helpers
// -------------------------------------------------------------------------------

export const expectWrittenStore = (expectedStore: Store) =>
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
        TOKEN_FILE_PATH,
        JSON.stringify(expectedStore, null, 2)
    );

export const getLastWrittenData = (): Store => {
    const lastCall = mockedFs.writeFile.mock.calls.at(-1);
    if (!lastCall) throw new Error("No writeFile calls found");
    return JSON.parse(lastCall[1] as string);
};

export const expectGetAllTokens = (
    res: GetAllTokensRes,
    tokens: StoredToken[],
    store: Store
) => expect(res).toEqual({ tokens, store });
