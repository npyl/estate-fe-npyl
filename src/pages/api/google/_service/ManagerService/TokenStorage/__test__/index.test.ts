import fs from "node:fs/promises";
import path from "node:path";
import tokenService from "@/pages/api/google/_service/ManagerService/TokenStorage";
import { TOKEN_FILE_PATH } from "../constants";
import { StoredToken } from "../types";
import "@/_private/JSON";

// -------------------------------------------------------------------------------

jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

// -------------------------------------------------------------------------------

// Test data constants
const SAMPLE_TOKENS = [
    { userId: 1, token: "token1" },
    { userId: 2, token: "token2" },
];

const SINGLE_TOKEN = [{ userId: 1, token: "token1" }];

const THREE_TOKENS = [
    { userId: 1, token: "token1" },
    { userId: 2, token: "token2" },
    { userId: 3, token: "token3" },
];

const EMPTY_TOKENS: Array<{ userId: number; token: string }> = [];

const NON_EXISTENT_USER_ID = 999;
const UPDATED_TOKEN = "newToken1";
const NEW_USER_ID = 2;
const NEW_TOKEN = "token2";

const ERRORS = {
    READ: new Error("Read error"),
    WRITE: new Error("Write error"),
    DELETE: new Error("Delete error"),
    PERMISSION_DENIED: new Error("Permission denied"),
    FILE_NOT_EXIST: new Error("File does not exist"),
    UNEXPECTED: new Error("Unexpected error"),
};

// Test helpers
const mockTokensData = (tokens: StoredToken[]) =>
    mockedFs.readFile.mockResolvedValue(JSON.stringify(tokens));

const mockFileReadError = (error: Error = ERRORS.READ) => {
    mockedFs.readFile.mockRejectedValue(error);
};

const mockFileWriteError = (error: Error = ERRORS.WRITE) => {
    mockedFs.writeFile.mockRejectedValue(error);
};

const expectWrittenTokens = (expectedTokens: StoredToken[]) =>
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
        TOKEN_FILE_PATH,
        JSON.stringify(expectedTokens, null, 2)
    );

const getLastWrittenData = () => {
    const lastCall = mockedFs.writeFile.mock.calls.at(-1);
    if (!lastCall) throw new Error("No writeFile calls found");
    return JSON.parse(lastCall[1] as string);
};

// -------------------------------------------------------------------------------

