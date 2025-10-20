import fs from "node:fs/promises";
import { TOKEN_FILE_PATH } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/constants";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import { UserToken } from "@/pages/api/google/_service/ManagerService/AuthService/types";

export const mockedFs = fs as jest.Mocked<typeof fs>;

// Test data constants
export const TEST_DOMAIN = "example.com";
export const OTHER_DOMAIN = "other.com";
export const USER_ID_1 = 1;
export const USER_ID_2 = 2;
export const USER_ID_3 = 3;

export const TOKEN_1: UserToken = {
    accessToken: "access1",
    refreshToken: "refresh1",
    expiryDate: 1000,
};

export const TOKEN_2: UserToken = {
    accessToken: "access2",
    refreshToken: "refresh2",
    expiryDate: 2000,
};

export const TOKEN_3: UserToken = {
    accessToken: "access3",
    refreshToken: "refresh3",
    expiryDate: 3000,
};

export const UPDATED_TOKEN_1: UserToken = {
    accessToken: "newAccess1",
    refreshToken: "newRefresh1",
    expiryDate: 5000,
};

// Test helpers
export const mockStoreData = (store: Store) =>
    mockedFs.readFile.mockResolvedValue(JSON.stringify(store));

export const mockFileReadError = (error: Error = new Error("Read error")) => {
    mockedFs.readFile.mockRejectedValue(error);
};

export const expectWrittenStore = (expectedStore: Store) =>
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
        TOKEN_FILE_PATH,
        JSON.stringify(expectedStore, null, 2)
    );

export const setupDefaultMocks = () => {
    mockedFs.mkdir.mockResolvedValue(undefined);
    mockedFs.writeFile.mockResolvedValue(undefined);
};
