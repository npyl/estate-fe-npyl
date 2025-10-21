import fs from "node:fs/promises";
import tokenService from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    TEST_DOMAIN,
    OTHER_DOMAIN,
    SAMPLE_TOKENS,
    SINGLE_TOKEN,
    THREE_TOKENS,
    EMPTY_TOKENS,
    NON_EXISTENT_USER_ID,
    ERRORS,
    mockStoreData,
    mockFileReadError,
    mockFileWriteError,
    expectWrittenStore,
} from "./utils";
jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("TokenStorage - deleteToken", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should delete token when user exists", async () => {
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

    it("should handle deleting non-existent user gracefully", async () => {
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

    it("should handle empty tokens array", async () => {
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.deleteToken(TEST_DOMAIN, 1);

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: EMPTY_TOKENS,
        });
    });

    it("should handle non-existent domain", async () => {
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
        it("should return false on write error", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);
            mockFileWriteError(ERRORS.DELETE);

            const result = await tokenService.deleteToken(TEST_DOMAIN, 1);

            expect(result).toBe(false);
        });

        it("should handle read error gracefully", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);
            mockFileReadError(ERRORS.READ);

            const result = await tokenService.deleteToken(TEST_DOMAIN, 1);

            // INFO: we don't care about fails; we only want to prevent crashes
            expect(result).toBe(true);
        });
    });
});

describe("TokenStorage - deleteAllTokens", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should delete all tokens when domain exists", async () => {
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

    it("should handle non-existent domain", async () => {
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
        it("should handle read error gracefully", async () => {
            mockFileReadError();

            const result = await tokenService.deleteAllTokens(TEST_DOMAIN);

            expect(result).toBe(true);
        });

        it("should return false on write error", async () => {
            mockFileWriteError(ERRORS.WRITE);

            const result = await tokenService.deleteAllTokens(TEST_DOMAIN);

            expect(result).toBe(false);
        });
    });
});