describe("TokenStorage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    afterEach(() => {
        jest.restoreAllMocks();
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
            expect(mockedFs.access).toHaveBeenCalledWith(TOKEN_FILE_PATH);
            expect(mockedFs.writeFile).toHaveBeenCalledWith(
                TOKEN_FILE_PATH,
                JSON.stringify(EMPTY_TOKENS)
            );
        });

        it("should not create file if it already exists", async () => {
            mockedFs.mkdir.mockResolvedValue(undefined);
            mockedFs.access.mockResolvedValue(undefined);

            const result = await tokenService.initialize();

            expect(result).toBe(true);
            expect(mockedFs.mkdir).toHaveBeenCalled();
            expect(mockedFs.access).toHaveBeenCalledWith(TOKEN_FILE_PATH);
            expect(mockedFs.writeFile).not.toHaveBeenCalled();
        });

        it("fail", async () => {
            mockedFs.mkdir.mockRejectedValue(ERRORS.PERMISSION_DENIED);
            const result = await tokenService.initialize();
            expect(result).toBe(false);
        });
    });

    describe("getAllTokens", () => {
        it("basic", async () => {
            mockTokensData(SAMPLE_TOKENS);

            const result = await tokenService.getAllTokens();

            expect(mockedFs.readFile).toHaveBeenCalledWith(
                TOKEN_FILE_PATH,
                "utf-8"
            );
            expect(result).toEqual(SAMPLE_TOKENS);
        });

        describe("fails", () => {
            it("should return empty array if JSON.parseSafe returns null", async () => {
                mockedFs.readFile.mockResolvedValue("invalid json");

                const originalParseSafe = (JSON as any).parseSafe;
                (JSON as any).parseSafe = jest.fn().mockReturnValue(null);

                const result = await tokenService.getAllTokens();

                expect(result).toEqual(EMPTY_TOKENS);

                (JSON as any).parseSafe = originalParseSafe;
            });

            it("should return empty array on file read error", async () => {
                mockFileReadError();

                const result = await tokenService.getAllTokens();

                expect(result).toEqual(EMPTY_TOKENS);
            });

            it("should return empty array if file is empty", async () => {
                mockedFs.readFile.mockResolvedValue("");

                const originalParseSafe = (JSON as any).parseSafe;
                (JSON as any).parseSafe = jest.fn().mockReturnValue(null);

                const result = await tokenService.getAllTokens();

                expect(result).toEqual(EMPTY_TOKENS);

                (JSON as any).parseSafe = originalParseSafe;
            });
        });
    });

    describe("getToken", () => {
        it("should return token for existing user", async () => {
            mockTokensData(SAMPLE_TOKENS);

            const result = await tokenService.getToken(1);

            expect(result).toBe("token1");
        });

        it("should return null for non-existing user", async () => {
            mockTokensData(SAMPLE_TOKENS);

            const result = await tokenService.getToken(NON_EXISTENT_USER_ID);

            expect(result).toBeNull();
        });

        it("should return null when tokens array is empty", async () => {
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.getToken(1);

            expect(result).toBeNull();
        });

        it("should return null when getAllTokens fails (file read error)", async () => {
            mockFileReadError();

            const result = await tokenService.getToken(1);

            expect(result).toBeNull();
        });

        it("should return null if exception occurs during token lookup", async () => {
            mockTokensData(SINGLE_TOKEN);

            const getAllTokensSpy = jest
                .spyOn(tokenService, "getAllTokens")
                .mockRejectedValue(ERRORS.UNEXPECTED);

            const result = await tokenService.getToken(1);

            expect(result).toBeNull();

            getAllTokensSpy.mockRestore();
        });
    });

    describe("saveToken", () => {
        it("new token; new user", async () => {
            mockTokensData(SINGLE_TOKEN);

            const result = await tokenService.saveToken(NEW_USER_ID, NEW_TOKEN);

            expect(result).toBe(true);
            expectWrittenTokens([
                ...SINGLE_TOKEN,
                { userId: NEW_USER_ID, token: NEW_TOKEN },
            ]);
        });

        it("new token; existing user", async () => {
            mockTokensData(SAMPLE_TOKENS);

            const result = await tokenService.saveToken(1, UPDATED_TOKEN);

            expect(result).toBe(true);
            expectWrittenTokens([
                { userId: 1, token: UPDATED_TOKEN },
                { userId: 2, token: "token2" },
            ]);
        });

        it("new token; no user yet (empty)", async () => {
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.saveToken(1, "token1");

            expect(result).toBe(true);
            expectWrittenTokens(SINGLE_TOKEN);
        });

        it("write fail", async () => {
            mockTokensData(EMPTY_TOKENS);
            mockFileWriteError(ERRORS.WRITE);

            const result = await tokenService.saveToken(1, "token1");

            expect(result).toBe(false);
        });

        it("read fail", async () => {
            mockFileReadError();

            const result = await tokenService.saveToken(1, "token1");

            // When getAllTokens fails, it returns [] and saveToken continues
            expect(result).toBe(true);
            expectWrittenTokens(SINGLE_TOKEN);
        });

        it("read & write fail", async () => {
            mockFileReadError();
            mockFileWriteError(ERRORS.WRITE);

            const result = await tokenService.saveToken(1, "token1");

            expect(result).toBe(false);
        });
    });

    describe("deleteToken", () => {
        it("should delete token for existing user", async () => {
            mockTokensData(THREE_TOKENS);

            const result = await tokenService.deleteToken(2);

            expect(result).toBe(true);
            expectWrittenTokens([
                { userId: 1, token: "token1" },
                { userId: 3, token: "token3" },
            ]);
        });

        it("should do nothing if user does not exist", async () => {
            mockTokensData(SAMPLE_TOKENS);

            const result = await tokenService.deleteToken(NON_EXISTENT_USER_ID);

            expect(result).toBe(true);
            expectWrittenTokens(SAMPLE_TOKENS);
        });

        it("should handle empty tokens array", async () => {
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.deleteToken(1);

            expect(result).toBe(true);
            expectWrittenTokens(EMPTY_TOKENS);
        });

        it("should return false on errors", async () => {
            mockTokensData(EMPTY_TOKENS);
            mockFileWriteError(ERRORS.DELETE);

            const result = await tokenService.deleteToken(1);

            expect(result).toBe(false);
        });
    });

    describe("deleteAllTokens", () => {
        it("should delete all tokens", async () => {
            const result = await tokenService.deleteAllTokens();

            expect(result).toBe(true);
            expectWrittenTokens(EMPTY_TOKENS);
        });

        it("should return false on errors", async () => {
            mockFileWriteError(ERRORS.WRITE);

            const result = await tokenService.deleteAllTokens();

            expect(result).toBe(false);
        });
    });

    describe("Singleton behavior", () => {
        it("should maintain singleton instance in non-production", () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = "development";

            expect(tokenService).toBeDefined();
            expect((globalThis as any).tokenServiceGlobal).toBeDefined();

            process.env.NODE_ENV = originalEnv;
        });

        it("should not set global in production", () => {
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
            mockTokensData(SAMPLE_TOKENS);

            await tokenService.saveToken(1, "updatedToken1");
            await tokenService.saveToken(1, "finalToken1");

            const writtenData = getLastWrittenData();
            expect(writtenData.find((t: any) => t.userId === 1).token).toBe(
                "finalToken1"
            );
        });

        it("should handle userId of 0", async () => {
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.saveToken(0, "token0");

            expect(result).toBe(true);
            expectWrittenTokens([{ userId: 0, token: "token0" }]);
        });

        it("should handle negative userId", async () => {
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.saveToken(-1, "tokenNegative");

            expect(result).toBe(true);
            expectWrittenTokens([{ userId: -1, token: "tokenNegative" }]);
        });

        it("should handle empty string as token", async () => {
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.saveToken(1, "");

            expect(result).toBe(true);
            expectWrittenTokens([{ userId: 1, token: "" }]);
        });

        it("should handle very long token", async () => {
            const longToken = "a".repeat(10000);
            mockTokensData(EMPTY_TOKENS);

            const result = await tokenService.saveToken(1, longToken);

            expect(result).toBe(true);
            expectWrittenTokens([{ userId: 1, token: longToken }]);
        });
    });
});
