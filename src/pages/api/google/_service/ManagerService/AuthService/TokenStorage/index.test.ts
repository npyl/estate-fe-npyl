import fs from "node:fs/promises";
import path from "node:path";
import tokenService, {
    GetAllTokensRes,
} from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import { TOKEN_FILE_PATH } from "./constants";
import { StoredToken, Store } from "./types";
import "@/_private/JSON";

// -------------------------------------------------------------------------------

jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

// -------------------------------------------------------------------------------

// Test data constants
const TEST_DOMAIN = "example.com";
const OTHER_DOMAIN = "other.com";

const SAMPLE_TOKENS: StoredToken[] = [
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

const SINGLE_TOKEN: StoredToken[] = [
    {
        userId: 1,
        accessToken: "access1",
        refreshToken: "refresh1",
        expiryDate: 1000,
    },
];

const THREE_TOKENS: StoredToken[] = [
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

const EMPTY_TOKENS: StoredToken[] = [];

const NON_EXISTENT_USER_ID = 999;
const UPDATED_TOKEN: StoredToken = {
    userId: 1,
    accessToken: "newAccess1",
    refreshToken: "newRefresh1",
    expiryDate: 5000,
};
const NEW_TOKEN: StoredToken = {
    userId: 2,
    accessToken: "access2",
    refreshToken: "refresh2",
    expiryDate: 2000,
};

const ERRORS = {
    READ: new Error("Read error"),
    WRITE: new Error("Write error"),
    DELETE: new Error("Delete error"),
    PERMISSION_DENIED: new Error("Permission denied"),
    FILE_NOT_EXIST: new Error("File does not exist"),
    UNEXPECTED: new Error("Unexpected error"),
};

// Test helpers
const mockStoreData = (store: Store) =>
    mockedFs.readFile.mockResolvedValue(JSON.stringify(store));

const mockFileReadError = (error: Error = ERRORS.READ) => {
    mockedFs.readFile.mockRejectedValue(error);
};

const mockFileWriteError = (error: Error = ERRORS.WRITE) => {
    mockedFs.writeFile.mockRejectedValue(error);
};

const expectWrittenStore = (expectedStore: Store) =>
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
        TOKEN_FILE_PATH,
        JSON.stringify(expectedStore, null, 2)
    );

const getLastWrittenData = (): Store => {
    const lastCall = mockedFs.writeFile.mock.calls.at(-1);
    if (!lastCall) throw new Error("No writeFile calls found");
    return JSON.parse(lastCall[1] as string);
};

// -------------------------------------------------------------------------------

const expectGetAllTokens = (
    res: GetAllTokensRes,
    tokens: StoredToken[],
    store: Store
) => expect(res).toEqual({ tokens, store });

// -------------------------------------------------------------------------------

describe("TokenStorage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    describe("initialize", () => {
        it("should create directory & file if not existent", async () => {
            mockedFs.mkdir.mockResolvedValue(undefined);
            mockedFs.access.mockRejectedValue(ERRORS.FILE_NOT_EXIST);
            mockedFs.writeFile.mockResolvedValue(undefined);

            const result = await tokenService.initialize();

            expect(result).toBe(true);
            expect(mockedFs.mkdir).toHaveBeenCalledWith(
                path.dirname(TOKEN_FILE_PATH),
                { recursive: true }
            );
            expect(mockedFs.writeFile).toHaveBeenCalledWith(
                TOKEN_FILE_PATH,
                JSON.stringify({}, null, 2)
            );
        });

        it("should not create file if it already exists", async () => {
            mockedFs.access.mockResolvedValue(undefined);

            const result = await tokenService.initialize();

            expect(result).toBe(true);
            expect(mockedFs.access).toHaveBeenCalledWith(TOKEN_FILE_PATH);
            expect(mockedFs.writeFile).not.toHaveBeenCalled();
        });

        it("fail", async () => {
            mockedFs.access.mockRejectedValue(ERRORS.FILE_NOT_EXIST);
            mockedFs.mkdir.mockRejectedValue(ERRORS.PERMISSION_DENIED);
            const result = await tokenService.initialize();
            expect(result).toBe(false);
        });
    });

    describe("getAllTokens", () => {
        it("basic", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);
            const result = await tokenService.getAllTokens(TEST_DOMAIN);
            expectGetAllTokens(result, SAMPLE_TOKENS, store);
        });

        it("non-existent domain", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);
            const result = await tokenService.getAllTokens(OTHER_DOMAIN);
            expectGetAllTokens(result, [], store);
        });

        describe("I/O Errors", () => {
            it("JSON.parseSafe", async () => {
                mockedFs.readFile.mockResolvedValue("invalid json");
                const result = await tokenService.getAllTokens(TEST_DOMAIN);
                expectGetAllTokens(result, [], {});
            });

            it("read", async () => {
                mockFileReadError();
                const result = await tokenService.getAllTokens(TEST_DOMAIN);
                expectGetAllTokens(result, [], {});
            });
        });
    });

    describe("getToken", () => {
        it("existing user", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.getToken(TEST_DOMAIN, 1);

            expect(result).toEqual(SAMPLE_TOKENS[0]);
        });

        it("non-existing user", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.getToken(
                TEST_DOMAIN,
                NON_EXISTENT_USER_ID
            );

            expect(result).toBeUndefined();
        });

        it("tokens: []", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);
            const result = await tokenService.getToken(TEST_DOMAIN, 1);
            expect(result).toBeUndefined();
        });

        it("domain doesnt exist", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);
            const result = await tokenService.getToken(OTHER_DOMAIN, 1);
            expect(result).toBeUndefined();
        });

        describe("I/O Errors", () => {
            it("read", async () => {
                mockFileReadError();
                const result = await tokenService.getToken(TEST_DOMAIN, 1);
                expect(result).toBeUndefined();
            });
        });
    });

    describe("saveToken", () => {
        it("new token; new user", async () => {
            const store: Store = { [TEST_DOMAIN]: SINGLE_TOKEN };
            mockStoreData(store);

            const result = await tokenService.saveToken(TEST_DOMAIN, NEW_TOKEN);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [...SINGLE_TOKEN, NEW_TOKEN],
            });
        });

        it("new token; existing user", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(
                TEST_DOMAIN,
                UPDATED_TOKEN
            );

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [UPDATED_TOKEN, SAMPLE_TOKENS[1]],
            });
        });

        it("new token; no user yet (empty domain)", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(
                TEST_DOMAIN,
                SINGLE_TOKEN[0]
            );

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: SINGLE_TOKEN,
            });
        });

        it("new token; new domain", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(
                OTHER_DOMAIN,
                SINGLE_TOKEN[0]
            );

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: SAMPLE_TOKENS,
                [OTHER_DOMAIN]: SINGLE_TOKEN,
            });
        });

        describe("I/O Errors", () => {
            it("write", async () => {
                const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
                mockStoreData(store);
                mockFileWriteError(ERRORS.WRITE);

                const result = await tokenService.saveToken(
                    TEST_DOMAIN,
                    SINGLE_TOKEN[0]
                );

                expect(result).toBe(false);
            });

            it("read", async () => {
                mockFileReadError();

                const result = await tokenService.saveToken(
                    TEST_DOMAIN,
                    SINGLE_TOKEN[0]
                );

                // INFO: we don't care about fails; we only want to prevent crashes
                expect(result).toBe(true);
            });
        });
    });

    describe("deleteToken", () => {
        it("user exists? [YES]", async () => {
            const store: Store = { [TEST_DOMAIN]: THREE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.deleteToken(
                TEST_DOMAIN,
                THREE_TOKENS[1].userId
            );

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [THREE_TOKENS[0], THREE_TOKENS[2]],
            });
        });

        it("user exists? [NO]", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.deleteToken(
                TEST_DOMAIN,
                NON_EXISTENT_USER_ID
            );

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: SAMPLE_TOKENS,
            });
        });

        it("tokens: []", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);

            const result = await tokenService.deleteToken(TEST_DOMAIN, 1);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: EMPTY_TOKENS,
            });
        });

        it("non-existent domain", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.deleteToken(OTHER_DOMAIN, 1);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: SAMPLE_TOKENS,
                [OTHER_DOMAIN]: [],
            });
        });

        describe("I/O Errors", () => {
            it("write", async () => {
                const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
                mockStoreData(store);
                mockFileWriteError(ERRORS.DELETE);
                const result = await tokenService.deleteToken(TEST_DOMAIN, 1);
                expect(result).toBe(false);
            });

            it("read", async () => {
                const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
                mockStoreData(store);
                mockFileReadError(ERRORS.READ);
                const result = await tokenService.deleteToken(TEST_DOMAIN, 1);

                // INFO: we don't care about fails; we only want to prevent crashes
                expect(result).toBe(true);
            });
        });
    });

    describe("deleteAllTokens", () => {
        it("domain [EXISTS]", async () => {
            const store: Store = {
                [TEST_DOMAIN]: SAMPLE_TOKENS,
                [OTHER_DOMAIN]: SINGLE_TOKEN,
            };
            mockStoreData(store);

            const result = await tokenService.deleteAllTokens(TEST_DOMAIN);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: EMPTY_TOKENS,
                [OTHER_DOMAIN]: SINGLE_TOKEN,
            });
        });

        it("domain [NON_EXISTENT]", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const result = await tokenService.deleteAllTokens(OTHER_DOMAIN);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: SAMPLE_TOKENS,
                [OTHER_DOMAIN]: [],
            });
        });

        describe("I/O Errors", () => {
            it("read", async () => {
                mockFileReadError();
                const result = await tokenService.deleteAllTokens(TEST_DOMAIN);
                expect(result).toBe(true);
            });

            it("write", async () => {
                mockFileWriteError(ERRORS.WRITE);
                const result = await tokenService.deleteAllTokens(TEST_DOMAIN);
                expect(result).toBe(false);
            });
        });
    });

    describe("Singleton behavior", () => {
        it("non-production", () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = "development";

            expect(tokenService).toBeDefined();
            expect((globalThis as any).tokenServiceGlobal).toBeDefined();

            process.env.NODE_ENV = originalEnv;
        });

        it("production", () => {
            const originalEnv = process.env.NODE_ENV;
            const originalGlobal = (globalThis as any).tokenServiceGlobal;

            process.env.NODE_ENV = "production";
            delete (globalThis as any).tokenServiceGlobal;

            expect(tokenService).toBeDefined();

            process.env.NODE_ENV = originalEnv;
            (globalThis as any).tokenServiceGlobal = originalGlobal;
        });
    });

    describe("Edge cases", () => {
        it("should handle multiple tokens for same user (keeping last one)", async () => {
            const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
            mockStoreData(store);

            const updatedToken1 = {
                userId: 1,
                accessToken: "updated1",
                refreshToken: "updatedRefresh1",
                expiryDate: 9000,
            };
            await tokenService.saveToken(TEST_DOMAIN, updatedToken1);

            // Re-mock with the updated store for the next call
            const intermediateStore: Store = {
                [TEST_DOMAIN]: [updatedToken1, SAMPLE_TOKENS[1]],
            };
            mockStoreData(intermediateStore);

            const finalToken = {
                userId: 1,
                accessToken: "final1",
                refreshToken: "finalRefresh1",
                expiryDate: 10000,
            };
            await tokenService.saveToken(TEST_DOMAIN, finalToken);

            const writtenData = getLastWrittenData();
            const userToken = writtenData[TEST_DOMAIN].find(
                (t: StoredToken) => t.userId === 1
            );
            expect(userToken?.accessToken).toBe("final1");
            expect(userToken?.refreshToken).toBe("finalRefresh1");
            expect(userToken?.expiryDate).toBe(10000);
        });

        it("should handle userId of 0", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(TEST_DOMAIN, {
                userId: 0,
                accessToken: "access0",
                refreshToken: "refresh0",
                expiryDate: 0,
            });

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [
                    {
                        userId: 0,
                        accessToken: "access0",
                        refreshToken: "refresh0",
                        expiryDate: 0,
                    },
                ],
            });
        });

        it("should handle negative userId", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(TEST_DOMAIN, {
                userId: -1,
                accessToken: "accessNeg",
                refreshToken: "refreshNeg",
                expiryDate: -1,
            });

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [
                    {
                        userId: -1,
                        accessToken: "accessNeg",
                        refreshToken: "refreshNeg",
                        expiryDate: -1,
                    },
                ],
            });
        });

        it("should handle empty string as tokens", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(TEST_DOMAIN, {
                userId: 1,
                accessToken: "",
                refreshToken: "",
                expiryDate: 0,
            });

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [
                    {
                        userId: 1,
                        accessToken: "",
                        refreshToken: "",
                        expiryDate: 0,
                    },
                ],
            });
        });

        it("should handle very long tokens", async () => {
            const longToken = "a".repeat(10000);
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);

            const result = await tokenService.saveToken(TEST_DOMAIN, {
                userId: 1,
                accessToken: longToken,
                refreshToken: longToken,
                expiryDate: 999999,
            });

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [
                    {
                        userId: 1,
                        accessToken: longToken,
                        refreshToken: longToken,
                        expiryDate: 999999,
                    },
                ],
            });
        });

        it("should handle multiple domains independently", async () => {
            const store: Store = {
                [TEST_DOMAIN]: SAMPLE_TOKENS,
                [OTHER_DOMAIN]: SINGLE_TOKEN,
            };
            mockStoreData(store);

            const newToken: StoredToken = {
                userId: 3,
                accessToken: "access3",
                refreshToken: "refresh3",
                expiryDate: 3000,
            };
            const result = await tokenService.saveToken(TEST_DOMAIN, newToken);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [...SAMPLE_TOKENS, newToken],
                [OTHER_DOMAIN]: SINGLE_TOKEN,
            });
        });
    });
});
