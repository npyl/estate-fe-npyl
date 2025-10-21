import fs from "node:fs/promises";
import tokenService from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    TEST_DOMAIN,
    OTHER_DOMAIN,
    SAMPLE_TOKENS,
    EMPTY_TOKENS,
    NON_EXISTENT_USER_ID,
    mockStoreData,
    mockFileReadError,
    expectGetAllTokens,
} from "./utils";
jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("TokenStorage - getAllTokens", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should return tokens for existing domain", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.getAllTokens(TEST_DOMAIN);

        expectGetAllTokens(result, SAMPLE_TOKENS, store);
    });

    it("should return empty array for non-existent domain", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.getAllTokens(OTHER_DOMAIN);

        expectGetAllTokens(result, [], store);
    });

    describe("I/O Errors", () => {
        it("should handle JSONParseSafe failure", async () => {
            mockedFs.readFile.mockResolvedValue("invalid json");

            const result = await tokenService.getAllTokens(TEST_DOMAIN);

            expectGetAllTokens(result, [], {});
        });

        it("should handle file read error", async () => {
            mockFileReadError();

            const result = await tokenService.getAllTokens(TEST_DOMAIN);

            expectGetAllTokens(result, [], {});
        });
    });
});

describe("TokenStorage - getToken", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should return token for existing user", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.getToken(TEST_DOMAIN, 1);

        expect(result).toEqual(SAMPLE_TOKENS[0]);
    });

    it("should return undefined for non-existing user", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.getToken(
            TEST_DOMAIN,
            NON_EXISTENT_USER_ID
        );

        expect(result).toBeUndefined();
    });

    it("should return undefined when tokens array is empty", async () => {
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.getToken(TEST_DOMAIN, 1);

        expect(result).toBeUndefined();
    });

    it("should return undefined when domain doesn't exist", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.getToken(OTHER_DOMAIN, 1);

        expect(result).toBeUndefined();
    });

    describe("I/O Errors", () => {
        it("should handle file read error", async () => {
            mockFileReadError();

            const result = await tokenService.getToken(TEST_DOMAIN, 1);

            expect(result).toBeUndefined();
        });
    });
});
